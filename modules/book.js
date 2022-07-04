export default  class Book {
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