/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { Business } from './entities/business.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business.name) private businessmodel:Model<Business>
  ){}
  async create(createBusinessDto: CreateBusinessDto): Promise<Business> {
    const createBusinessinfo = new this.businessmodel(createBusinessDto);
    return createBusinessinfo.save();
  }

  async findAll(): Promise<Business[]> {
    return this.businessmodel.find().exec();
  }

  async findOne(id: string): Promise<Business> {
    const businessinfo = await this.businessmodel.findById(id).exec();
    if (!businessinfo) {
      throw new NotFoundException(`Businessinfo with id ${id} not found`);
    }
    return businessinfo;
  }

  async update(id: string, updateBusinessDto: CreateBusinessDto): Promise<Business> {
    const existingBusiness = await this.businessmodel.findById(id).exec();
    if (!existingBusiness) {
      throw new NotFoundException(`Businessinfo with id ${id} not found`);
    }

    console.log('updateBusinessinfoDto:', updateBusinessDto);
    // console.log('existingBusinessinfo before update:', existingBusinessinfo);

    // existingBusiness.set({
    //   name: updateBusinessDto.name || existingBusiness.name,
    //   emailId: updateBusinessDto.emailId || existingBusiness.emailId,
    //   contactNumber: updateBusinessDto.contactNumber || existingBusiness.contactNumber,
    //   address: updateBusinessDto.address || existingBusiness.address,
    //   logo: updateBusinessDto.logo || existingBusiness.logo,
    // });

    existingBusiness.name = updateBusinessDto.name || existingBusiness.name;
    existingBusiness.emailId = updateBusinessDto.emailId || existingBusiness.emailId;
    existingBusiness.contactNumber = updateBusinessDto.contactNumber || existingBusiness.contactNumber;
    existingBusiness.address= updateBusinessDto.address || existingBusiness.address


    if (existingBusiness.logo) {
      existingBusiness.logo = updateBusinessDto.logo;
    }

    try {
      const updateBusinessDto = await existingBusiness.save();
      console.log('updateBusinessDto:', existingBusiness);
      return updateBusinessDto;
    } catch (error) {
      console.error('Error during save:', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.businessmodel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Businessinfo with id ${id} not found`);
    }
  }
}
