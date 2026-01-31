import path from 'node:path';
import crypto from 'node:crypto';
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import { UploadingError, type Deps } from '~/shared';
import { destinationParams } from '~/services/files/configs';
import type { FileUploadPayload } from '@films-collection/shared';

export class FilesService {
  constructor({ configService }: Deps<'configService'>) {
    cloudinary.config({
      cloud_name: configService.getKey('CLOUDINARY_CLOUD_NAME'),
      api_key: configService.getKey('CLOUDINARY_API_KEY'),
      api_secret: configService.getKey('CLOUDINARY_API_SECRET'),
    });
  }

  async upload(payload: FileUploadPayload<Buffer>) {
    try {
      const result = await this.uploadStream(payload);

      if (!result) {
        throw new UploadingError({
          http_code: 400,
          message: 'Missing uploading result',
          name: 'BadRequest',
        });
      }

      return {
        url: result.url,
      };
    } catch (error: any) {
      throw new UploadingError(error);
    }
  }

  async delete(filePath: string) {
    const filePathData = path.parse(filePath);
    const publicId = `${filePathData.dir}/${filePathData.name}`;

    return cloudinary.uploader.destroy(publicId);
  }

  private uploadStream(payload: FileUploadPayload<Buffer>) {
    const config = destinationParams[payload.destination];
    const parsedTitle = this.parseTitle(payload);

    if (!config) {
      throw new Error(`Unknown destination ${payload.destination}`);
    }

    return new Promise<UploadApiResponse | undefined>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: config.path,
            transformation: config.transformation,
            public_id: parsedTitle,
            filename_override: parsedTitle,
            unique_filename: false,
            resource_type: 'image',
            format: config.format,
            overwrite: true,
            invalidate: true,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        )
        .end(payload.file);
    });
  }

  private parseTitle(payload: FileUploadPayload<Buffer>) {
    const sanitizedString = payload.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');

    const lowercasedTitle = sanitizedString.toLowerCase();

    if (payload.shouldUseUniqueIdentifier) {
      const uuid = crypto.randomUUID();

      return `${lowercasedTitle}_${uuid}`;
    }

    return lowercasedTitle;
  }
}
