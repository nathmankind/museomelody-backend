import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateExhibitionDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @ApiProperty()
  @IsNotEmpty()
  endDate: Date;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  description: string;
}
