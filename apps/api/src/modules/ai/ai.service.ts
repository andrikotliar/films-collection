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

  public async generateDescription(params: DescriptionParams) {
    const prompt = `
Write a factual setup description for the following film or series.

Input:

* Title: ${params.title}
* Type: ${this.getReadableType(params.type, params.style)}
* Release year: ${params.releaseDate}

Requirements:

* Describe only the beginning of the story and the first major conflict.
* Focus on concrete events and circumstances.
* Explain:

  1. the protagonist's initial situation,
  2. what disrupts it,
  3. the immediate objective that follows.
* Mention at least one distinctive element that helps identify this specific installment.
* If this is a sequel, describe the unique setup of this installment rather than the overall franchise premise.
* Do not reveal the ending, later twists, or major discoveries.
* Do not summarize the entire plot.
* Treat the events as real occurrences observed by a neutral witness.

Style rules:

* Use 2–3 concise sentences.
* Maximum 300 characters.
* Use specific nouns and actions.
* Prefer observable facts over interpretation.
* Do not infer emotions, motivations, themes, symbolism, messages, or character development.
* Avoid promotional, dramatic, or literary wording.
* Do not use adjectives unless they are necessary to identify a person, place, or object.

Do NOT use phrases or wording similar to:

* must confront
* struggles with
* determined to
* forced to
* drawn into
* haunted by
* turmoil of the past
* destiny
* fate
* dark forces
* ancient evil
* powerful foes
* race against time
* save humanity
* save the world
* uncover the truth
* everything changes forever

The description should allow someone familiar with films to recognize this title from the setup alone.

Output only the final description text. Do not include the title, quotation marks, explanations, prefixes, or any additional text.
`;

    return this.createResponse(prompt, 'gpt-4.1', 0.2);
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
