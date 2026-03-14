import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { UploadFilePayloadSchema } from '@films-collection/shared';
import type z from 'zod';
import type { Deps } from '~/shared';

export class AwsService {
  private s3Client: S3Client | null = null;

  constructor(private readonly deps: Deps<'configService'>) {}

  initClient() {
    const endpoint = this.deps.configService.getKey('S3_ENDPOINT');

    const s3Client = new S3Client({
      region: this.deps.configService.getKey('AWS_REGION'),
      credentials: {
        accessKeyId: this.deps.configService.getKey('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.deps.configService.getKey('AWS_SECRET_ACCESS_KEY'),
      },
      endpoint: endpoint ? endpoint : undefined,
      forcePathStyle: !!endpoint,
    });
    return s3Client;
  }

  private getOrInitClient() {
    if (!this.s3Client) {
      this.s3Client = this.initClient();
    }

    return this.s3Client;
  }

  async getUploadUrl(payload: z.infer<typeof UploadFilePayloadSchema>) {
    const s3Client = this.getOrInitClient();

    const command = new PutObjectCommand({
      Bucket: this.deps.configService.getKey('S3_ASSETS_BUCKET'),
      Key: payload.key,
      ContentType: payload.fileType,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return url;
  }
}
