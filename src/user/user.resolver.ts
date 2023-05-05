import { Query, Resolver } from '@nestjs/graphql';
import { User } from './model/user.model';
import { HasuraClient } from 'src/hasura/hasuraClient';

@Resolver()
export class UserResolver {
  constructor(private hasuraClient: HasuraClient) {}

  @Query(() => [User], { nullable: 'items' })
  async findUser() {
    const { users } = await this.hasuraClient.queryWithAuth<{
      users: User[];
    }>(
      `query MyQuery {
        users {
          id
          name
        }
      }
      `,
    );
    return users;
  }
}
