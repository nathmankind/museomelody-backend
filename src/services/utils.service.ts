import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OtpCode } from 'src/modules/auth/schema/otp.schema';

@Injectable()
export class UtilService {
  constructor(
    private configService: ConfigService,

    //Models
    @InjectModel(OtpCode.name) private OtpCodeModel: Model<OtpCode>,
  ) {}

  async successResponseHandler(message: string, status: number, data?: any) {
    return {
      message,
      status,
      data,
    };
  }

  async generateOTP(email: string) {
    const code = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    await this.OtpCodeModel.updateOne(
      { email },
      { $set: { code, expiresAt } },
      { upsert: true },
    );
    return code;
  }

  async verifyOTP(code: string, email: string) {
    const otpCode = await this.OtpCodeModel.findOneAndDelete({
      email,
      code,
      expiresAt: { $gte: new Date() },
    });
    if (otpCode) {
      return true;
    } else {
      return false;
    }
  }

  // buildFilter(query: any, options: FilterOptions = {}): any {
  //   const filter: any = {};

  //   // Handle exact match filters
  //   if (options.exactMatchFields) {
  //     options.exactMatchFields.forEach((field) => {
  //       if (query[field]) {
  //         filter[field] = query[field];
  //       }
  //     });
  //   }

  //   // Handle regex-based search filters
  //   if (options.searchFields && query.search) {
  //     filter['$or'] = options.searchFields.map((field) => ({
  //       [field]: { $regex: query.search, $options: 'i' },
  //     }));
  //   }

  //   // Handle date range filters (e.g., createdAt between two dates)
  //   if (options.dateRangeFields) {
  //     options.dateRangeFields.forEach(({ field, from, to }) => {
  //       if (from || to) {
  //         filter[field] = {};
  //         if (from) filter[field]['$gte'] = new Date(from);
  //         if (to) filter[field]['$lte'] = new Date(to);
  //       }
  //     });
  //   }

  //   return filter;
  // }

  paginate(page: number, limit: number, totalItems: number, skip: number) {
    const totalPages = Math.ceil(totalItems / limit);
    const from = skip + 1;
    const to = Math.min(skip + limit, totalItems);

    return {
      totalItems,
      totalPages,
      currentPage: page,
      limit,
      from,
      to,
    };
  }
}
