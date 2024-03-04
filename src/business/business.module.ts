/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Business, Businessschema } from './entities/business.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
  MulterModule.register({
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const originalnameWithoutSpaces = file.originalname.replace(/\s+/g, '-');
        callback(null, `${uniqueSuffix}-${originalnameWithoutSpaces}`);
      },
    }),
  }),
  MongooseModule.forFeature([{ name: Business.name, schema: Businessschema }]),
  ],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
