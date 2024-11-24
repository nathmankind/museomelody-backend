import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  date: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  location: string;

  @IsBoolean()
  @ApiProperty()
  isVirtual: boolean;

  @IsString()
  @ApiProperty()
  @IsOptional()
  mediaUrl: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  imageUrl: string;
}
