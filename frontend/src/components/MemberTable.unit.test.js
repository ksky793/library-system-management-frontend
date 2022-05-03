import React from 'react';
import { screen, render, fireEvent } from "@testing-library/react";
import MembersTable from './MembersTable';

let members = [
  {
    id: 0,
    email: "user0@test.com",
    username: "user0",
    firstName: "Jan",
    lastName: "Kowalski",
    types: [
      {
        typeValue: "User",
      },
      {
        typeValue: "Employee",
      },
    ],
    memberStatus: {
      statusValue: "Inactive",
    }
  },
  {
    id: 1,
    email: "user1@test.com",
    username: "user1",
    firstName: "John",
    lastName: "Doe",
    types: [
      {
        typeValue: "User",
      },
    ],
    memberStatus: {
      statusValue: "Active",
    }
  },
  {
    id: 2,
    email: "user2@test.com",
    username: "user2",
    firstName: "Test",
    lastName: "User",
    types: [
      {
        typeValue: "User",
      },
      {
        typeValue: "Admin",
      },
    ],
    memberStatus: {
      statusValue: "Active",
    }
  },
]

describe('BookTable', () => {
  let selectMember;

  beforeEach(() => {
    selectMember = jest.fn((x) => {
      return x;
    })

    const props = {
      membersList: members,
      selectMember
    };

    render(<MembersTable {...props} />)
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render table header', () => {
    expect(screen.getByRole('table')).toBeTruthy();
    expect(screen.getByTestId('table-header-row')).toBeTruthy();
    expect(screen.getAllByTestId('table-row').length).toEqual(3);
    expect(screen.getByTestId('table-header-row').childElementCount).toEqual(7);
  });

  it('should render table with member entries from props', () => {
    let tableRows = screen.getAllByTestId('table-row');
    expect(tableRows[0].children[0].innerHTML).toEqual("0");
    expect(tableRows[0].children[1].innerHTML).toEqual("user0@test.com");
    expect(tableRows[0].children[2].innerHTML).toEqual("user0");
    expect(tableRows[0].children[3].innerHTML).toEqual("Jan");
    expect(tableRows[0].children[4].innerHTML).toEqual("Kowalski");
    expect(tableRows[0].children[5].innerHTML).toEqual("User, Employee, ");
    expect(tableRows[0].children[6].innerHTML).toEqual("Inactive");

    expect(tableRows[2].children[5].innerHTML).toEqual("User, Admin, ");
  });

  it('should call selectMember() with correct id when a table row is clicked on', () => {
    let tableRows = screen.getAllByTestId('table-row');
    fireEvent.click(tableRows[0]);
    fireEvent.click(tableRows[1]);
    fireEvent.click(tableRows[2]);

    expect(selectMember.mock.results[0].value).toEqual(0);
    expect(selectMember.mock.results[1].value).toEqual(1);
    expect(selectMember.mock.results[2].value).toEqual(2);
    expect(selectMember).toHaveBeenCalledTimes(3);
  });
})
