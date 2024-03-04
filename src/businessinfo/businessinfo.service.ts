/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBusinessinfoDto } from './dto/create-businessinfo.dto';
import { Businessinfo } from './entities/businessinfo.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BusinessinfoService {

  constructor(@InjectModel(Businessinfo.name) private BusinessinfoModel: Model<Businessinfo>) {}

  async create(createBusinessinfoDto: CreateBusinessinfoDto): Promise<Businessinfo> {
    const createBusinessinfo = new this.BusinessinfoModel(createBusinessinfoDto);
    return createBusinessinfo.save();
  }

  async findAll(): Promise<Businessinfo[]> {
    return this.BusinessinfoModel.find().exec();
  }

  async findOne(id: string): Promise<Businessinfo> {
    const businessinfo = await this.BusinessinfoModel.findById(id).exec();
    if (!businessinfo) {
      throw new NotFoundException(`Businessinfo with id ${id} not found`);
    }
    return businessinfo;
  }

  async update(id: string, updateBusinessinfoDto: CreateBusinessinfoDto): Promise<Businessinfo> {
    const existingBusinessinfo = await this.BusinessinfoModel.findById(id).exec();
    if (!existingBusinessinfo) {
      throw new NotFoundException(`Businessinfo with id ${id} not found`);
    }

    console.log('updateBusinessinfoDto:', updateBusinessinfoDto);
    console.log('existingBusinessinfo before update:', existingBusinessinfo);

    existingBusinessinfo.set({
      name: updateBusinessinfoDto.name || existingBusinessinfo.name,
      emailId: updateBusinessinfoDto.emailId || existingBusinessinfo.emailId,
      contactNumber: updateBusinessinfoDto.contactNumber || existingBusinessinfo.contactNumber,
      address: updateBusinessinfoDto.address || existingBusinessinfo.address,
      logo: updateBusinessinfoDto.logo || existingBusinessinfo.logo,
    });

    console.log('existingBusinessinfo after update:', existingBusinessinfo);

    try {
      const updatedBusinessinfo = await existingBusinessinfo.save();
      console.log('updatedBusinessinfo:', updatedBusinessinfo);
      return updatedBusinessinfo;
    } catch (error) {
      console.error('Error during save:', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.BusinessinfoModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Businessinfo with id ${id} not found`);
    }
  }
}
