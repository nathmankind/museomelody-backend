import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UtilService } from 'src/services/utils.service';

@Injectable()
export class UserService {
  constructor(
    //models
    @InjectModel(User.name) private UserModel: Model<User>,

    //services
    private utilService: UtilService,
  ) {}

  async profile(userId: string) {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new BadRequestException('User Unkwown');
    }
    return this.utilService.successResponseHandler(
      'Profile fetched successfully',
      HttpStatus.OK,
      user,
    );
  }

  async getAllUser() {
    const users = await this.UserModel.find().select(['-password']);
    return this.utilService.successResponseHandler(
      'Users fetched successfully',
      HttpStatus.OK,
      users,
    );
  }

  //MISC
  async findUserById(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    return await this.UserModel.findById(id).select(['-password']);
  }
}
