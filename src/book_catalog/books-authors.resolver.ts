import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthorInput, BookInput } from './dto/book-catalog';
import { Author } from './models/author.model';
import { BookCatalogService } from './books-authors.service';
import { Book } from './models/book.model';
import { addAuthorBook } from './dto/book-catalog'
import { NotFoundException } from '@nestjs/common';




@Resolver(of => Book)
export class BookResolver {
  constructor(private readonly bookService: BookCatalogService) {

  }

  @Query(returns => Book, {nullable: true})
  async getBook(@Args('id') id: number): Promise<any> {
    //@ts-ignore
    const book = await this.bookService.getBook(id);
    if (!book) {
      return null;
    }
    //@ts-ignore
    return book;
  }

  @Query(returns => [Book], {nullable: true})
  async getBooks(@Args('title', {nullable: true}) title?: string): Promise<Book> {
    const books = await this.bookService.getBooks(title);
    return books;
  }

  @Mutation(returns => Book)
  async createBook(
    @Args('newBookData') newBookData: BookInput,
  ): Promise<Book> {
    const recipe = await this.bookService.createBook(newBookData);
    return recipe;
  }

  @Mutation(returns => Number)
  async deleteBook(@Args('id') id: number): Promise<number>  {
    return this.bookService.deleteBook(id);
  }
}

@Resolver(of => Author)
export class AuthorResolver {
  constructor(private readonly bookService: BookCatalogService) {}

  @Query(returns => Author, {nullable: true})
  async getAuthor(@Args('id') id: number): Promise<Author> {
    const author = await this.bookService.getAuthor(id);
    if (!author) {
      return null;
    }
    //@ts-ignore
    return author;
  }

  @Query(returns => [Author], {nullable: true})
  async getAuthors(
      @Args('minNumberOfBooks', {nullable: true}) minNumberOfBooks: number,
      @Args('maxNumberOfBooks', {nullable: true}) maxNumberOfBooks: number
    ): Promise<Author> {
    const authors = await this.bookService.getAuthors(minNumberOfBooks, maxNumberOfBooks);

    return authors;
  }

  @Mutation(returns => Author)
  async createAuthor(
    @Args('newAuthorData') newAuthorData: AuthorInput,
  ): Promise<Author> {
    console.log(this, 'from books authors resolver')
    //@ts-ignore
    const author = await this.bookService.createAuthor(newAuthorData);
        //@ts-ignore

    return author;
  }

  @Mutation(returns => Book)
  async addAuthor(
    @Args('bookId') bookId: number,
    @Args('authorId') authorId: number
    ): Promise<Book> {
      console.log('add author: ', bookId, authorId)
      //@ts-ignore
    return this.bookService.addAuthor(bookId, authorId);
  }

  @Mutation(returns => Number)
  async deleteAuthor(@Args('id') id: number):Promise<number> {
    return await this.bookService.deleteAuthor(id);
  }

  @Mutation(returns => Number)
  async deleteAuthorWithBooks(@Args('id') id: number):Promise<number> {
    return this.bookService.deleteAuthorWithBooks(id);
  }

}
