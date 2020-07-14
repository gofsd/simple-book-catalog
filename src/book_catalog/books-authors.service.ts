import { Injectable } from '@nestjs/common';
import { Book } from './models/book.model';
import { Author } from './models/author.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as queries from './books-authors.queries'



@Injectable()
export class BookCatalogService {
  public db: any;

  constructor(@InjectRepository(Author) authorRepository: Repository<Author>) {
    this.db = authorRepository.manager;
  }

  async getOneRow(query: string, args: Array<any>): Promise<any> {
    const result = await this.db.query(query, args);
    return result.length ? result[0] : {}
  }

  async createAuthor(data: any): Promise<Author> {
    return await this.getOneRow(queries.createAuthor, [data.firstName, data.lastName]);
  }

  async createBook(data: any): Promise<Book> {
    return await this.getOneRow(queries.createBook, [data.title]);
  }

  async getAuthor(id: number): Promise<Author> {
    return await this.getOneRow(queries.getAuthor, [id]);
  }

  async getBook(id: number): Promise<any> {
    return await this.getOneRow(queries.getBook, [id]);
  }

  async getBooks(title?: string): Promise<any> {
    if(!title){
      return await this.db.query(queries.getBooksAll);
    }
    return await this.db.query(queries.getBooks, [title]);
  }

  async getAuthors(minNumberOfBooks: number, maxNumberOfBooks: number): Promise<any> {
    if(minNumberOfBooks && maxNumberOfBooks) {
      return await this.db.query(queries.getAuthors);
    } else if(minNumberOfBooks) {

    }
    return await this.db.query(queries.getAuthorsAll);
  }

  async addAuthor(bookId: number, authorId: number): Promise<Book> {
    return await this.getOneRow(queries.addAuthor, [bookId, authorId]);
  }

  async deleteAuthor(id: number): Promise<number> {
    const result = await this.db.query(queries.deleteAuthor, [ id ]);
    return result[1];
  }

  async deleteBook(id: number): Promise<number> {
    const result = await this.db.query(queries.deleteBook, [ id ]);
    return result[1];
  }

  async deleteAuthorWithBooks(id: number): Promise<number> {
    let affectedRowsCount = 0;
    const result = await this.db.query(queries.deleteAuthorWithBooks, [ id ]);
    if(!result[1])return 0;

    affectedRowsCount = result[1];
    affectedRowsCount += await this.deleteAuthor(id);
    for(let i = 0; i < result[0].length; i++){
      let res: any = await this.getOneRow(queries.deleteAuthorWithBooksFromBook, [result[0][i].bookId]);
      if(!+res.count) {
        continue;
      } else {
        affectedRowsCount += await this.deleteBook(result[0][i].bookId)
      }
    }
    return affectedRowsCount;
  }
}
