export class InvalidVariantError extends Error {
  constructor(key, variants) {
    const message = `The [${key}] param accepts only [${variants.join(', ')}]`;

    super(message);
  }
}
