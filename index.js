const myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        pages: 295,
        isRead: false,
    },
    {
        title: "The Final Empire With A Very Long Book Title",
        author: "Brandon Sanderson This guy also has a very long name",
        pages: 1,
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
    removeButton.classList.add("delete-button");
    removeButton.addEventListener("click", () => {
        myLibrary.splice(index, 1);
        renderBooks(myLibrary);
    });

    bookCard.append(title, author, pages, readCheckbox, removeButton);

    return bookCard;
}

function renderBooks(myLibrary) {
    let bookList = document.getElementById("bookList");

    for (let i = bookList.children.length - 1; i > 0; i--) {
        bookList.removeChild(bookList.children[i]);
    }

    myLibrary.forEach((book, index) => {
        const bookCard = createBookCard(book, index);
        bookList.appendChild(bookCard);
    });
}

function addBook() {
    const title = document.getElementById("bookTitleInput").value;
    const author = document.getElementById("bookAuthorInput").value;
    const pages = parseInt(document.getElementById("bookPagesInput").value);
    const readStatus = document.getElementById("bookReadStatus").checked;
    const newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
    renderBooks(myLibrary);
    document.getElementById("addBookForm").reset();
    document.getElementById("addBookModal").style.display = "none";
};

function setUpEventListeners() {
    document.getElementById("addBookForm").addEventListener("submit", event => {
        event.preventDefault();
        addBook();
    });

    const modalCloseButton = document.getElementById("closeButton");
    const modal = document.getElementById("addBookModal");

    window.onclick = function (event) {
        if (event.target == modal || event.target == modalCloseButton) {
            modal.style.display = "none";
        }
    };

    const addBookButton = document.getElementById("addBookButton");
    addBookButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    const pagesInput = document.getElementById("bookPagesInput");
    pagesInput.addEventListener("input", event => {
        if (pagesInput.value) {
            pagesInput.value = pagesInput.value.replace(/[^0-9]/g, "");
        }
    });
};

setUpEventListeners();
renderBooks(myLibrary);
