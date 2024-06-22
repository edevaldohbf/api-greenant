import { Module } from '@nestjs/common';
import { DateUtils } from './date/date.utils';

@Module({
  providers: [DateUtils],
})
export class UtilsModule {}
