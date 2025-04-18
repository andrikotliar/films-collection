import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { EnvVariables } from 'src/common';
import { UploadPayload } from './types';
import { destinationParams } from 'src/modules/files/configs';

export class FilesService {
  constructor(env: EnvVariables) {
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

  private uploadStream(payload: UploadPayload) {
    const config = destinationParams[payload.destination];
    const parsedTitle = this.parseTitle(payload.title);

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

  private parseTitle(rawTitle: string) {
    const sanitizedString = rawTitle
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '_');

    return sanitizedString.toLowerCase();
  }
}
