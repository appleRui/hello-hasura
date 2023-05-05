import { Module } from '@nestjs/common';
import { PropertyResolver } from './property.resolver';
import { HasuraModule } from 'src/hasura/hasura.module';

@Module({
  providers: [PropertyResolver],
  imports: [HasuraModule],
})
export class PropertyModule {}
