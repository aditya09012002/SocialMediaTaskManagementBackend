import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import { extractPublicId } from 'cloudinary-build-url';

import config from '../../config/config';

export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: config.cloudinayCloudName,
      api_key: config.cloudinaryApiKey,
      api_secret: config.cloudinaryApiSecret,
    });
  }

  async uploadImage(
    filePath: string,
    folder?: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      return await cloudinary.uploader.upload(filePath, {
        folder: folder || 'default',
      });
    } catch (error) {
      if (error instanceof Error)
        throw new Error(
          `Failed to upload image to Cloudinary: ${error.message}`,
        );
      throw new Error('Unknown Error');
    }
  }

  async deleteImage(publicUrl: string) {
    try {
      const publicId = extractPublicId(publicUrl);
      return await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw new Error(
        `Cloudinary deletion failed: ${(error as Error).message}`,
      );
    }
  }

  async uploadMultipleImages(filePaths: string[], folder: string = 'default') {
    const uploadPromises = filePaths.map((filePath) =>
      this.uploadImage(filePath, folder),
    );
    return Promise.all(uploadPromises);
  }
}
