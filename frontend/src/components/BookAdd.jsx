import { useState } from "react";
import { Redirect } from 'react-router-dom';
import '../Styles/BookForm.css';
import * as BooksApi from '../api/BooksApi';

const BookAdd = () => {
  const [submit, setSubmit] = useState(false)
  const [book, setBook] = useState({
    title: '',
    isbn: '',
    publicationDate: '',
    copiesOwned: 1,
  })

  function validateForm(){
    //dlugosc tytulu ksiazki
    if(book.title.length > 60 || book.title.length < 3) {
      console.log("Book validation failed - title", book);
      return false;
    }

    // isbn wymagana dlugosc 13 znakow
    if(book.isbn.length !== 13){
      console.log("Book validation failed - isbn", book);
      return false;
    }

    // data publikacji pozniejsza od obecnej
    if((new Date(book.publicationDate)).getTime() > (new Date()).getTime() || book.publicationDate === ''){
      console.log("Book validation failed - publicationDate", book);
      return false;
    }

    if(book.copiesOwned < 0){
      console.log("Book validation failed - copiesOwned", book);
      return false;
    }

    return true;
  }

  function onChange(e) {
    var name = e.target.id;
    setBook({
      ...book,
      [name]: e.target.value,
    });
  }

  function onChangeDate(event) {
    setBook({
      ...book,
      publicationDate: event.target.value,
    });
  }

  function onChangeCopies(event) {
    setBook({
      ...book,
      copiesOwned: parseInt(event.target.value),
    });
  }

  function postBook(book){
    BooksApi.postBook(book)
      .then((response) => {
        console.log("response", response.data)
          return response;
      })
      .catch((error) => {
          return error;
      });
  }

  function submitForm(event) {

    event.preventDefault();

    //jeśli walidacja formularza udana - dodanie ksiazki i przekierowanie do listy
    if (validateForm()) {
      console.log("Book submit", book)
      postBook(book);
      setSubmit(true);
    }
  }

  return (
    <div>
      { submit &&
        <Redirect to='/książki' />
      }

      <div className="booksform-container">
        <div className="booksform-header">
          <h1 className="header-text">DODAJ KSIĄŻKĘ</h1>
        </div>

        <form onSubmit={submitForm}>
        <div className="booksform-input">
            <label className="booksform-label">ISBN</label><br/>
            <input className="booksform-text" type="text" placeholder="ISBN" id="isbn" onChange={onChange} />
          </div>
          <div className="booksform-input">
            <label className="booksform-label">Tytuł</label><br/>
            <input className="booksform-text" type="text" placeholder="Tytuł" id="title" onChange={onChange} />
          </div>
          <div className="booksform-input">
            <label className="booksform-label">Data publikacji</label><br/>
            <input className="booksform-date" type="date" id="publicationDate" onChange={onChangeDate} />
          </div>
          <div className="booksform-input">
            <label className="booksform-label">Liczba kopii</label><br/>
            <input className="booksform-number" type="number" placeholder="Liczba kopii" id="copiesOwned" onChange={onChangeCopies} defaultValue="1" />
          </div>
          <input className="booksform-button" type="submit" value="Dodaj"/>
        </form>
      </div>

    </div>
  );
}

export default BookAdd;
