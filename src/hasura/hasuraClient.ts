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

  // https://hasura.io/docs/1.0/graphql/core/auth/authentication/jwt.html#using-jwt-tokens
  private async generateToken() {
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
    const privateKey = process.env.PRIVATE_KEY;

    const token = sign(claim, privateKey, {
      algorithm: 'RS256',
    });
    return token;
  }

  /**
   * JWT認証付きクエリを実行
   * @param fn
   * @returns
   */
  async execute<T>(fn: (client: GraphQLClient) => Promise<T>): Promise<T> {
    const client = this.client.setHeader(
      'Authorization',
      `Bearer ${await this.generateToken()}`,
    );
    return fn(client);
  }
}
