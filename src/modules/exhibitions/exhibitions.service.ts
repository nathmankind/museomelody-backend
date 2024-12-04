import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Exhibition } from './schema/exhibition.schema';
import { isValidObjectId, Model } from 'mongoose';
import { CreateExhibitionDto } from './dtos/createExhibition.dto';
import { UtilService } from '../../services/utils.service';

@Injectable()
export class ExhibitionsService {
  constructor(
    //services
    private utilService: UtilService,

    //models
    @InjectModel(Exhibition.name) private ExhibitionModel: Model<Exhibition>,
  ) {}

  async createExhibition(event: CreateExhibitionDto) {
    const newExhibition = new this.ExhibitionModel(event);
    await newExhibition.save();
    return this.utilService.successResponseHandler(
      'Exhibition created successfully',
      HttpStatus.CREATED,
      newExhibition,
    );
  }

  async getAllExhibition() {
    const exhibition = await this.ExhibitionModel.find();
    return this.utilService.successResponseHandler(
      'Exhibition fetched successfully',
      HttpStatus.OK,
      exhibition,
    );
  }

  async exhibitionDetails(id: string) {
    const exhibition = await this.getExhibitionById(id);
    if (!exhibition) {
      throw new Error('Exhibition not found');
    }
    return this.utilService.successResponseHandler(
      'Event details',
      HttpStatus.OK,
      exhibition,
    );
  }

  async updateExhibition(id: string, updateDetails: CreateExhibitionDto) {
    const exhibition = await this.getExhibitionById(id);
    if (!exhibition) {
      throw new Error('Exhibition not found');
    }

    await this.ExhibitionModel.findByIdAndUpdate(id, updateDetails);
    return this.utilService.successResponseHandler(
      'Exhibition updated successfully',
      HttpStatus.OK,
    );
  }

  async exhibitionDelete(id: string) {
    const exhibition = await this.getExhibitionById(id);
    if (!exhibition) {
      throw new Error('Exhibition not found');
    }

    await this.ExhibitionModel.findByIdAndDelete(id);
    return this.utilService.successResponseHandler(
      'Exhibition deleted successfully',
      HttpStatus.OK,
    );
  }

  //MISC
  async getExhibitionById(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid exhibition Id');
    }
    const exhibition = await this.ExhibitionModel.findById(id);
    return exhibition;
  }
}
