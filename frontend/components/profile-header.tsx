import { CheckCircle, Buildings, Link } from "@phosphor-icons/react/dist/ssr";
import { formatNumber } from "@/lib/utils";
import type { InstagramProfile } from "@/types/brief";

interface ProfileHeaderProps {
  profile: InstagramProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const initial = (profile.fullName ?? profile.username)[0].toUpperCase();

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 p-5 rounded-md border border-border bg-card">
      {/* avatar */}
      <div className="shrink-0">
        {profile.profilePicUrl ? (
          <img
            src={profile.profilePicUrl}
            alt={profile.username}
            className="h-12 w-12 rounded-full object-cover border border-border"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-semibold text-lg">
            {initial}
          </div>
        )}
      </div>

      {/* identity */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-foreground truncate">
            {profile.fullName ?? profile.username}
          </span>
          {profile.isVerified && (
            <CheckCircle weight="fill" className="text-primary shrink-0" size={16} />
          )}
        </div>
        <div className="flex items-center gap-3 mt-0.5 flex-wrap">
          <span className="text-xs font-mono text-muted-foreground">
            @{profile.username}
          </span>
          {profile.businessCategory && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Buildings size={11} />
              {profile.businessCategory}
            </span>
          )}
          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors truncate max-w-[160px]"
            >
              <Link size={11} />
              {profile.website.replace(/^https?:\/\//, "")}
            </a>
          )}
        </div>
      </div>

      {/* stats */}
      <div className="flex gap-5 md:gap-6 shrink-0">
        {[
          { label: "seguidores", value: formatNumber(profile.followersCount) },
          { label: "siguiendo", value: formatNumber(profile.followingCount) },
          { label: "posts", value: formatNumber(profile.postsCount) },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-sm font-semibold text-foreground font-mono">
              {stat.value}
            </div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
