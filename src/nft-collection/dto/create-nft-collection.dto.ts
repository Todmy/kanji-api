import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsDefined } from 'class-validator';
import { pipe, trim, toLowerCase } from 'src/common/helper/cast.helper';

import { BaseNftCollectionDto } from './base-nft-collection.dto';

export class CreateNftCollectionDto extends BaseNftCollectionDto {
  @Transform(({ value }) => pipe(trim, toLowerCase)(value))
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  blockchain: string;

  @Transform(({ value }) => pipe(trim, toLowerCase)(value))
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  dataHost: string;

  @Transform(({ value }) => pipe(trim, toLowerCase)(value))
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  owner: string;
}
