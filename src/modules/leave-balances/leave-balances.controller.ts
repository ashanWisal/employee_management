import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeaveBalancesService } from './leave-balances.service';
import { CreateLeaveBalanceDto } from './dto/create-leave-balance.dto';
import { UpdateLeaveBalanceDto } from './dto/update-leave-balance.dto';

@Controller('leave-balances')
export class LeaveBalancesController {
  constructor(private readonly leaveBalancesService: LeaveBalancesService) {}

  @Post()
  create(@Body() createLeaveBalanceDto: CreateLeaveBalanceDto) {
    return this.leaveBalancesService.create(createLeaveBalanceDto);
  }

  @Get()
  findAll() {
    return this.leaveBalancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaveBalancesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeaveBalanceDto: UpdateLeaveBalanceDto) {
    return this.leaveBalancesService.update(+id, updateLeaveBalanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveBalancesService.remove(+id);
  }
}
