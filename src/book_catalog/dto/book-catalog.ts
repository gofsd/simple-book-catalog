import { Field, InputType, Int, ArgsType } from '@nestjs/graphql';
import { MinLength, Min, MaxLength } from 'class-validator';

@ArgsType()
export class getEntityById {
  @Field(type => Int)
  @Min(0)
  id:number;
}

@ArgsType()
export class getAuthorByMinMaxRangeOfBooks {
  @Field(type => Int)
  @Min(0)
  minNumberOfBooks:number;

  @Field(type => Int)
  @Min(0)
  maxNumberOfBooks:number;
}

@ArgsType()
export class getByTitle {
  @Field({ defaultValue: '' })
  @MinLength(3)
  id:string;
}

@InputType()
export class entityById {
  @Field(type => Int)
  @Min(0)
  id:number;
}

@InputType()
export class addAuthorBook {
  @Field(type => Int)
  @Min(0)
  bookId:number;

  @Field(type => Int)
  @Min(0)
  authorId:number;
}

@InputType()
export class BookInput {
  @Field()
  @MaxLength(30)
  title: string;

}

@InputType()
export class AuthorInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;
}

