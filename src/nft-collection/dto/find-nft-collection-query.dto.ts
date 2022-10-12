import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { pipe, trim, toLowerCase, toDate } from 'src/common/helper/cast.helper';

export class FindNftCollectionQueryDto {
  @Transform(({ value }) => pipe(trim, toLowerCase)(value))
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly collectionName?: string;

  @Transform(({ value }) => pipe(trim, toLowerCase)(value))
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly symbol?: string;

  @Transform(({ value }) => pipe(trim, toLowerCase)(value))
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly owner?: string;

  @Transform(({ value }) => pipe(trim, toLowerCase)(value))
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly blockchain?: string;

  @Transform(({ value }) => pipe(trim, toLowerCase)(value))
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly dataHost?: string;

  @Transform(({ value }) => toDate(value))
  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  readonly createdFrom?: Date;

  @Transform(({ value }) => toDate(value))
  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  readonly createdTo: Date;
}
