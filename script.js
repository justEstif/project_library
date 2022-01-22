let myLibrary = [];

function Books(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Books.prototype.changeRead = function () {
    if (this.read === "Completed") {
        this.read = "Reading";
    } else {
        this.read = 'Completed';
    };
}

function addBookToLibrary(Book) {
    myLibrary.push(Book);
    displayBooksInLibrary(myLibrary);
}

function displayBooksInLibrary(myLibrary) {
    var k = '<tbody>'
    for (i = 0; i < myLibrary.length; i++) {
        k += '<tr>';
        k += '<td>' + (i + 1) + '</td>';
        k += '<td>' + myLibrary[i].title + '</td>';
        k += '<td>' + myLibrary[i].author + '</td>';
        k += '<td>' + myLibrary[i].pages + '</td>';
        k += '<td><button onclick=changeStatus(this)>' + myLibrary[i].read + '</button></td> ';
        k += '<td><input type="button" value="Delete" onclick="deleteRow(this)"/></td>';
    }
    k += '</tbody>';
    document.getElementById('tableData').innerHTML = k;
}

const openButton = document.getElementById('newbook');
const submitButton = document.getElementById('submit');
const cancelButton = document.getElementById('cancel');
var form = document.getElementById("myForm");

openButton.onclick = function () {
    form.style.display = "block"
};

cancelButton.onclick = function () {
    form.style.display = "none";
};

submitButton.onclick = function () {
    getInput();
    form.value = "";
};


function getInput() {
    var title = document.getElementById('titleInput').value;
    var author = document.getElementById('authorInput').value;
    var page = document.getElementById('pageInput').value;
    var read = document.getElementById('status_options').value;
    let newBook = new Books(title, author, page, read);
    addBookToLibrary(newBook);
    displayBooksInLibrary(myLibrary);
};

function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function changeStatus(sentThisBook) {
    let id = sentThisBook.parentNode.parentNode.firstChild.textContent;
    let book = myLibrary[id - 1];
    book.changeRead();
    displayBooksInLibrary(myLibrary);
}
let theHobbit = new Books("The Hobbit", "J.R.R. Tolkien", "295", "Reading")
addBookToLibrary(theHobbit);
displayBooksInLibrary(myLibrary);