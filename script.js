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
  toHTML() {
    const card = document.createElement("div");
    card.classList.add("bookCard");
    const title = document.createElement("h1");
    title.textContent = this.title;
    const author = document.createElement("p");
    author.textContent = `De: ${this.author}`;
    const pages = document.createElement("p");
    pages.textContent = `Número de Páginas: ${this.pages}`;
    const read = document.createElement("p");
    read.textContent = `Já leu? ${this.read}`;
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);

    return card;
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
const botaoAdd = document.querySelector(".btn");
const board = document.querySelector("main");
const modal = document.querySelector(".modalAddLivro");
const botaoRmv = document.querySelector(".close");

function addBook(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.addBook(book);
}

let livro = new Book("Anna Karenina", "Leo Tolstoy", 836, "Sim");
for (i = 0; i < 20; i++) {
  myLibrary.addBook(livro);
}

botaoAdd.addEventListener("click", () => {
  modal.removeAttribute("hidden");
  modal.style.display = "flex";
});

botaoRmv.addEventListener("click", () => {
  modal.hidden = true;
  modal.style.display = "none";
});

function render() {
  const books = myLibrary.getBooks();
  books.forEach((book) => {
    board.appendChild(book.toHTML());
  });
}

window.onload = render;
