import Book from './book.js';
import { bookList, msgBlock } from '../dom_elements.js';

export default bookList.addEventListener('click', (ev) => {
  if (ev.target.classList.contains('remove-button')) {
    Book.remove(ev.target.id);
    Book.updateLocalStorage();
    const itemList = Book.listAll;
    Book.setUI(bookList, itemList());
    Book.setUI(msgBlock, Book.alert(Book.deleteMsg, 'alert-danger'));
    if (Book.list.length === 0) {
      Book.setUI(msgBlock, Book.alert());
      bookList.classList.remove('border');
    }
  }
});