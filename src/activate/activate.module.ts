import { Module } from '@nestjs/common';
import { ActivateService } from './activate.service';
import { ActivateController } from './activate.controller';

@Module({
  controllers: [ActivateController],
  providers: [ActivateService],
})
export class ActivateModule {}
