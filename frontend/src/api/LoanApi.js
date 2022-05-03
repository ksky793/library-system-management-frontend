import axios from "axios";
const baseUrl = "http://localhost:8081/api/";

export const getMemberLoans = (memberId, token) => {
  return fetch(baseUrl + "loans/members/" + memberId, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
}

export const getActiveLoans = (memberId, token) => {
  return fetch(baseUrl + "loans/members/" + memberId + "/active", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
      return res.json();
    })
}

export const postLoan = (memberId, bookId, token) => {
  return fetch(baseUrl + memberId +'/books/' + bookId, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + token
    }
  })
}

export const deleteLoan = (loanId) => {
  return axios.delete(baseUrl + "loans/" + loanId).then((response) => {
    return response;
  })

}

export const getMemberFines = (username, token) => {
  return fetch(baseUrl + "fines/members/" + username, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
      return res.json();
    })
}

export const postFine = (loanId, amount) => {
  return axios.post(
    baseUrl + "fines/loans/" + loanId + "?amount=" + amount
  ).then((response) => {
    return response;
  })
}
