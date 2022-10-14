import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { NftCollectionModule } from './nft-collection/nft-collection.module';
import { ImageUploaderModule } from './image-uploader/image-uploader.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/kanji'),
    NftCollectionModule,
    ImageUploaderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
