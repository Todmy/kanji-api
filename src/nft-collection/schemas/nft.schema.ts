import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { NftCollection } from './nft-collection.schema';

export type NftDocument = Nft & Document;

@Schema()
export class Nft {
  @Prop({ required: true })
  picture: string;

  @Prop({ required: true })
  source: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'NftCollection',
  })
  collection: NftCollection;

  // user module import?
  @Prop({ required: true })
  owner: string;

  @Prop({ required: true })
  price: string;

  @Prop()
  modifiedAt?: Date;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const NftSchema = SchemaFactory.createForClass(Nft);
