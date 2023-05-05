import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Property {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;
}
