import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookTable from "../components/BooksTable";
import * as BooksApi from '../api/BooksApi';

const BooksCategory = ({ }) => {
  const [booksList, setBooksList] = useState(null);
  const [category, setCategory] = useState("kategoria");
  const params = useParams();

  useEffect(() => {
    if (params?.category) {
      setCategory(params?.category[0].toUpperCase() + params?.category.substring(1));
      console.log(category);
      BooksApi.getBooksByCategory(params?.category)
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log("GET by category: ", params?.category);
          if (data.length > 0) {
            setBooksList(data);
          }
        })
    }
  }, []);

  return (
    <div className="booktable-container">
      <h1 className="book-category text-header">{category}</h1>
      {booksList && <BookTable booksList={booksList} />}
      {!booksList && <div>Brak książek w kategorii</div>}
    </div>
  );
}

export default BooksCategory;
