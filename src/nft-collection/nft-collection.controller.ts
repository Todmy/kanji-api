import { Controller, Get, Param, Body, Post, Put, Delete, Query } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { NftCollectionService } from './nft-collection.service';
import {
  CreateNftCollectionDto,
  UpdateNftCollectionDto,
  FindNftCollectionQueryDto,
  FindNftCollectionPaginationDto,
} from './dto';
@Controller('nft-collection')
export class NftCollectionController {
  constructor(private readonly service: NftCollectionService) { }

  @Get()
  index(@Query() query: FindNftCollectionQueryDto & FindNftCollectionPaginationDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @FormDataRequest()
  create(@Body() createNftCollectionDto: CreateNftCollectionDto) {
    return this.service.create(createNftCollectionDto);
  }

  @Put(':id')
  @FormDataRequest()
  update(@Param('id') id: string, @Body() updateNftCollectionDto: UpdateNftCollectionDto) {
    if (Object.keys(updateNftCollectionDto).length === 0) {
      return this.service.findOne(id);
    }
    return this.service.update(id, updateNftCollectionDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }

  // TODO: @Admin() - should be implemented as a guard
  @Delete()
  hardDeleteAll() {
    return this.service.hardDeleteAll();
  }
}
