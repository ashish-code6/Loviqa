import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import type { ProfileImageFile } from '../users/types/profile-image-file';

@Injectable()
export class CloudinaryService {

    constructor(private readonly configService: ConfigService) {
        cloudinary.config({
            cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
        });
    }

    getCloudinary() {
        return cloudinary;
    }

    async uploadProfileImage(file: ProfileImageFile) {
        if (!file?.buffer) {
            throw new BadRequestException('Please choose an image to upload');
        }

        return new Promise<{ secure_url: string }>((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
                {
                    folder: 'loviqa/profile-images',
                    resource_type: 'image',
                    transformation: [
                        { width: 512, height: 512, crop: 'fill', gravity: 'face', quality: 'auto', fetch_format: 'auto' },
                    ],
                },
                (error, result) => {
                    if (error || !result) return reject(error ?? new Error('Image upload failed'));
                    resolve({ secure_url: result.secure_url });
                },
            );

            upload.end(file.buffer);
        });
    }
}
