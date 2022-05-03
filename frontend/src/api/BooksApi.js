import axios from "axios";
const baseUrl = "http://localhost:8081/api/";

export const getAllBooks = () => {
  return fetch(baseUrl + "books")
}

export const getBooksByTitle = (title) => {
  return fetch(baseUrl + "books/search?contain=" + title)
}

export const getBooksByCategory = (category) => {
  return fetch(baseUrl + "books/categories/" + category)
}

export const getBooksByAuthor = (author) => {
  return fetch(baseUrl + "books/authors/" + author)
}

export const postBook = (book) => {
  return axios.post(baseUrl + "books", book).then((response) => {
    return response;
  })
}

export const postCategory = (category) => {
  return axios.post(baseUrl + "categories", category).then((response) => {
    return response;
  })
}

export const getAllAuthors = () => {
  return fetch(baseUrl + "authors")
}

export const postAuthor = (author) => {
  return axios.post(baseUrl + "authors", author).then((response) => {
    return response;
  })
}

export const postAuthorToBook = (authorToBook) => {
  return axios.post(
    baseUrl + 'books/' + authorToBook.bookId + "/authors/" + authorToBook.authorId
  ).then((response) => {
    return response;
  })
}
