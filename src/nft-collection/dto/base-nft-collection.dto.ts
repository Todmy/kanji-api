import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsInt, IsDefined } from 'class-validator';
import { pipe, trim, toLowerCase, toNumber } from 'src/common/helper/cast.helper';

export class BaseNftCollectionDto {
  @Transform(({ value }) => pipe(trim, toLowerCase)(value))
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  picture: string;

  @Transform(({ value }) => pipe(trim, toLowerCase)(value))
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  collectionName: string;

  @Transform(({ value }) => pipe(trim, toLowerCase)(value))
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @Transform(({ value }) => toNumber(value))
  @IsDefined()
  @IsNotEmpty()
  @IsInt()
  amount: number;

  @Transform(({ value }) => pipe(trim, toLowerCase)(value))
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  description: string;
}
