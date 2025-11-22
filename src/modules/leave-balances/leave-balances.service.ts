import { Injectable } from '@nestjs/common';
import { CreateLeaveBalanceDto } from './dto/create-leave-balance.dto';
import { UpdateLeaveBalanceDto } from './dto/update-leave-balance.dto';

@Injectable()
export class LeaveBalancesService {
  create(createLeaveBalanceDto: CreateLeaveBalanceDto) {
    return 'This action adds a new leaveBalance';
  }

  findAll() {
    return `This action returns all leaveBalances`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leaveBalance`;
  }

  update(id: number, updateLeaveBalanceDto: UpdateLeaveBalanceDto) {
    return `This action updates a #${id} leaveBalance`;
  }

  remove(id: number) {
    return `This action removes a #${id} leaveBalance`;
  }
}
