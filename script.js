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
    this.id = 0;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.dateOfPublish = dateOfPublish;
    this.language = language;
  }
  setId(id) {
    this.id = id;
  }
  toggleLido() {
    if (this.read === "Sim") {
      this.read = "Não";
    } else {
      this.read = "Sim";
    }
  }
  toHTML() {
    const card = document.createElement("div");
    card.classList.add("bookCard");
    card.setAttribute("id", this.id);
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
    const read = document.createElement("div");
    read.classList.add("toggle-lido");
    if (this.read === "Sim") {
      read.innerHTML = `Lido?
                        <label class="switch">
                          <input type="checkbox" title="checkbox" checked>
                          <span class="slider round"></span>
                        </label>`;
    } else {
      read.innerHTML = `Lido?
                        <label class="switch">
                          <input type="checkbox" title="checkbox">
                          <span class="slider round"></span>
                        </label>`;
    }

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
    if (this.books.length > 0)
      book.setId(this.books[this.books.length - 1].id + 1);

    this.books.push(book);
  }
  removeBook(id) {
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].id === id) {
        this.books.splice(i, 1);
        break;
      }
    }
  }
  getBooks() {
    return this.books;
  }
  findBook(id) {
    return this.books.find((book) => book.id === id);
  }
}

//Aplicação

//Biblioteca
const myLibrary = new Library();

//Ações
const board = document.querySelector("main");
const modal = document.querySelector(".modalAddLivro");
const closeModal = document.querySelector(".close");
const addLivro = document.querySelector(".btn");
const formLivro = document.querySelector(".form-livro");

//abrir e fechar modal de adicionar livro
addLivro.addEventListener("click", () => {
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
    myLibrary.removeBook(parseInt(card.id));
    render();
  }

  //toggle lido
  if (e.target.classList.contains("slider")) {
    const card = e.target.parentElement.parentElement.parentElement;
    const book = myLibrary.findBook(parseInt(card.id));
    book.toggleLido();
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
  limpaBoard();
  if (myLibrary.getBooks().length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Biblioteca vazia...";
    board.appendChild(empty);
  } else {
    const books = myLibrary.getBooks();
    books.forEach((book) => {
      board.appendChild(book.toHTML());
    });
  }
}

window.onload = render;
