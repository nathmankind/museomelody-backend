import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './schema/event.schema';
import { isValidObjectId, Model } from 'mongoose';
import { CreateEventDto } from './dtos/createEvent.dto';
import { UtilService } from 'src/services/utils.service';

@Injectable()
export class EventsService {
  constructor(
    //Models
    @InjectModel(Event.name) private EventModel: Model<Event>,

    //services
    private utilService: UtilService,
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
      throw new Error('Event not found');
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
      throw new Error('Event not found');
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
      throw new Error('Event not found');
    }

    await this.EventModel.findByIdAndDelete(id);
    return this.utilService.successResponseHandler(
      'Event deleted successfully',
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
