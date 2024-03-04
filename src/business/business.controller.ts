/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo'))
 async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBusinessDto: CreateBusinessDto) {
    if (file) {
      createBusinessDto.logo = {
        originalname: file.originalname,
        filename: file.filename,
        path: file.path,
      };
    }

    return this.businessService.create(createBusinessDto);
  }

  @Get()
  findAll() {
    return this.businessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
  @Param('id') id: string,
  @UploadedFile() file: Express.Multer.File,
  @Body() updateBusinessDto: CreateBusinessDto) {
    if (file) {
      console.log(`file `,file);
      updateBusinessDto.logo = {
        originalname: file.originalname,
        filename: file.filename,
        path: file.path,
      };
    }
    return this.businessService.update(id, updateBusinessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessService.remove(id);
  }
}
