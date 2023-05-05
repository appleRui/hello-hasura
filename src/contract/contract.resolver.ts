import { Query, Resolver } from '@nestjs/graphql';
import { Contract } from './models/contract.model';
import { PrismaClient } from '../prisma/prisma.client';
import { HasuraClient } from 'src/hasura/hasuraClient';
import {
  FindAllPropertiesByPropertyIdsQueryResponse,
  findAllPropertiesByPropertyIdsQuery,
} from 'src/graphql/query.schema';
import { contracts } from '@prisma/client';

@Resolver()
export class ContractResolver {
  constructor(
    private prisma: PrismaClient,
    private hasuraClient: HasuraClient,
  ) {}

  // TODO: utilsに移動
  private margeContractsAndProperties(
    contracts: contracts[],
    properties: FindAllPropertiesByPropertyIdsQueryResponse['properties'],
  ) {
    return contracts.map((contract) => {
      const property = properties.find(
        (property) => property.id === contract.id,
      );
      return {
        ...contract,
        property: {
          ...property,
          latitude: property.geom.coordinates[0],
          longitude: property.geom.coordinates[1],
        },
      };
    });
  }

  @Query(() => [Contract], { nullable: 'items' })
  async findAllContract() {
    const contracts = await this.prisma.contracts.findMany();
    const propertyIds = contracts.map((contract) => contract.id);
    const { properties } =
      await this.hasuraClient.queryWithAuth<FindAllPropertiesByPropertyIdsQueryResponse>(
        findAllPropertiesByPropertyIdsQuery(propertyIds),
      );
    return this.margeContractsAndProperties(contracts, properties);
  }
}
