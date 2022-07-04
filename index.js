import Book from './modules/book/book.js';
import {
  bookList,
  addMsgBlock,
  bookForm,
  msgBlock,
  addNewSection,
  bookListSection,
  contactSection,
} from './modules/dom_body_elements.js';

import {
  navAddNew, navLinks, navBar, navContact, navList, hamburgerMenu,
} from './modules/dom_header_elements.js';

import { DateTime } from './lib/luxon.js';

bookForm.addEventListener('submit', (ev) => {
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

bookList.addEventListener('click', (ev) => {
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
if (!localStorage.getItem('books') || Book.retrieveFormLocalStorage().length === 0) {
  Book.setUI(msgBlock, Book.alert());
  bookList.classList.remove('border');
} else {
  const itemList = Book.listAll;
  Book.setUI(bookList, itemList());
}
const clear = () => {
  addMsgBlock.innerHTML = '';
  if (Book.retrieveFormLocalStorage().length !== 0) msgBlock.innerHTML = '';
};

navList.addEventListener('click', () => {
  clear();
  bookListSection.classList.remove('d-none');
  addNewSection.classList.add('d-none');
  contactSection.classList.add('d-none');
});

navAddNew.addEventListener('click', () => {
  clear();
  bookListSection.classList.add('d-none');
  addNewSection.classList.remove('d-none');
  contactSection.classList.add('d-none');
});

navContact.addEventListener('click', () => {
  clear();
  bookListSection.classList.add('d-none');
  addNewSection.classList.add('d-none');
  contactSection.classList.remove('d-none');
});

hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('active');
  navBar.classList.toggle('active');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    hamburgerMenu.classList.remove('active');
    navBar.classList.remove('active');
  });
});
const dt = DateTime.now();
document.getElementById('date-time').innerHTML = `${dt.toLocaleString(DateTime.DATETIME_MED)}`;
