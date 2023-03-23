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
  constructor(title, author, pages, dateOfPublish, language, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.dateOfPublish = dateOfPublish;
    this.language = language;
  }
  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }
  toHTML() {
    const card = document.createElement("div");
    card.classList.add("bookCard");
    const close = document.createElement("button");
    close.classList.add("close");
    close.textContent = "×";
    const title = document.createElement("h1");
    title.textContent = this.title;
    const author = document.createElement("p");
    author.textContent = `De: ${this.author}`;
    const pages = document.createElement("p");
    pages.textContent = `Número de Páginas: ${this.pages}`;
    const language = document.createElement("p");
    language.textContent = `Idioma: ${this.language}`;
    const dateOfPublish = document.createElement("p");
    dateOfPublish.textContent = `Publicado em: ${this.dateOfPublish}`;
    const read = document.createElement("p");
    read.textContent = `Já leu? ${this.read}`;

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(language);
    card.appendChild(dateOfPublish);
    card.appendChild(read);
    card.appendChild(close);

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
const closeModal = document.querySelector(".close");
const closeCard = document.querySelector(".buttonCard .close");
const formLivro = document.querySelector(".form-livro");

let livro = new Book(
  "Anna Karenina",
  "Leo Tolstoy",
  836,
  "31/05/1997",
  "Russo",
  "Sim"
);

for (i = 0; i < 20; i++) {
  myLibrary.addBook(livro);
}

//abrir e fechar modal de adicionar livro
botaoAdd.addEventListener("click", () => {
  abreModal();
});

window.addEventListener("click", (e) => {
  if (e.target == modal || e.target == closeModal) {
    fechaModal();
  }
});

//remover livro da biblioteca ao clicar no x
board.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    const card = e.target.parentElement;
    const title = card.querySelector("h1").textContent;
    const author = card.querySelector("p").textContent;
    const book = myLibrary.books.find(
      (book) => book.title === title && book.author === author
    );
    myLibrary.removeBook(book);
    card.remove();
  }
});

const criaLivroDoInput = () => {
  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const paginas = document.getElementById("paginas").value;
  const dataDePublicacao = document.getElementById("data").value;
  const idioma = document.getElementById("idioma").value;
  const leu = document.getElementById("lido").value;
  return new Book(titulo, autor, paginas, dataDePublicacao, idioma, leu);
};

//salvar livro na biblioteca
formLivro.addEventListener("submit", (e) => {
  e.preventDefault();
  const livro = criaLivroDoInput();
  myLibrary.addBook(livro);
  fechaModal();
  limpaBoard();
  render();
});

function limpaBoard() {
  board.innerHTML = "";
}

function abreModal() {
  modal.removeAttribute("hidden");
  modal.style.display = "flex";
}

function fechaModal() {
  modal.hidden = true;
  modal.style.display = "none";
}

function render() {
  const books = myLibrary.getBooks();
  books.forEach((book) => {
    board.appendChild(book.toHTML());
  });
}

window.onload = render;
