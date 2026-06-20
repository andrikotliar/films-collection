import type { TTitleStyle, TTitleType } from '@films-collection/shared';
import OpenAI from 'openai';
import type { ResponsesModel } from 'openai/resources/shared';
import type { Deps } from '~/shared/index.js';

type LangParams = {
  from: string;
  to: string;
};

export class AiService {
  private client: OpenAI | null = null;

  constructor(deps: Deps<'configService'>) {
    this.client = new OpenAI({ apiKey: deps.configService.getKey('OPENAI_API_KEY') });
  }

  public async createResponse(
    prompt: string,
    model: ResponsesModel = 'gpt-4o-mini',
    temperature?: number,
  ): Promise<string> {
    const client = this.getClient();

    const response = await client.responses.create({
      model,
      input: prompt,
      temperature,
    });

    return response.output_text;
  }

  public async translateToLangPrompt(text: string, langParams: LangParams): Promise<string> {
    return this.createResponse(
      `Translate the following ${langParams.from} text to ${langParams.to}: ${text}. The response should contain only the translated text. Doesn't add any extra words of unnecessary symbols, no matter the text length.`,
    );
  }

  private getReadableType(type: TTitleType, style: TTitleStyle) {
    const starting = style === 'ANIMATION' ? 'animated' : '';
    const ending = type === 'FILM' ? 'film' : 'TV show';

    return `${starting} ${ending}`;
  }

  private getClient() {
    if (!this.client) {
      throw new Error('OpenAI client is not initialized');
    }

    return this.client;
  }
}
