// Classes

/**
 * Documentação da classe Book
 * @param {string} title
 * @param {string} author
 * @param {number} pages
 * @param {string} read
 * @property {string} title
 * @property {string} author
 * @property {number} pages
 * @property {string} read
 * @property {function(): string} info
 */
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }
}

/**
 * Documentação da classe Library
 * @property {Book[]} books
 * @property {function(Book): void} addBook
 * @property {function(Book): void} removeBook
 * @property {function(): Book[]} getBooks
 */
class Library {
  constructor() {
    this.books = [];
  }
  addBook(book) {
    this.books.push(book);
  }
  removeBook(book) {
    this.books.splice(this.books.indexOf(book), 1);
  }
  getBooks() {
    return this.books;
  }
}

//Aplicação
const myLibrary = new Library();
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.addBook(book);
}

const botao = document.querySelector(".btn");
botao.addEventListener("click", () => {
  console.log("botão funcionando");
});
