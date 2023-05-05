import { GraphQLClient } from 'graphql-request';
import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

@Injectable()
export class HasuraClient {
  private client: GraphQLClient;

  constructor() {
    this.client = new GraphQLClient(
      process.env.HASURA_ENDPOINT ?? 'http://localhost:8080/v1/graphql',
    );
  }

  async query<T>(query, variables = {}) {
    const data = await this.client.request<T>(query, variables);
    return data;
  }

  private async auth() {
    const claim = {
      iat: Math.floor(Date.now() / 1000) - 30,
      exp: Math.floor(Date.now() / 1000) + 60 * 3,
      name: 'developer',
      admin: true,
      'https://hasura.io/jwt/claims': {
        'x-hasura-default-role': 'developer',
        'x-hasura-allowed-roles': ['developer'],
      },
    };
    const private_key = process.env.PRIVATE_KEY;

    const token = sign(claim, private_key, {
      algorithm: 'RS256',
    });
    return token;
  }

  async queryWithAuth<T>(query) {
    const data = await this.client
      .request<T>(query, undefined, {
        Authorization: `Bearer ${await this.auth()}`,
      })
      .catch((e) => {
        throw e;
      });
    return data;
  }
}
