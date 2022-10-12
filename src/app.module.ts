import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NftCollectionModule } from './nft-collection/nft-collection.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/kanji'), NftCollectionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
