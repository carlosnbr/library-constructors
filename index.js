const myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        pages: 295,
        isRead: false,
    },
    {
        title: "The Final Empire",
        author: "Brandon Sanderson",
        pages: 576,
        isRead: false,
    },
];

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    toggleRead() {
        this.isRead = !this.isRead;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} 
        ${this.pages === 1 ? "page" : "pages"}, 
        ${this.isRead ? "already read" : "not read yet"}`;
    }
}

let checkboxIdCounter = 0;

function createBookCard(book, index) {
    const bookCard = document.createElement("li");
    bookCard.classList.add("book-card");

    const title = document.createElement("h2");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = book.author;

    const pages = document.createElement("p");
    pages.textContent = `${book.pages} 
    ${book.pages === 1 ? "page" : "pages"}`;

    const checkboxId = `read-checkbox-${checkboxIdCounter++}`;

    const readCheckbox = document.createElement("label");
    readCheckbox.setAttribute("for", checkboxId);

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", checkboxId);

    checkbox.checked = book.isRead;

    const spanRead = document.createElement("span");
    spanRead.textContent = "Mark as read.";

    readCheckbox.append(checkbox, spanRead);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
        myLibrary.splice(index, 1);
        renderBooks(myLibrary);
    });

    bookCard.append(title, author, pages, readCheckbox, removeButton);

    return bookCard;
}

function renderBooks(myLibrary) {
    let bookList = document.getElementById("bookList");
    bookList.textContent = "";
    myLibrary.forEach((book, index) => {
        const bookCard = createBookCard(book, index);
        bookList.appendChild(bookCard);
    });
}

const pagesInput = document.getElementById("bookPagesInput");
pagesInput.addEventListener("input", event => {
    if (pagesInput.value) {
        pagesInput.value = pagesInput.value.replace(/[^0-9]/g, "");
    }
});

const bookForm = document.getElementById("addBookForm");
bookForm.addEventListener("submit", event => {
    event.preventDefault();

    const title = document.getElementById("bookTitleInput").value;
    const author = document.getElementById("bookAuthorInput").value;
    const pages = document.getElementById("bookPagesInput").value;
    const readStatus = document.getElementById("bookReadStatus").checked;
    const newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
    renderBooks(myLibrary);
    bookForm.reset();
    modal.style.display = "none";
});

const modalCloseButton = document.getElementById("closeButton");
const modal = document.getElementById("addBookModal");

window.onclick = function (event) {
    if (event.target == modal || event.target == modalCloseButton) {
        modal.style.display = "none";
    }
};

const addBookButton = document.getElementById("addBookButton");
addBookButton.addEventListener("click", function (event) {
    modal.style.display = "block";
});

renderBooks(myLibrary);
