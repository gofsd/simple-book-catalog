import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Author } from './author.model'

@ObjectType()
export class Book {
  @Field(type => Int)
  id: number;

  @Field()
  title: string;

  @Field(type => [Author])
  authors: number;
}

