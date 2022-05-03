import { rest } from 'msw'

const baseUrl = "http://localhost:8081/"

export const handlers = [
  rest.post(baseUrl + 'login', (req, res, ctx) => {
    if(req.body.username == "user1" && req.body.password == "password1") {
      localStorage.setItem("userToken", "userToken");
      localStorage.setItem("token", "token");
      localStorage.setItem("userRole", "userRole");
      localStorage.setItem("userID", 1);
      localStorage.setItem("userData", "userData");

      return res(
        ctx.status(200),
        ctx.json({access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VybmFtZSIsImlhdCI6MTUxNjIzOTAyMiwiYXV0aG9yaXJpdGVzIjpbeyJhdXRob3JpdHkiOiJ1c2VyUm9sZSJ9XX0.x3DMTtquHOwRjLa7FX7Ab9SHzDzYbfnWcvA9a-z4-3o"})
      )
    }
    else {
      return res(
        ctx.status(401),
      )
    }
  }),

  rest.get(baseUrl + "api/members/username/:userid", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: req.params.userid,
        userData: "userData"
      })
    )
  }),

  rest.post(baseUrl + 'api/:memberId/books/:bookId' , (req, res, ctx) => {
    let memberId = req.params.memberId;
    let bookId = req.params.bookId;
    if(memberId >= 0 && bookId == 0) {
      return res(
        ctx.status(200),
      )
    }
    if(memberId >= 0 && bookId == 2) {
      return res(
        ctx.status(400),
        ctx.json({
          "message": "All books with id $id are loaned.",
          "httpStatus": "BAD_REQUEST",
          "timestamp": Date.now.toString(),
          "debugMessage": null,
          "subExceptions": null
        })
      )
    }
  }),
]
