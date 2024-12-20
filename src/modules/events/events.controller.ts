import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateEventDto } from './dtos/createEvent.dto';
import { Role } from '../auth/enums/role.enum';
import { RegisterEventDto } from './dtos/registerEvent.dto';
import { Roles } from '../../decorators/roles.decorator';
import { Public } from '../../decorators/public.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { ExtendApiReq } from '../../interfaces/common';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post('create')
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Public()
  @Get('/')
  getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  @Get('/admin')
  getAllEventsByAdmin() {
    return this.eventsService.getAllEvents();
  }

  @Public()
  @Get('/:id')
  getEventDetails(@Param('id') id: string) {
    return this.eventsService.eventDetails(id);
  }

  @Get('/admin/:id')
  getEventDetailsByAdmin(@Param('id') id: string) {
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

  @Post('/user/register')
  userRegister(
    @Body() registerEventDto: RegisterEventDto,
    @Req() request: ExtendApiReq,
  ) {
    return this.eventsService.userRegisterEvent(registerEventDto, request.user);
  }
}
