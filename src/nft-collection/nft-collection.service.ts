import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeleteResult } from 'mongodb';
import { NftCollection, NftCollectionDocument } from './schemas/nft-collection.schema';
import { CreateNftCollectionDto } from './dto/create-nft-collection.dto';
import { UpdateNftCollectionDto } from './dto/update-nft-collection.dto';
import { FindNftCollectionQueryDto } from './dto/find-nft-collection-query.dto';

@Injectable()
export class NftCollectionService {
  constructor(
    @InjectModel(NftCollection.name)
    private readonly model: Model<NftCollectionDocument>,
  ) {}

  findAll(query: FindNftCollectionQueryDto): Promise<NftCollection[]> {
    const { createdFrom, createdTo, ...queryParams } = query;
    const mongoQuery = {
      ...queryParams,
      ...(createdFrom || createdTo ? { createdAt: {} } : {}),
    };
    if (createdFrom) {
      mongoQuery.createdAt = {
        ...mongoQuery.createdAt,
        $gte: createdFrom,
      };
    }
    if (createdTo) {
      mongoQuery.createdAt = {
        ...mongoQuery.createdAt,
        $lt: createdTo,
      };
    }
    return this.model.find(mongoQuery).exec();
  }

  findOne(id: string): Promise<NftCollection> {
    return this.model.findById(id).exec();
  }

  create(createNftCollectionDto: CreateNftCollectionDto): Promise<NftCollection> {
    return new this.model({
      ...createNftCollectionDto,
      createdAt: new Date(),
    }).save();
  }

  update(id: string, updateNftCollectionDto: UpdateNftCollectionDto): Promise<NftCollection> {
    return this.model.findByIdAndUpdate(id, updateNftCollectionDto, { new: true }).exec();
  }

  softDelete(id: string): Promise<NftCollection> {
    const deletedUpdate = { deletedAt: new Date() };
    return this.model.findByIdAndUpdate(id, deletedUpdate, { new: true }).exec();
  }

  hardDeleteAll(): Promise<DeleteResult> {
    const query = { deletedAt: { $ne: null } };
    return this.model.deleteMany(query).exec();
  }
}
