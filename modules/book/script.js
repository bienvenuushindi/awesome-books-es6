import Book from './book.js';
import { bookList, msgBlock } from '../dom_elements.js';

if (!localStorage.getItem('books') || Book.retrieveFormLocalStorage().length === 0) {
  Book.setUI(msgBlock, Book.alert());
  bookList.classList.remove('border');
} else {
  const itemList = Book.listAll;
  Book.setUI(bookList, itemList());
}