import { useEffect, useState } from "react";
import BookTable from "../components/BooksTable";
import "../Styles/AdvancedSearch.css"
import * as BooksApi from '../api/BooksApi';

const BooksList = ({title, booksList, setBooksList, createNotification}) => {

    const [categoryList, setCategoryList] = useState([
        {
            value: "Autor"
        },
        {
            value: "Tytuł"
        },
        {
            value: "Kategoria"
        }
    ]);

    const [category, setCategory] = useState(categoryList[0].value);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        fetchAllBooks();
    },[]);

    const fetchAllBooks = () => {
      BooksApi.getAllBooks().then(res =>{
        return res.json();
      }).then(data =>{
        console.log(data)
        if(data.length > 0)
        {
          setBooksList(data);
        }
        else{
          alert('nie ma ksiązki');
        }
      })
      .catch(error => {
        console.log(error);
      })
    }

    const fetchBooksByCategory = (category) => {
      BooksApi.getBooksByCategory(category)
        .then(res =>{
            return res.json();
        })
        .then(data => {
            setInputValue('');
            setBooksList(data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const fetchBooksByTitle = (title) => {
      BooksApi.getBooksByTitle(title)
        .then(res =>{
            return res.json();
        })
        .then(data => {
            setInputValue('');
            setBooksList(data);
        })
    }

    const fetchBooksByAuthor = (author) => {
      // BooksApi.getBooksByAuthor(author)
      fetch('http://localhost:8081/api/books/authors/' + author)
        .then(res =>{
            return res.json();
        })
        .then(data => {
            setInputValue('');
            setBooksList(data);
        })
    }

    const fetchBooks = (e) => {
        e.preventDefault();
        console.log("input", inputValue);
        console.log("kategoria", category);

        if(inputValue === '') {
            fetchAllBooks();
            return;
        }

        switch(category) {
            case 'Autor':
                {
                    fetchBooksByAuthor(inputValue);
                    break;
                }
            case 'Tytuł':
                {
                    fetchBooksByTitle(inputValue);
                    break;
                }
            case 'Kategoria':
                {
                    fetchBooksByCategory(inputValue);
                    break;
                }
            default:
                break;
        }
    }

    return (
        <div className="bookslist-container">
            <div className="bookslist-header">
                <div className="searchbox-container">

                    <h1 className = "header-text">WYSZUKIWANIE ZAAWANSOWANE</h1>
                    <div className="search-panel">
                        <input type="text" placeholder = "Podaj dane" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                        <div className="select-container">
                            <select value = {category} onChange = {e => setCategory(e.target.value)}>
                                {
                                    categoryList.map(c => {
                                        return (
                                            <option value={c.value}>{c.value}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <button onClick={fetchBooks}>Wyszukaj</button>
                </div>
            </div>
            {booksList && <BookTable booksList = {booksList} createNotification={createNotification}/>}
        </div>
    );
}

export default BooksList;
