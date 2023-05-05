import { Module } from '@nestjs/common';
import { HasuraClient } from './hasuraClient';

@Module({
  providers: [HasuraClient],
  exports: [HasuraClient],
})
export class HasuraModule {}
