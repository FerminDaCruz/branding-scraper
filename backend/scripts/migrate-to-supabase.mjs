/**
 * Migra datos de PostgreSQL local → Supabase.
 * Corre ANTES de cambiar el .env al host de Supabase.
 *
 * Uso: node scripts/migrate-to-supabase.mjs
 */

import pg from 'pg';
const { Client } = pg;

const LOCAL = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'instagram_brief',
};

const SUPABASE = {
  host: 'db.rhfpiupmtsjmpptewmtd.supabase.co',
  port: 5432,
  user: 'postgres',
  password: '1ZwsfimMo4IbvR42',
  database: 'postgres',
  ssl: { rejectUnauthorized: false },
};

const local = new Client(LOCAL);
const remote = new Client(SUPABASE);

async function main() {
  console.log('Conectando a local...');
  await local.connect();

  console.log('Conectando a Supabase...');
  await remote.connect();

  // ── 1. Crear tablas en Supabase si no existen ──────────────────────────────
  console.log('\nCreando tablas en Supabase...');
  await remote.query(`
    CREATE TABLE IF NOT EXISTS instagram_profiles (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      username VARCHAR NOT NULL UNIQUE,
      "fullName" VARCHAR,
      bio TEXT,
      "followersCount" INTEGER NOT NULL DEFAULT 0,
      "followingCount" INTEGER NOT NULL DEFAULT 0,
      "postsCount" INTEGER NOT NULL DEFAULT 0,
      "profilePicUrl" VARCHAR,
      website VARCHAR,
      "businessCategory" VARCHAR,
      "isVerified" BOOLEAN NOT NULL DEFAULT false,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS instagram_posts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      "apifyId" VARCHAR NOT NULL UNIQUE,
      type VARCHAR NOT NULL DEFAULT 'Image',
      caption TEXT,
      "likesCount" INTEGER NOT NULL DEFAULT 0,
      "commentsCount" INTEGER NOT NULL DEFAULT 0,
      "videoViewCount" INTEGER,
      url VARCHAR,
      timestamp TIMESTAMP,
      transcript TEXT,
      "profileId" UUID REFERENCES instagram_profiles(id) ON DELETE CASCADE,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS briefs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      "businessInfo" TEXT NOT NULL,
      "mainOffer" TEXT NOT NULL,
      "secondaryOffer" TEXT NOT NULL DEFAULT '',
      "targetAudience" TEXT NOT NULL,
      "mainPain" TEXT NOT NULL,
      desires TEXT NOT NULL,
      positioning TEXT NOT NULL,
      "communicationStyle" TEXT NOT NULL,
      "contentTopics" JSONB NOT NULL DEFAULT '[]',
      "ctasUsed" JSONB NOT NULL DEFAULT '[]',
      "detectedFunnel" TEXT NOT NULL,
      "improvementOpportunities" JSONB NOT NULL DEFAULT '[]',
      "webRecommendations" JSONB NOT NULL DEFAULT '[]',
      "fullBrief" TEXT,
      "profileId" UUID UNIQUE REFERENCES instagram_profiles(id) ON DELETE CASCADE,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
    );
  `);
  console.log('Tablas listas.');

  // ── 2. Migrar profiles ────────────────────────────────────────────────────
  const { rows: profiles } = await local.query('SELECT * FROM instagram_profiles');
  console.log(`\nMigrando ${profiles.length} perfiles...`);

  for (const p of profiles) {
    await remote.query(
      `INSERT INTO instagram_profiles (
        id, username, "fullName", bio, "followersCount", "followingCount",
        "postsCount", "profilePicUrl", website, "businessCategory",
        "isVerified", "createdAt", "updatedAt"
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      ON CONFLICT (username) DO UPDATE SET
        "fullName"=$3, bio=$4, "followersCount"=$5, "followingCount"=$6,
        "postsCount"=$7, "profilePicUrl"=$8, website=$9, "businessCategory"=$10,
        "isVerified"=$11, "updatedAt"=$13`,
      [
        p.id, p.username, p.fullName, p.bio,
        p.followersCount, p.followingCount, p.postsCount,
        p.profilePicUrl, p.website, p.businessCategory,
        p.isVerified, p.createdAt, p.updatedAt,
      ],
    );
    console.log(`  ✓ @${p.username}`);
  }

  // ── 3. Migrar posts ───────────────────────────────────────────────────────
  const { rows: posts } = await local.query('SELECT * FROM instagram_posts');
  console.log(`\nMigrando ${posts.length} posts...`);

  for (const post of posts) {
    await remote.query(
      `INSERT INTO instagram_posts (
        id, "apifyId", type, caption, "likesCount", "commentsCount",
        "videoViewCount", url, timestamp, transcript, "profileId", "createdAt", "updatedAt"
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      ON CONFLICT ("apifyId") DO NOTHING`,
      [
        post.id, post.apifyId, post.type, post.caption,
        post.likesCount, post.commentsCount, post.videoViewCount,
        post.url, post.timestamp, post.transcript,
        post.profileId,
        post.createdAt ?? new Date(),
        post.updatedAt ?? new Date(),
      ],
    );
  }
  console.log(`  ✓ ${posts.length} posts migrados`);

  // ── 4. Migrar briefs ──────────────────────────────────────────────────────
  const { rows: briefs } = await local.query('SELECT * FROM briefs');
  console.log(`\nMigrando ${briefs.length} briefs...`);

  for (const b of briefs) {
    await remote.query(
      `INSERT INTO briefs (
        id, "businessInfo", "mainOffer", "secondaryOffer", "targetAudience",
        "mainPain", desires, positioning, "communicationStyle",
        "contentTopics", "ctasUsed", "detectedFunnel",
        "improvementOpportunities", "webRecommendations", "fullBrief",
        "profileId", "createdAt", "updatedAt"
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
      ON CONFLICT ("profileId") DO UPDATE SET
        "businessInfo"=$2, "mainOffer"=$3, "secondaryOffer"=$4,
        "targetAudience"=$5, "mainPain"=$6, desires=$7,
        positioning=$8, "communicationStyle"=$9,
        "contentTopics"=$10, "ctasUsed"=$11, "detectedFunnel"=$12,
        "improvementOpportunities"=$13, "webRecommendations"=$14,
        "fullBrief"=$15, "updatedAt"=$18`,
      [
        b.id, b.businessInfo, b.mainOffer, b.secondaryOffer,
        b.targetAudience, b.mainPain, b.desires, b.positioning,
        b.communicationStyle,
        JSON.stringify(b.contentTopics), JSON.stringify(b.ctasUsed),
        b.detectedFunnel,
        JSON.stringify(b.improvementOpportunities),
        JSON.stringify(b.webRecommendations),
        b.fullBrief, b.profileId, b.createdAt, b.updatedAt,
      ],
    );
    console.log(`  ✓ brief para profileId ${b.profileId}`);
  }

  await local.end();
  await remote.end();
  console.log('\n✅ Migración completa.');
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
