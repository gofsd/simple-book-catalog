import { Module } from '@nestjs/common';
import { AuthorResolver, BookResolver } from './books-authors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import Book from './entities/book.entity'
import Author from './entities/author.entity'
import { BookCatalogService } from './books-authors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Book])],
  providers: [ BookCatalogService, AuthorResolver, BookResolver],
})
export class RecipesModule {}
