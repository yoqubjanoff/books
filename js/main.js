let elForm = document.querySelector(".form");
let elInput = document.querySelector(".main-input");
let elBtn = document.querySelector(".button");
let elSelectAuthor = document.querySelector(".selectAuthor");
let elYear = document.querySelector(".year");

//! GET TEMPLATE TEMPLATE
let elTemplate = document.querySelector(".template").content;
let elList = document.querySelector(".temp-list");
elFragment = new DocumentFragment();
let authorList = [];

//! LOCAL STORAGE GET ELEMENT
let setArr = [];


//! MAIN RENDER FUNCTION
function render(params) {
    elList.innerHTML = null;
    params.forEach((book, index) => {
        let cloneTemp = elTemplate.cloneNode(true);
        cloneTemp.querySelector(".js-items").addEventListener("click", (evt) => {
            if (!evt.target.matches(".btn")) {
                localStorage.setItem("index", `${index}`);
                window.location.href = '/view.html'
            }
        })
        cloneTemp.querySelector(".author").textContent = book.author;
        authorList.push(book.author)
        cloneTemp.querySelector(".title").textContent = book.title;
        cloneTemp.querySelector(".js-year").textContent = book.year;
        cloneTemp.querySelector(".js-read").textContent = book.pages;
        cloneTemp.querySelector(".js-language").textContent = book.language;
        cloneTemp.querySelector(".wikipedia").href = book.link;
        //! LOCAL STORAGE GET UNIQUE ELEMENT 
        cloneTemp.querySelector(".btn").addEventListener("click", () => {
            let count = 0;
            setArr.forEach((value) => {
                if (value.title === book.title) {
                    count++;
                }
            })
            if (count === 0) {
                count = 0;
                setArr.push(book);
            }
            localStorage.setItem("nimadir", JSON.stringify(setArr));
        })
        elFragment.appendChild(cloneTemp);
    })
    elList.appendChild(elFragment);
}


//! LOCAL STORAGE RENDER FUNCRION
document.querySelector(".btn-saves").addEventListener("click", () => {
    let arr = localStorage.getItem("nimadir")
    arr = JSON.parse(arr);
    render(arr);
})

//! SEARCH BY INPUT FUNCTIONS
elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let searchQuery = new RegExp(elInput.value, "gi")
    let searchQueryText = books.filter(book => String(book.title).match(searchQuery))
    render(searchQueryText)
})
render(books)