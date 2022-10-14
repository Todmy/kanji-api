import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsInt, IsDefined, IsOptional } from 'class-validator';
import { IsFile, MaxFileSize, HasMimeType } from 'nestjs-form-data';
import { pipe, trim, toLowerCase, toNumber } from 'src/common/helper/cast.helper';

const MAX_FILE_SIZE = 1024 * 1024 * 100; // 10MB
export class BaseNftCollectionDto {
  @Transform(({ value }) => value)
  @IsOptional()
  @IsFile()
  @MaxFileSize(MAX_FILE_SIZE)
  @HasMimeType(['image/jpeg', 'image/png'])
  picture: Express.Multer.File;

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
