class Book {
  constructor(author = '', title = '', description = '') {
    this.id = Math.random().toString().slice(2,);
    this.author = author;
    this.title = title;
    this.description = description;
    if(!this.isValid()) this.presentException();
  }

  isValid() {
    return this.author && this.title && this.description;
  }

  presentException() {
    throw new Error('You must pass all the required infos to registrate a book');
  }
}

class Library {
  constructor(books = []) {
    this.books = books;
  }

  addBook(info = {}) {
    const newBook = new Book(info.author, info.title, info.description);
    this.books.push(newBook);
    return newBook;
  }

  getBooks() {
    return this.books;
  }

  removeBookById(bookId) {
    if(!bookId) this.presentEmptyIdException();
    this.books = this.books.filter(({ id }) => id !== bookId);
  }

  getBookById(bookId) {
    if(!bookId) this.presentEmptyIdException();
    const possibleBooks = this.books.filter(({ id }) => id === bookId);
    if(!possibleBooks.length) this.presentBookNotFoundException(bookId);
    return possibleBooks[0];
  }

  updateBookById(bookId, infos = {}) {
    let book = this.getBookById(bookId);
    const index = this.books.indexOf(book);
    book = {...book, ...infos};
    this.books[index] = book;
  }

  presentEmptyIdException() {
    throw new Error('You must pass the book id');
  }

  presentBookNotFoundException(id) {
    throw new Error(`No book was found with the id=${id}`);
  }
}