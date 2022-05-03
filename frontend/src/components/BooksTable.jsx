import { Link, useLocation } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import * as LoanApi from '../api/LoanApi';

const BookTable = ({booksList, createNotification}) => {
    let location = useLocation();

    const showLoanConfirm = (bookId) => {
      let book = booksList.find(element => element.id == bookId);
      confirmAlert({
        title: 'Rezerwacja',
        message: 'Czy na pewno chcesz wypożyczyć: ' + book.title + '?.',
        buttons: [
          {
            className: 'loan-confirm-btn',
            label: 'Tak',
            onClick: () => loan(bookId)
          },
          {
            label: 'Nie',
          }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
      });
    }

    const loan = async (bookId) => {
      let book = booksList.find(element => element.id == bookId);
      let promise = await LoanApi.postLoan(localStorage.getItem("userID"), bookId, localStorage.getItem('token'))

      if(promise.status === 400) {
        createNotification('error', "Próba wypożyczenia: " + book.title + " nieudana.");
      } else {
        createNotification('success', "Zarezerwowano: " + book.title);
      }
    }

    return (
        <div className="booktable-container">
            <h1 className = 'text-header'>Lista Książek</h1>

            <table className = "books">
                <thead>
                    <tr id="header-row">
                        <th>ID</th>
                        <th>ISBN</th>
                        <th>TYTUŁ</th>
                        <th>AUTOR</th>
                        <th>KATEGORIA</th>
                        { location.pathname === "/listaksiążek" &&
                            <th>AKCJE</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {booksList.map (book => (
                        <tr className= "book-row" style = {{margin: "20px 0"}} key = {book.id} >
                            <td>{book.id}</td>
                            <td>{book.isbn}</td>
                            <td>{book.title}</td>
                            <td>
                              {
                                book.authors.map((author, index) => {
                                  return (index !== book.authors.length - 1 ? author.firstName + ' ' + author.lastName + ', ' : author.firstName + ' ' + author.lastName)
                                })
                              }
                            </td>

                            <td >
                            {
                                book.categories.map((category, index) => {
                                  return (index !== book.categories.length - 1 ? category.categoryName + ', ' : category.categoryName)
                                })
                            }
                            </td>

                            { location.pathname === "/listaksiążek" &&
                              <td>
                                  <button  className = "loan-btn" key = {book.id} onClick = {() => {showLoanConfirm(book.id)}}
                                    style = {{display: localStorage.getItem("userRole") === "User" ? "flex" : "none"}}
                                  >
                                    Wypożycz
                                  </button>
                              </td>
                            }

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookTable;
