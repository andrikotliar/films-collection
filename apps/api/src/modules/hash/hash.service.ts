import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

export class HashService {
  hash(value: string) {
    const salt = randomBytes(SALT_LENGTH);

    const hashResult = scryptSync(value, salt, KEY_LENGTH);

    return `${salt.toString('base64')}:${hashResult.toString('base64')}`;
  }

  verify(input: string, hash: string) {
    const [saltString, hashString] = hash.split(':');

    if (!saltString || !hashString) {
      return false;
    }

    const salt = Buffer.from(saltString, 'base64');
    const expectedHash = Buffer.from(hashString, 'base64');

    const actualHash = scryptSync(input, salt, expectedHash.length);

    return actualHash.length === expectedHash.length && timingSafeEqual(actualHash, expectedHash);
  }
}
