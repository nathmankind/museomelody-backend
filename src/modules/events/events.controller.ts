import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateEventDto } from './dtos/createEvent.dto';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

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
