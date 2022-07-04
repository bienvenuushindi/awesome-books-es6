import {
  addMsgBlock,
  navList,
  navContact,
  navAddNew,
  bookListSection,
  addNewSection,
  contactSection,
  msgBlock,
} from '../dom_elements.js';

import Book from '../book/book.js';

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
