import { DateTime } from '../../lib/luxon.js';

const bookForm = document.getElementById('book-form');
const bookList = document.querySelector('.books');
const msgBlock = document.getElementById('msg-block');
const addMsgBlock = document.getElementById('add-msg-block');

class Book {
  static list = [];

  static noBookFoundMsg = 'No Book Found, Please Add First !';

  static deleteMsg = 'Book deleted successfully.';

  static insertMsg = 'Book added successfully.';

  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  store() {
    Book.list.push(this);
  }

  static remove(index) {
    return Book.list.splice(index, 1);
  }

  get details() {
    return ((this.title) + (this.author));
  }

  static updateLocalStorage() {
    localStorage.setItem('books', JSON.stringify(Book.list));
  }

  static retrieveFormLocalStorage() {
    Book.list = [...JSON.parse(localStorage.getItem('books'))];
    return Book.list;
  }

  static setUI(target, value) {
    target.innerHTML = value;
  }

  static alert(msg = this.noBookFoundMsg, classList = 'alert-info') {
    return `<div class='alert ${classList}'>${msg}</div> `;
  }

  static listAll() {
    return Book.retrieveFormLocalStorage().map((book, index) => ` <li class='book-item d-flex justify-content-between p-2 ${index % 2 === 0 ? 'bg-secondary text-white' : ''}'>
                    <div class='book-info d-flex w-100 align-items-center text-15'>
                         <div class='book-title mr-1'> ${book.title} </div>
                         <span>&nbsp; by &nbsp;</span>
                         <div class='book-author mr-1'> ${book.author} </div>
                    </div>
                    <div class='action '>
                        <button type='button' class='remove-button btn btn-danger ml-auto small btn-sm' id='${index}'>Remove</button>
                    </div>
                    <hr>
                </li> `).join(' ');
  }
}

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