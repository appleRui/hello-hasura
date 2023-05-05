import { Module } from '@nestjs/common';
import { HasuraModule } from 'src/hasura/hasura.module';
import { UserResolver } from './user.resolver';

@Module({
  controllers: [],
  imports: [HasuraModule],
  providers: [UserResolver],
})
export class UserModule {}
