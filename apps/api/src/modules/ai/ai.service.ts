import OpenAI from 'openai';
import type { ResponsesModel } from 'openai/resources/shared';
import type { Deps } from '~/shared';

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
      `Translate the following ${langParams.from} text to ${langParams.to}: ${text}`,
    );
  }

  public async generateFilmDescription(filmTitle: string) {
    const text = await this.createResponse(
      `Get IMDb rating for the film "${filmTitle}" and create a short description for it. The description should be concise and written in simple language. Format the result text by template - Rating: VALUE. Description: TEXT`,
      'gpt-4.1-mini',
    );

    return {
      title: filmTitle,
      text,
    };
  }

  private getClient() {
    if (!this.client) {
      throw new Error('OpenAI client is not initialized');
    }

    return this.client;
  }
}
