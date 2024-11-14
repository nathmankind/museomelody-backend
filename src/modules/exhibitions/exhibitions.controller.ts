import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ExhibitionsService } from './exhibitions.service';
import { CreateExhibitionDto } from './dtos/createExhibition.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Exhibitions')
@Controller('exhibitions')
export class ExhibitionsController {
  constructor(private readonly exhibitionsService: ExhibitionsService) {}

  @Post('create')
  create(@Body() createEventDto: CreateExhibitionDto) {
    return this.exhibitionsService.createExhibition(createEventDto);
  }

  @Get('/')
  getAllExhibitions() {
    return this.exhibitionsService.getAllExhibition();
  }

  @Get('/:id')
  getExhibitionDetails(@Param('id') id: string) {
    return this.exhibitionsService.exhibitionDetails(id);
  }

  @Put('/:id')
  updateExhibitionDetails(
    @Param('id') id: string,
    @Body() updateEventDto: CreateExhibitionDto,
  ) {
    return this.exhibitionsService.updateExhibition(id, updateEventDto);
  }

  @Delete('/:id')
  deleteExhibition(@Param('id') id: string) {
    return this.exhibitionsService.exhibitionDelete(id);
  }
}
