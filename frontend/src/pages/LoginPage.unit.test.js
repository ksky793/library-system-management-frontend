import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginPage from './LoginPage';
import { Redirect } from 'react-router-dom';
import * as MemberApi from '../api/MemberApi';

import { screen, render, fireEvent, waitFor, act } from "@testing-library/react";

describe('LoginPage', () => {
  let wrapper;

  const user = {
    username: "user1",
    password: "password1",
  }

  beforeEach(() => {
    const props = { isLogged: false };
    wrapper =  shallow(<LoginPage {...props}/>);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render login form', () => {
    expect(wrapper.find(".login-data-container")).toBeTruthy();
    expect(wrapper.find("input").length).toEqual(2);
    expect(wrapper.find("#login")).toBeTruthy();
  });

  it('updates user credentials state on form change', () => {
    const setUserData = jest.fn();
    // const setRedirect = jest.fn();
    const wrapper = shallow(<LoginPage onChange={setUserData} />);
    let handleChange = jest.spyOn(React, "useState");
    handleChange.mockImplementation(userData => [userData, setUserData]);

    wrapper.find('.username').simulate('change', {target: {value: user.username}});
    wrapper.find('.password').simulate('change', {target: {value: user.password}});

    expect(setUserData).toHaveBeenCalled();
  })

  it('logins user when input matches user credentials', async () => {
    const realUseState = React.useState

    // Podstawienie danych początkowych w celu ominiećia usestate
    const stubInitialState = {
      username: "user1",
      password: "password1",
    }

    const userData = {
      username: "user1",
      password: "password1",
    }

    // Mock useState przed renderem komponentu
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => realUseState(stubInitialState))
    const setIsLogged = jest.fn();
    const createNotification = jest.fn((x, y) => {
      if(x == 'error') {
        return true;
      }
      return false;
    });
    const props = {
      userData,
      setIsLogged,
      createNotification,
    };

    const wrapper = shallow(<LoginPage {...props} />);
    const loginFunction = jest.spyOn(MemberApi, "login")

    expect(wrapper.containsMatchingElement(<Redirect to="/" />)).toEqual(false)
    wrapper.find('#login').simulate('click');

    await waitFor(() => {
        expect(loginFunction).toHaveBeenCalled();
        expect(localStorage['userID']).toEqual('username');
        expect(localStorage['userData']).toEqual("{\"id\":\"username\",\"userData\":\"userData\"}");
        expect(localStorage['userRole']).toEqual('userRole');
        expect(localStorage['userToken']).toEqual('username');
        expect(localStorage['token']).toEqual('ciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VybmFtZSIsImlhdCI6MTUxNjIzOTAyMiwiYXV0aG9yaXJpdGVzIjpbeyJhdXRob3JpdHkiOiJ1c2VyUm9sZSJ9XX0.x3DMTtquHOwRjLa7FX7Ab9SHzDzYbfnWcvA9a-z4-3o');

        expect(createNotification).toBeCalledTimes(0);
      }
    )

  })

  it('shows an error message when input does not match user credentials', () => {
    const setUserData = jest.fn();
    const createNotification = jest.fn((x, y) => {
      if(x == 'error') {
        return true;
      }
      return false;
    });
    const wrapper = shallow(<LoginPage onChange={setUserData} createNotification={createNotification} />);
    let handleChange = jest.spyOn(React, "useState");
    handleChange.mockImplementation(userData => [userData, setUserData]);
    wrapper.find('.username').simulate('change', {target: {value: 'wrong'}});
    wrapper.find('.password').simulate('change', {target: {value: 'credentials'}});
    wrapper.find('#login').simulate('click');

    expect(createNotification.mock.results[0].value).toBe(true);
  })
})
