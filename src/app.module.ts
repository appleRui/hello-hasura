import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ContractResolver } from './contract/contract.resolver';
import { ContractModule } from './contract/contract.module';
import { HasuraModule } from './hasura/hasura.module';
import { UserModule } from './user/user.module';
import { UserResolver } from './user/user.resolver';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ContractModule,
    HasuraModule,
    UserModule,
    PropertyModule,
  ],
  providers: [ContractResolver, UserResolver],
})
export class AppModule {}
