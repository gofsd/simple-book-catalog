export const createAuthor = `insert into author("firstName", "lastName") values($1, $2) returning id, "firstName", "lastName"`;
export const createBook = `insert into book(title) values($1) returning id, title`;
export const getBook = `select * from book where id = $1`;
export const getBooksAll = `select * from book`;
export const getBooks = `select * from book where title like $1`;
export const getAuthor = `select * from author where id = $1`;
export const getAuthors = `select * from book`;
export const getAuthorsAll = `select * from author`;
export const addAuthor = `WITH rows AS ( insert into book_categories_author("bookId", "authorId") values($1, $2) returning "bookId" ) select book.* from rows join book on book.id = rows."bookId"`;
export const deleteAuthor = `delete from author where id = $1`;
export const deleteBook = `delete from book where id = $1`;
export const deleteAuthorWithBooks = `delete from book_categories_author where "authorId" = $1 returning *`;
export const deleteAuthorWithBooksFromBook = `select count(*) from book_categories_author where "bookId" = $1`;

