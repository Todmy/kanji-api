import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { toArray } from 'src/common/helper/cast.helper';

import { BaseNftCollectionDto } from './base-nft-collection.dto';
import { BaseNftDto } from './base-nft.dto';

export class UpdateNftCollectionDto extends BaseNftCollectionDto {
  @IsOptional()
  picture: string;

  @IsOptional()
  collectionName: string;

  @IsOptional()
  symbol: string;

  @IsOptional()
  amount: number;

  @IsOptional()
  description: string;

  @Transform(({ value }) => toArray(value))
  @IsOptional()
  @IsNotEmpty()
  @IsString({ each: true })
  set?: BaseNftDto[];
}
