import jwt_decode from "jwt-decode";
import * as MemberApi from  "./MemberApi.js"

const baseUrl = "http://localhost:8081/";

export async function login(data) {
  await fetch(baseUrl + "login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  .then((res) => {
    return res.json();
  }).then((data) => {
    var token = data.access_token.substring(6);
    var userToken = jwt_decode(token).sub; //nazwa uzytkownika
    var userRole = jwt_decode(token).authorirites[0].authority; // rola użytkownika

    localStorage.setItem("userToken", userToken); // nazwa uzytkownika w locale storage
    localStorage.setItem("token", token); //token w local storage
    localStorage.setItem("userRole", userRole); //rola tokena w local storage

    let promise = MemberApi.getByUsername(localStorage.getItem("userToken"))
      .then((res) => {
        res.json().then((json) => {
          localStorage.setItem("userID", json.id);
          localStorage.setItem("userData", JSON.stringify(json));
        })
      });

    return promise;
  })
}

export const register = (member) => {
  return fetch(baseUrl + "registration", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(member),
  })
}

export async function getByUsername (userToken) {
  let x = await fetch(baseUrl + "api/members/username/" + userToken, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  })

  return x;
}

export const getAllMembers = () => {
  return fetch(baseUrl + "api/members/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
}

export const postMember = (user) => {
  return fetch(baseUrl + 'api/members', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })
}

export const putMember = (user) => {
  return fetch(baseUrl + 'api/members/' + user.username, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })
}

export const deleteMember = (userId) => {
  return fetch(baseUrl + 'api/members/deleteById/'+ userId, {
    method: 'DELETE'
  })
}

