import path from 'node:path';
import crypto from 'node:crypto';
import { v2 as cloudinary, type UploadApiOptions } from 'cloudinary';
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
    const config = destinationParams[payload.destination];
    const parsedTitle = this.parseTitle(payload);

    if (!config) {
      throw new UploadingError({
        name: 'BadRequest',
        message: `Unknown destination ${payload.destination}`,
        http_code: 400,
      });
    }

    try {
      const options: UploadApiOptions = {
        folder: config.path,
        transformation: config.transformation,
        public_id: parsedTitle,
        filename_override: parsedTitle,
        unique_filename: false,
        resource_type: 'image',
        format: config.format,
        overwrite: true,
        invalidate: true,
      };

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${payload.file.toString('base64')}`,
        options,
      );

      return {
        url: result.url,
      };
    } catch (uploadingError: any) {
      throw new UploadingError(uploadingError.error);
    }
  }

  async delete(filePath: string) {
    const filePathData = path.parse(filePath);
    const publicId = `${filePathData.dir}/${filePathData.name}`;

    return cloudinary.uploader.destroy(publicId);
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
