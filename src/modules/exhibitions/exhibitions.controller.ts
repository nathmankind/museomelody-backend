import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ExhibitionsService } from './exhibitions.service';
import { CreateExhibitionDto } from './dtos/createExhibition.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '../auth/enums/role.enum';
import { Public } from '../../decorators/public.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

@ApiTags('Exhibitions')
@Controller('exhibitions')
export class ExhibitionsController {
  constructor(private readonly exhibitionsService: ExhibitionsService) {}

  @Post('create')
  create(@Body() createEventDto: CreateExhibitionDto) {
    return this.exhibitionsService.createExhibition(createEventDto);
  }

  @Public()
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

  @Roles(Role.ADMIN, Role.MEMBER)
  @UseGuards(RolesGuard)
  @Delete('/:id')
  deleteExhibition(@Param('id') id: string) {
    return this.exhibitionsService.exhibitionDelete(id);
  }
}
