import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessinfoDto } from './create-businessinfo.dto';

export class UpdateBusinessinfoDto extends PartialType(CreateBusinessinfoDto) {}
