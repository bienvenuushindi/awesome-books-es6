import { DateTime } from '../../lib/luxon.js';
import Book from '../../modules/book.js';
import BookStorage from '../../modules/book_storage.js';

const bookForm = document.getElementById('book-form');
const bookList = document.querySelector('.books');
const msgBlock = document.getElementById('msg-block');
const addMsgBlock = document.getElementById('add-msg-block');

bookForm.addEventListener('submit', (ev) => {
  const title = bookForm.elements.title.value;
  const author = bookForm.elements.author.value;
  const book = new Book(title, author);
  book.store();
  bookForm.elements.title.value = '';
  bookForm.elements.author.value = '';
  BookStorage.update();
  const itemList = Book.listAll;
  Book.setUI(bookList, itemList());
  Book.setUI(addMsgBlock, Book.alert(Book.insertMsg, 'alert-success'));
  bookList.classList.add('border');
  ev.preventDefault();
});

bookList.addEventListener('click', (ev) => {
  if (ev.target.classList.contains('remove-button')) {
    Book.remove(ev.target.id);
    BookStorage.update();
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

// ##################### Website Navigation

const navList = document.querySelector('#nav-list');
const navAddNew = document.querySelector('#nav-add-new');
const navContact = document.querySelector('#nav-contact');

const bookListSection = document.querySelector('.books-list');
const addNewSection = document.querySelector('.add-new-book');
const contactSection = document.querySelector('.add-contact-info');
const clear = () => {
  addMsgBlock.innerHTML = '';
  if (Book.retrieveFormLocalStorage().length !== 0) msgBlock.innerHTML = '';
};

const dt = DateTime.now();
document.getElementById('date-time').innerHTML = `${dt.toLocaleString(DateTime.DATETIME_MED)}`;
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

// ################ Mobile navbar ############

const hamburgerMenu = document.querySelector('.hamburger');
const navBar = document.querySelector('nav');
const navLinks = document.querySelectorAll('#nav-links li');

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