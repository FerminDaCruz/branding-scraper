import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';
import { BriefOutput, BRIEF_TOOL } from './brief-tool.definition';

const MODEL = 'claude-sonnet-4-6';

@Injectable()
export class ClaudeService {
  private readonly client: Anthropic;
  private readonly logger = new Logger(ClaudeService.name);

  constructor(private readonly config: ConfigService) {
    this.client = new Anthropic({
      apiKey: this.config.getOrThrow<string>('ANTHROPIC_API_KEY'),
    });
  }

  async generateBrief(prompt: string): Promise<BriefOutput> {
    this.logger.log(`Calling Claude ${MODEL} for brief generation`);

    const response = await this.client.messages.create({
      model: MODEL,
      max_tokens: 8192,
      tools: [BRIEF_TOOL],
      tool_choice: { type: 'tool', name: 'generate_brief' },
      messages: [{ role: 'user', content: prompt }],
    });

    const toolUse = response.content.find((b) => b.type === 'tool_use');
    if (!toolUse || toolUse.type !== 'tool_use') {
      throw new Error('Claude did not return a tool_use block');
    }

    return toolUse.input as BriefOutput;
  }
}
