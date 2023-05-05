import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ContractResolver } from './contract.resolver';
import { HasuraModule } from 'src/hasura/hasura.module';

@Module({
  imports: [PrismaModule, HasuraModule],
  providers: [ContractResolver],
})
export class ContractModule {}
