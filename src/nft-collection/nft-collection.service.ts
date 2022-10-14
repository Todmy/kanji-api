import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeleteResult } from 'mongodb';
import { ImageUploaderService } from 'src/image-uploader/image-uploader.service';
import { NftCollection, NftCollectionDocument } from './schemas/nft-collection.schema';
import { CreateNftCollectionDto } from './dto/create-nft-collection.dto';
import { UpdateNftCollectionDto } from './dto/update-nft-collection.dto';
import { FindNftCollectionQueryDto } from './dto/find-nft-collection-query.dto';
import { FindNftCollectionPaginationDto } from './dto/find-nft-collection-pagination.dto';

@Injectable()
export class NftCollectionService {
  constructor(
    @InjectModel(NftCollection.name)
    private readonly model: Model<NftCollectionDocument>,
    private readonly imageUploader: ImageUploaderService,
  ) {}

  findAll(query: FindNftCollectionQueryDto & FindNftCollectionPaginationDto): Promise<NftCollection[]> {
    const mongoQuery = this.getMongoQueryForFindAll(query);
    const { skip: documentsToSkip, limit: limitOfDocuments } = query;

    const dbQuery = this.model.find(mongoQuery).skip(documentsToSkip).sort({ createdAt: -1 });

    if (limitOfDocuments) {
      dbQuery.limit(limitOfDocuments);
    }

    return dbQuery.exec();
  }

  private getMongoQueryForFindAll(query: FindNftCollectionQueryDto) {
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

    return mongoQuery;
  }

  findOne(id: string): Promise<NftCollection> {
    return this.model.findById(id).exec();
  }

  async create(createNftCollectionDto: CreateNftCollectionDto): Promise<NftCollection> {
    const { picture, ...nftCollectionData } = createNftCollectionDto;
    const filePath = picture ? await this.imageUploader.upload(picture) : null;
    return new this.model({
      ...nftCollectionData,
      picture: filePath,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateNftCollectionDto: UpdateNftCollectionDto): Promise<NftCollection> {
    const { picture, ...nftCollectionData } = updateNftCollectionDto;
    let filePath;
    if (picture) {
      filePath = await this.imageUploader.upload(picture);

      // async delete old picture
      this.model.findById(id).then((nftCollection) => {
        this.imageUploader.delete(nftCollection.picture);
      });
    }

    const updateChunk = {
      ...nftCollectionData,
      ...(filePath ? { picture: filePath } : {}),
      updatedAt: new Date(),
    };

    return this.model.findByIdAndUpdate(id, updateChunk, { new: true }).exec();
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
