import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Property } from './property.model';

@ObjectType()
export class Contract {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  url: string;

  @Field(() => Int, { nullable: true })
  status?: number;

  @Field(() => Property)
  property: Property;
}
