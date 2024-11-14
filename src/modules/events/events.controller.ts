import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateEventDto } from './dtos/createEvent.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from '../auth/enums/role.enum';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Roles(Role.ADMIN, Role.MEMBER)
  @UseGuards(RolesGuard)
  @Post('create')
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Get('/')
  getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  @Get('/:id')
  getEventDetails(@Param('id') id: string) {
    return this.eventsService.eventDetails(id);
  }

  @Put('/:id')
  updateEventDetails(
    @Param('id') id: string,
    @Body() updateEventDto: CreateEventDto,
  ) {
    return this.eventsService.updateEvent(id, updateEventDto);
  }

  @Delete('/:id')
  deleteEvent(@Param('id') id: string) {
    return this.eventsService.eventDelete(id);
  }
}
