import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaySlipsService } from './pay-slips.service';
import { CreatePaySlipDto } from './dto/create-pay-slip.dto';
import { UpdatePaySlipDto } from './dto/update-pay-slip.dto';

@Controller('pay-slips')
export class PaySlipsController {
  constructor(private readonly paySlipsService: PaySlipsService) {}

  @Post()
  create(@Body() createPaySlipDto: CreatePaySlipDto) {
    return this.paySlipsService.create(createPaySlipDto);
  }

  @Get()
  findAll() {
    return this.paySlipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paySlipsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaySlipDto: UpdatePaySlipDto) {
    return this.paySlipsService.update(+id, updatePaySlipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paySlipsService.remove(+id);
  }
}
