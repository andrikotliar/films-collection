import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { type Deps } from '~/shared';
import { UploadPayload } from './types';
import { destinationParams } from '~/services/files/configs';
import path from 'node:path';
import crypto from 'node:crypto';

export class FilesService {
  constructor({ env }: Deps<'env'>) {
    cloudinary.config({
      cloud_name: env.CLOUDINARY_CLOUD_NAME,
      api_key: env.CLOUDINARY_API_KEY,
      api_secret: env.CLOUDINARY_API_SECRET,
    });
  }

  async upload(payload: UploadPayload) {
    const result = await this.uploadStream(payload);

    if (!result) {
      throw new Error('Upload result is not defined');
    }

    return {
      filePath: `${result.public_id}.${result.format}`,
    };
  }

  async delete(filePath: string) {
    const filePathData = path.parse(filePath);
    const publicId = `${filePathData.dir}/${filePathData.name}`;

    return cloudinary.uploader.destroy(publicId);
  }

  private uploadStream(payload: UploadPayload) {
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

  private parseTitle(payload: UploadPayload) {
    const sanitizedString = payload.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');

    const lowercasedTitle = sanitizedString.toLowerCase();

    if (payload.shouldUseUniqueIdentifier) {
      const uuid = crypto.randomUUID();

      return `${lowercasedTitle}_${uuid}`;
    }

    return lowercasedTitle;
  }
}
