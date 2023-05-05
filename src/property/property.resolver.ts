import { Query, Resolver } from '@nestjs/graphql';
import { format } from 'path';
import { Property } from 'src/contract/models/property.model';
import {
  FindAllPropertiesByPropertyIdsQueryResponse,
  findAllProperties,
} from 'src/graphql/query.schema';
import { HasuraClient } from 'src/hasura/hasuraClient';

@Resolver()
export class PropertyResolver {
  constructor(private hasuraClient: HasuraClient) {}

  @Query(() => [Property], { nullable: 'items' })
  async findAllProperties() {
    const { properties } =
      await this.hasuraClient.queryWithAuth<FindAllPropertiesByPropertyIdsQueryResponse>(
        findAllProperties(),
      );
    return formatProperties(properties);
  }
}
function formatProperties(
  properties: import('src/graphql/query.schema').Property[],
) {
  return properties.map((property) => {
    return {
      ...property,
      latitude: property.geom.coordinates[0] ?? 0,
      longitude: property.geom.coordinates[1] ?? 0,
    };
  });
}
