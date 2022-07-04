import Book from './book.js';
import { bookList, addMsgBlock, bookForm } from '../dom_elements.js';

export default bookForm.addEventListener('submit', (ev) => {
  const title = bookForm.elements.title.value;
  const author = bookForm.elements.author.value;
  const book = new Book(title, author);
  book.store();
  bookForm.elements.title.value = '';
  bookForm.elements.author.value = '';
  Book.updateLocalStorage();
  const itemList = Book.listAll;
  Book.setUI(bookList, itemList());
  Book.setUI(addMsgBlock, Book.alert(Book.insertMsg, 'alert-success'));
  bookList.classList.add('border');
  ev.preventDefault();
});
