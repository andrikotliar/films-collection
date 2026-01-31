import type { UploadApiErrorResponse } from 'cloudinary';

export class UploadingError extends Error {
  public statusCode: number;

  constructor(error: UploadApiErrorResponse) {
    super(error.message);
    this.statusCode = error.http_code;
  }
}
