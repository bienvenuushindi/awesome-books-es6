import Book from './book.js';

export default class BookStorage {
  static update() {
    localStorage.setItem('books', JSON.stringify(Book.list));
  }
}