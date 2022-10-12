import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageUploaderService {
  upload(file: Express.Multer.File) {
    console.log(typeof file, file);
    return 'test' + Date.now();
  }
}
