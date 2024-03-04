/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BusinessinfoService } from './businessinfo.service';
import { BusinessinfoController } from './businessinfo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Businessinfo, BusinessinfoSchema } from './entities/businessinfo.entity';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [    
    MulterModule.register({
      storage: diskStorage({
        destination: './images',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const originalnameWithoutSpaces = file.originalname.replace(/\s+/g, '-');
          callback(null, `${uniqueSuffix}-${originalnameWithoutSpaces}`);
        },
      }),
    }),
    MongooseModule.forFeature([{ name: Businessinfo.name, schema: BusinessinfoSchema }]),
    ],
  controllers: [BusinessinfoController],
  providers: [BusinessinfoService],
})
export class BusinessinfoModule {}
