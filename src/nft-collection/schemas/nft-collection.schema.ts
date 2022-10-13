import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Nft } from './nft.schema';
import { NftCollectionDataHost, NftCollectionBlockchain } from '../enums';

export type NftCollectionDocument = NftCollection & Document;

@Schema()
export class NftCollection {
  @Prop({ required: true })
  picture: string;

  @Prop({ required: true, enum: NftCollectionBlockchain })
  blockchain: NftCollectionBlockchain;

  @Prop({ required: true, enum: NftCollectionDataHost })
  dataHost: NftCollectionDataHost;

  @Prop({ required: true })
  owner: string;

  @Prop({
    required: true,
    minlength: 3,
    maxlength: 128,
  })
  collectionName: string;

  @Prop({
    required: true,
    minlength: 1,
    maxlength: 64,
  })
  symbol: string;

  @Prop({
    required: true,
    min: 0,
    max: 1000,
  })
  amount: number;

  @Prop({
    required: true,
    min: 16,
    max: 1024,
  })
  description: string;

  @Prop({
    default: [],
    type: [{ type: [Types.ObjectId], ref: 'Nft' }],
  })
  set: Nft[];

  @Prop()
  modifiedAt?: Date;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const NftCollectionSchema = SchemaFactory.createForClass(NftCollection);
