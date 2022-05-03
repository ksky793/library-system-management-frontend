import React from 'react';
import { shallow, mount } from 'enzyme';
import BookTable from './BooksTable';
import routeData from 'react-router';
import { screen, render, fireEvent, waitFor, act } from "@testing-library/react";

let authors = [
  {
    id: 0,
    firstName: "Henryk",
    lastName: "Sienkiewicz"
  },
  {
    id: 1,
    firstName: "Adam",
    lastName: "Kowalczuk"
  },
]

let categories = [
  {
    id: 0,
    categoryName: "Romans"
  },
  {
    id: 1,
    categoryName: "Przygoda"
  },
]

let booksList = [
  {
    id: 0,
    isbn: "2345678913246",
    title: "Pan Tadeusz",
    publicationDate: "2022-01-23",
    copiesOwned: 1,
    authors: [
      authors[0]
    ],
    categories: [
      categories[0]
    ],
  },
  {
    id: 1,
    isbn: "1234567891324",
    title: "Ojciec Chrzestny",
    publicationDate: "2021-01-23",
    copiesOwned: 5,
    authors: [
      authors[1],
    ],
    categories: [
      categories[0],
      categories[1],
    ],
  },
  {
    id: 2,
    isbn: "1234567891324",
    title: "Książka 3",
    publicationDate: "2012-12-12",
    copiesOwned: 0,
    authors: [
      authors[0],
      authors[1],
    ],
    categories: [ ],
  },
]

describe('BookTable', () => {
  let wrapper;
  let useLocation

  let createNotification = jest.fn((x, y) => {
    if(x == 'error') {
      return true;
    }
    return false;
  });

  beforeEach(() => {
    localStorage.setItem("userRole", "User");
    localStorage.setItem("userID", 1);
    useLocation = jest.spyOn(routeData, 'useLocation');

    useLocation.mockReturnValue({
      pathname: '/listaksiążek',
      search: '',
      state: {},
      hash: '',
    })
    const props = {
      booksList,
      createNotification,
    };

    wrapper = shallow(<BookTable {...props}/>);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render table header', () => {
    expect(wrapper.find(".booktable-container")).toBeTruthy();
    expect(wrapper.find(".books")).toBeTruthy();
    expect(wrapper.find(".text-header").text()).toEqual("Lista Książek");

    expect(wrapper.find("#header-row").children().length).toEqual(6);
  });

  it('should render table with book entries from API', () => {
    // sprawdzenie, czy wyświetlane są wszystkie pozycje z listy
    expect(wrapper.find(".book-row").length).toEqual(booksList.length);

    // czy poprawnie wyświetlana jest lista wielu autorów
    let a = authors[0].firstName + " " + authors[0].lastName + ", " + authors[1].firstName + " " + authors[1].lastName;
    let x = wrapper.find(".book-row").at(2).childAt(3)
    expect(x.text()).toEqual(a);

    // czy poprawnie wyświetlana jest lista wielu kategorii
    let c = categories[0].categoryName + ", " + categories[1].categoryName;
    x = wrapper.find(".book-row").at(1).childAt(4)
    expect(x.text()).toEqual(c);
  });

  it('should not display loan button in locations other than /listaksiążek', () => {
    useLocation = jest.spyOn(routeData, 'useLocation');
    useLocation.mockReturnValue({
      pathname: '/książki/kategoria/romans',
      search: '',
      state: {},
      hash: '',
    })
    const props = {
      booksList,
      createNotification,
    };

    wrapper = shallow(<BookTable {...props}/>);

    expect(wrapper.find(".loan-btn").length).toEqual(0);
  });

  it('should not display loan buttons to user without "User" role', () => {
    localStorage.clear()
    localStorage.setItem("userRole", "NotUser");

    // render komponentu
    const props = {
      booksList,
      createNotification,
    };
    wrapper = shallow(<BookTable {...props}/>);

    let buttons = wrapper.find(".loan-btn");
    let expectedStyle = "display:none";
    expect(buttons.length).toEqual(booksList.length);
    for(let i = 0; i < buttons.length; i++) {
      expect(buttons.at(i).html()).toContain(expectedStyle);
    }
  });

  it('should allow user to loan books when copies are available', async () => {
    createNotification = jest.fn((x, y) => {
      if(x == 'success') {
        return true;
      }
      return false;
    });

    useLocation.mockReturnValue({
      pathname: '/listaksiążek',
      search: '',
      state: {},
      hash: '',
    })
    const props = {
      booksList,
      createNotification,
    };

    render(<BookTable {...props} />)

    let buttons = screen.getAllByRole('button', {
      name: /Wypożycz/i
    })

    let expectedStyle = "display: flex";
    expect(buttons.length).toEqual(booksList.length);
    for(let i = 0; i < buttons.length; i++) {
      expect(buttons[i]).toHaveStyle(expectedStyle);
    }

    fireEvent.click(buttons[0]) // przycisk wypożycz

    let confirm = screen.getByText('Tak', { selector: 'button' })
    fireEvent.click(confirm)

    await waitFor(() => {
        expect(createNotification).toHaveBeenCalled()
        expect(createNotification.mock.results[0].value).toBe(true)
      }
    )
  });

  it('should show an error notification when a book could not be loaned', async () => {
    createNotification = jest.fn((x, y) => {
      if(x == 'error') {
        return true;
      }
      return false;
    });

    useLocation.mockReturnValue({
      pathname: '/listaksiążek',
      search: '',
      state: {},
      hash: '',
    })
    const props = {
      booksList,
      createNotification,
    };

    render(<BookTable {...props} />)

    // weryfikacja, czy dla każdego wpisu książki dostępny jest przycisk wypożyczenia
    let buttons = screen.getAllByRole('button', {
      name: /Wypożycz/i
    })

    let expectedStyle = "display: flex";
    expect(buttons.length).toEqual(booksList.length);
    for(let i = 0; i < buttons.length; i++) {
      expect(buttons[i]).toHaveStyle(expectedStyle);
    }

    fireEvent.click(buttons[2]) // przycisk wypożycz
    let confirm = screen.getByText('Tak', { selector: 'button' })
    fireEvent.click(confirm)

    await waitFor(() => {
        expect(createNotification).toHaveBeenCalled()
        expect(createNotification.mock.results[0].value).toBe(true)
      }
    )
  });
})
