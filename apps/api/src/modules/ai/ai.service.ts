import OpenAI from 'openai';
import type { Deps } from '~/shared';

type LangParams = {
  from: string;
  to: string;
};

export class AiService {
  private client: OpenAI | null = null;

  constructor(private readonly deps: Deps<'configService'>) {
    this.client = new OpenAI({ apiKey: deps.configService.getKey('OPENAI_API_KEY') });
  }

  public async createResponse(prompt: string): Promise<string> {
    const client = this.getClient();

    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
    });

    return response.output_text;
  }

  public async translateToLangPrompt(text: string, langParams: LangParams): Promise<string> {
    return this.createResponse(
      `Translate the following ${langParams.from} text to ${langParams.to}: ${text}`,
    );
  }

  private getClient() {
    if (!this.client) {
      throw new Error('OpenAI client is not initialized');
    }

    return this.client;
  }
}
