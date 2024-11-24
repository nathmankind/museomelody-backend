import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './schema/event.schema';
import { isValidObjectId, Model } from 'mongoose';
import { CreateEventDto } from './dtos/createEvent.dto';
import { UtilService } from 'src/services/utils.service';
import { RegisterEventDto } from './dtos/registerEvent.dto';
import { TokenPayload } from 'src/interfaces/common';
import { MailService } from 'src/services/mail.service';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class EventsService {
  constructor(
    //Models
    @InjectModel(Event.name) private EventModel: Model<Event>,

    //services
    private utilService: UtilService,
    private mailService: MailService,
    private sharedService: SharedService,
  ) {}

  async createEvent(event: CreateEventDto) {
    const newEvent = new this.EventModel(event);
    await newEvent.save();
    return this.utilService.successResponseHandler(
      'Event created successfully',
      HttpStatus.CREATED,
      newEvent,
    );
  }

  async getAllEvents() {
    const events = await this.EventModel.find();
    return this.utilService.successResponseHandler(
      'Events fetched successfully',
      HttpStatus.OK,
      events,
    );
  }

  async eventDetails(id: string) {
    const event = await this.getEventById(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return this.utilService.successResponseHandler(
      'Event details',
      HttpStatus.OK,
      event,
    );
  }

  async updateEvent(id: string, updateDetails: CreateEventDto) {
    const event = await this.getEventById(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    await this.EventModel.findByIdAndUpdate(id, updateDetails);
    return this.utilService.successResponseHandler(
      'Event updated successfully',
      HttpStatus.OK,
    );
  }

  async eventDelete(id: string) {
    const event = await this.getEventById(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    await this.EventModel.findByIdAndDelete(id);
    return this.utilService.successResponseHandler(
      'Event deleted successfully',
      HttpStatus.OK,
    );
  }

  async userRegisterEvent(
    registerEventDto: RegisterEventDto,
    user: TokenPayload,
  ) {
    const { userId, email } = user;
    const event = await this.getEventById(registerEventDto.eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const isRegistered = event.registeredUsers.find(
      (user) => user.userId === userId,
    );

    if (isRegistered) {
      throw new BadRequestException('User already registered');
    }

    const details = {
      ...registerEventDto,
      email,
      userId,
    };

    event.registeredUsers.push(details);
    await event.save();
    this.mailService.sendEventRegistrationEmail(
      email,
      event.name,
      event.date,
      registerEventDto.fullname,
    );
    return this.utilService.successResponseHandler(
      'User register successfully',
      HttpStatus.OK,
    );
  }

  //MISC
  async getEventById(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid event Id');
    }
    const event = await this.EventModel.findById(id);
    return event;
  }
}
