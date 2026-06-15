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
    const firstRoundPrompt = `
You are extracting factual story setup information.

Film:

Title: ${params.title}
Type: ${this.getReadableType(params.type, params.style)}
Release year: ${params.releaseDate}

Extract only information from the beginning of the story and the first major conflict.

Rules:

- Do not describe the ending or later twists.
- Ignore themes, symbolism, messages, character growth, and franchise lore unless they directly affect the setup.
- If this is a sequel, focus only on the unique setup of this installment.
- Prefer concrete events over abstract ideas.
- Use specific nouns and actions.
- If some information is uncertain, return null.

Return valid JSON with exactly this structure:

{
  "protagonist": "",
  "initial_situation": "",
  "inciting_incident": "",
  "immediate_goal": "",
  "antagonistic_force": "",
  "unique_elements": ["", ""]
}

Field descriptions:

- protagonist: Who the story mainly follows.
- initial_situation: Their situation before the conflict begins.
- inciting_incident: The event that disrupts that situation.
- immediate_goal: What they try to accomplish as a direct result.
- antagonistic_force: The person, group, creature, or circumstance opposing them.
- unique_elements: Distinctive details that help identify this film from others.

Output only valid JSON.
`;

    const firstRoundResponse = await this.createResponse(firstRoundPrompt);

    const secondRoundPrompt = `
Write a concise plot setup description using the extracted data below.

Data:
${firstRoundResponse}

Requirements:

- Describe only the setup and first major conflict.
- Explain what happens in concrete terms.
- Mention the protagonist's immediate goal.
- Include one or more unique elements that distinguish this story.
- Do not mention the ending, later twists, themes, symbolism, or character arcs.
- Avoid promotional language and abstract phrases.

Do NOT use phrases such as:

- ancient evil
- dark forces
- destiny
- the truth
- humanity
- powerful foes
- race against time
- catastrophic events
- everything changes forever
- must save the world
- struggles with their fate

Write as if these are real events observed from inside the story world. Do not acknowledge that this is a film.

The result:

- must be under 300 characters,
- must not include the title,
- must consist only of the final description text.

Output only the description.    
`;

    return this.createResponse(secondRoundPrompt);
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
