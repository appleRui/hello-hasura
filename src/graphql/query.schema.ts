export const findAllPropertiesQuery = `
  query findAllProperties {
    properties {
      id
      name
    }
  }
`;

export const findOnePropertyQuery = (id: number) => `
  query MyQuery {
    properties_by_pk(id: ${id}) {
      geom
      id
      name
    }
  }
`;

export const findAllPropertiesByPropertyIdsQuery = (ids: number[]) => `
  query MyQuery {
    properties(where: {id: {_in: [${ids}]}}) {
      geom
      id
      name
    }
  }
`;

export const findAllProperties = () => `
query MyQuery {
  properties {
    id
    geom
    name
  }
}
`;

export type FindAllPropertiesByPropertyIdsQueryResponse = {
  properties: Property[];
};

export type Property = {
  id: number;
  name: string;
  geom: {
    coordinates: [number, number];
  };
};
