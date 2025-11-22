import { Injectable } from '@nestjs/common';
import { CreatePaySlipDto } from './dto/create-pay-slip.dto';
import { UpdatePaySlipDto } from './dto/update-pay-slip.dto';

@Injectable()
export class PaySlipsService {
  create(createPaySlipDto: CreatePaySlipDto) {
    return 'This action adds a new paySlip';
  }

  findAll() {
    return `This action returns all paySlips`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paySlip`;
  }

  update(id: number, updatePaySlipDto: UpdatePaySlipDto) {
    return `This action updates a #${id} paySlip`;
  }

  remove(id: number) {
    return `This action removes a #${id} paySlip`;
  }
}
