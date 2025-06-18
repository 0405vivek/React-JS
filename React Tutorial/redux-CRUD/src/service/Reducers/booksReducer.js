const initalState = {
    books : [],
    book: null,
    isLoading: false
}

const bookReducer = (state = initalState, action) => {
    switch(action.type)
    {
        case "ADD_BOOK":
            let newBooks = [...state.books, action.payload];
            localStorage.setItem("books", JSON.stringify(newBooks));
            return {
                ...state,
                books: [...state.books, action.payload]
            }
        case "GET_ALL_BOOKS": 
            let allBooks = JSON.parse(localStorage.getItem("books")) || [];
            return {
                ...state,
                books: allBooks
            }
        case "GET_BOOK": 
            let getbooks = JSON.parse(localStorage.getItem("books"));
            let singleBook = getbooks.find(book => book.id == action.payload)
            return {
                ...state,
                book: singleBook
            }
        case "DELETE_BOOK":
            let getAllBooks = JSON.parse(localStorage.getItem("books"))
            let deletedBooks = getAllBooks.filter(book => book.id != action.payload);
            localStorage.setItem("books", JSON.stringify(deletedBooks));
            return {
                ...state,
                books: deletedBooks
            }
        case "UPDATE_BOOK":
            let getBooks = JSON.parse(localStorage.getItem("books"))
            let updatedBooks = getBooks.map(book => {
                if(book.id == action.payload.id){
                    return action.payload;
                }else{
                    return book;
                }
            });
            localStorage.setItem("books", JSON.stringify(updatedBooks));
            return {
                ...state,
                books: updatedBooks,
                book: null
            }
        default:
            return state;
    }
}


export default bookReducer;