import * as path from 'path';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { NftCollectionModule } from './nft-collection/nft-collection.module';
import { ImageUploaderModule } from './image-uploader/image-uploader.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'client', 'build'),
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    NftCollectionModule,
    ImageUploaderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
