import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApifyClient } from 'apify-client';
import { ApifyProfileResult } from './scraper.types';

// Actor: apify/instagram-profile-scraper
const ACTOR_ID = 'apify/instagram-profile-scraper';
const MAX_POSTS = 30;

@Injectable()
export class ApifyService {
  private readonly client: ApifyClient;
  private readonly logger = new Logger(ApifyService.name);

  constructor(private readonly config: ConfigService) {
    this.client = new ApifyClient({
      token: this.config.getOrThrow<string>('APIFY_API_TOKEN'),
    });
  }

  async scrapeProfile(username: string): Promise<ApifyProfileResult> {
    this.logger.log(`Scraping @${username}`);

    const run = await this.client.actor(ACTOR_ID).call({
      usernames: [username],
      resultsLimit: MAX_POSTS,
    });

    const { items } = await this.client
      .dataset(run.defaultDatasetId)
      .listItems();

    if (!items.length) {
      throw new Error(`No data returned for @${username}`);
    }

    return items[0] as unknown as ApifyProfileResult;
  }
}
