import { Controller, Get, Param, Body, Post, Put, Delete, Query } from '@nestjs/common';
import { NftCollectionService } from './nft-collection.service';
import { CreateNftCollectionDto } from './dto/create-nft-collection.dto';
import { UpdateNftCollectionDto } from './dto/update-nft-collection.dto';
import { FindNftCollectionQueryDto } from './dto/find-nft-collection-query.dto';

@Controller('nft-collection')
export class NftCollectionController {
  constructor(private readonly service: NftCollectionService) {}

  @Get()
  index(@Query() query: FindNftCollectionQueryDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() createNftCollectionDto: CreateNftCollectionDto) {
    console.log('createNftCollectionDto', createNftCollectionDto);
    return this.service.create(createNftCollectionDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateNftCollectionDto: UpdateNftCollectionDto) {
    return this.service.update(id, updateNftCollectionDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }

  // @Admin() - should be implemented as a guard
  @Delete()
  hardDeleteAll() {
    return this.service.hardDeleteAll();
  }
}
