/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile,  } from '@nestjs/common';
import { BusinessinfoService } from './businessinfo.service';
import { CreateBusinessinfoDto } from './dto/create-businessinfo.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('businessinfo')
export class BusinessinfoController {
  constructor(private readonly businessinfoService: BusinessinfoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBusinessinfoDto: CreateBusinessinfoDto
  ) {
    if (file) {
      createBusinessinfoDto.logo = {
        originalname: file.originalname,
        filename: file.filename,
        path: file.path,
      };
    }

    return this.businessinfoService.create(createBusinessinfoDto);
  }

  @Get()
  findAll() {
    return this.businessinfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessinfoService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('logo'))
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateBusinessinfoDto: CreateBusinessinfoDto
  ) {
    if (file) {
      updateBusinessinfoDto.logo = {
        originalname: file.originalname,
        filename: file.filename,
        path: file.path,
      };
    }

    return this.businessinfoService.update(id, updateBusinessinfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessinfoService.remove(id);
  }
}
