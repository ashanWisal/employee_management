import { Module } from '@nestjs/common';
import { PaySlipsService } from './pay-slips.service';
import { PaySlipsController } from './pay-slips.controller';

@Module({
  controllers: [PaySlipsController],
  providers: [PaySlipsService],
})
export class PaySlipsModule {}
