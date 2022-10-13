import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsDefined, IsEthereumAddress, IsEnum } from 'class-validator';
import { pipe, trim, toLowerCase } from 'src/common/helper/cast.helper';
import { NftCollectionBlockchain, NftCollectionDataHost } from '../enums';

import { BaseNftCollectionDto } from './base-nft-collection.dto';

const enumErrorMessageFn = (validationArguments) => {
  const [enumConstraints] = validationArguments.constraints;
  const alowedValues = Object.values(enumConstraints)
    .map((value) => `'${value}'`)
    .join(', ');
  return `${validationArguments.property} should be one of values: ${alowedValues}`;
};

export class CreateNftCollectionDto extends BaseNftCollectionDto {
  @Transform(({ value }) => pipe(trim, toLowerCase)(value))
  @IsEnum(NftCollectionBlockchain, { message: enumErrorMessageFn })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  blockchain: NftCollectionBlockchain;

  @Transform(({ value }) => pipe(trim, toLowerCase)(value))
  @IsEnum(NftCollectionDataHost, { message: enumErrorMessageFn })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  dataHost: NftCollectionDataHost;

  @Transform(({ value }) => pipe(trim, toLowerCase)(value))
  @IsDefined()
  @IsNotEmpty()
  @IsEthereumAddress()
  owner: string;
}
