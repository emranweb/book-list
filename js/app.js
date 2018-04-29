//form UI
const form = document.querySelector("form");
//table body class for inset data
const tbody = document.querySelector(".tbody");
const header = document.querySelector(".header");


//add event listeneter to the form submit
form.addEventListener("submit", addBook);
tbody.addEventListener("click", remove);



// input data constructor function
class BookCon {
  //constructor
  constructor(name, author, isbn) {
    this.name = name;
    this.author = author;
    this.isbn = isbn;
  }

}

// UI Class

class UI {
  //all methode
  addBookUi(book) {
    //create a table row to display data
    const row = document.createElement("tr");
    row.innerHTML =
      `
    <td>${book.name}</td> 
    <td>${book.author}</td> 
    <td>${book.isbn}</td> 
    <td><span class="delete"></span</td> 
    `;
    tbody.appendChild(row);
  }
  //message 
  message(msg, cls) {
    const div = document.createElement("div");
    div.className = `notification ${cls}`;
    div.appendChild(document.createTextNode(msg));
    header.appendChild(div);
    setTimeout(function () {
      document.querySelector(".notification").remove();
    }, 1200)
  }
  removeBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  clearInput() {
    document.querySelector("#name").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

//local Storeage

class Store {
  static getBook() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addBookLocal(book) {
    const books = Store.getBook();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static displayBook() {
    const books = Store.getBook();
    const ui = new UI();
    books.forEach(function (book) {
      ui.addBookUi(book);
    })
  }
  static removeBookLocal() {
    const books = Store.getBook();
    books.forEach(function (book, index) {
      books.splice(index, 1);
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}


document.addEventListener("DOMContentLoaded", Store.displayBook());

//add books funtion
function addBook(e) {
  // Input data collectoin
  const name = document.querySelector("#name").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;
  // make the constructo to object
  const book = new BookCon(name, author, isbn);
  const ui = new UI();

  // check the input field is wrong
  if (name === "" || author === "" || isbn === "") {
    ui.message("Please Add Any Book", "is-danger");

  } else {
    ui.addBookUi(book);
    Store.addBookLocal(book);
    ui.message("Book Added", "is-success");
    ui.clearInput();
  }

  //prevent default
  e.preventDefault();
}


function remove(e) {
  const ui = new UI();
  ui.removeBook(e.target);
  Store.removeBookLocal();
  ui.message("Book Remove", "is-success");
}