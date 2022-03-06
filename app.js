// Book Class: represents a Book

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
}

// UI Class: handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => {
      UI.addBookToList(book);
    });
  }
  // display form on button
  static controlFormDisplay(e = "") {
    const formControl = document.querySelector(".show-form");

    if (formControl.textContent.trim() === "Show Form") {
      document.getElementById("book-form").style.display = "block";
      formControl.textContent = "Hide Form";
    } else if (
      formControl.textContent.trim() === "Hide Form" ||
      e === "success"
    ) {
      document.getElementById("book-form").style.display = "none";
      UI.clearFields();
      formControl.textContent = "Show Form";
    }
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
   <td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.pages}</td>
   <td><a href='#' class="btn btn-danger btn-sm delete">X</a></td>
   `;

    list.appendChild(row);
  }
  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    // 3 seconds
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);
  }
  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
  }
}
// Store Class: handles storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(title) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.title == title) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
// Event: Display books

document.addEventListener("DOMContentLoaded", UI.displayBooks);
// Event: Add a book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // prevent actual submit
  e.preventDefault();
  // get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;

  // validate
  if (title === "" || author === "" || pages === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instatiate book

    const book = new Book(title, author, pages);

    // Add book to ui
    UI.addBookToList(book);

    // add book to store
    Store.addBook(book);
    // show success
    UI.showAlert("Book added", "success");
    // clear fields
    UI.clearFields();
    UI.controlFormDisplay("success");
  }
});

// Event: Remove a book
document.querySelector("#book-list").addEventListener("click", (e) => {
  // remove book from UI
  UI.deleteBook(e.target);

  // remove book from store
  Store.removeBook(
    e.target.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.textContent
  );
  UI.showAlert("Book removed", "info");
});

// hide or show form
document.querySelector(".show-form").addEventListener("click", () => {
  // document.getElementById("book-form").style.display = "none";
  UI.controlFormDisplay();
});
