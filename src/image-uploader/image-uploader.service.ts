import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = 'kanji-nft-collections-pictures';

@Injectable()
export class ImageUploaderService {
  async upload(file: Express.Multer.File): Promise<string> {
    try {
      const s3 = new S3();
      const uploadResult = await s3
        .upload({
          Bucket: BUCKET_NAME,
          Body: file.buffer,
          Key: `${uuidv4()}-${Date.now()}`,
          ContentType: file.mimetype,
        })
        .promise();

      return uploadResult.Location;
    } catch (err) {
      return err.message;
    }
  }

  async delete(file: string): Promise<void> {
    console.log(file);
    const s3 = new S3();
    const key = file.split('/').pop();
    await s3
      .deleteObject({
        Bucket: BUCKET_NAME,
        Key: key,
      })
      .promise();

    return;
  }
}
