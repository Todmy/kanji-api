import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageUploaderService {
  async upload(file: Express.Multer.File): Promise<string> {
    console.log(typeof file, file);
    return 'test' + Date.now();
  }

  async delete(file: string): Promise<void> {
    console.log(file);
  }
}
