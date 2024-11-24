import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  @ApiProperty()
  @IsOptional()
  mediaUrl: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  imageUrl: string;
}
