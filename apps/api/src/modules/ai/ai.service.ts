import type { TTitleStyle, TTitleType } from '@films-collection/shared';
import OpenAI from 'openai';
import type { ResponsesModel } from 'openai/resources/shared';
import type { Film } from '~/database/schema.js';
import type { Deps } from '~/shared/index.js';

type LangParams = {
  from: string;
  to: string;
};

type DescriptionParams = Pick<Film, 'title' | 'type' | 'style' | 'releaseDate'>;

export class AiService {
  private client: OpenAI | null = null;

  constructor(deps: Deps<'configService'>) {
    this.client = new OpenAI({ apiKey: deps.configService.getKey('OPENAI_API_KEY') });
  }

  public async createResponse(
    prompt: string,
    model: ResponsesModel = 'gpt-4o-mini',
  ): Promise<string> {
    const client = this.getClient();

    const response = await client.responses.create({
      model,
      input: prompt,
    });

    return response.output_text;
  }

  public async translateToLangPrompt(text: string, langParams: LangParams): Promise<string> {
    return this.createResponse(
      `Translate the following ${langParams.from} text to ${langParams.to}: ${text}. The response should contain only the translated text. Doesn't add any extra words of unnecessary symbols, no matter the text length.`,
    );
  }

  public async generateDescription(params: DescriptionParams) {
    const prompt = `
Write a short description for ${this.getReadableType(params.type, params.style)} ${params.title} 
that was released ${params.releaseDate}.
The text should describe the main plot of the film.
It should be at least 60% unique, but not too abstract.
The length of the text should be less then 300 characters.
The response should contain only the generated text without extra symbols or extra words.
    `;

    return this.createResponse(prompt);
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
