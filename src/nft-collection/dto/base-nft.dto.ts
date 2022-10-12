import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsDefined } from 'class-validator';
import { pipe, trim, toLowerCase } from 'src/common/helper/cast.helper';

export class BaseNftDto {
  @Transform(({ value }) => pipe(trim, toLowerCase)(value))
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  picture: string;

  @Transform(({ value }) => pipe(trim, toLowerCase)(value))
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  source: string;

  @Transform(({ value }) => pipe(trim, toLowerCase)(value))
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  price: string;
}
