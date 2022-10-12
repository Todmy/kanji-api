import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NftCollectionService } from './nft-collection.service';
import { NftCollectionController } from './nft-collection.controller';

import { NftCollection, NftCollectionSchema } from './schemas/nft-collection.schema';

@Module({
  providers: [NftCollectionService],
  controllers: [NftCollectionController],
  imports: [MongooseModule.forFeature([{ name: NftCollection.name, schema: NftCollectionSchema }])],
})
export class NftCollectionModule {}
