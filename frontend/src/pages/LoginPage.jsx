import { useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import "../Styles/LoginPage.css";
import * as MemberApi from '../api/MemberApi';

const LoginPage = ({isLogged, setIsLogged, createNotification}) => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  })
  const [redirect, setRedirect] = useState(false);

  const handleSumbit = async () => {
    if (userData.username === "" || userData.password === "") {
      createNotification("error", "Niepoprawne dane logowania");
      return;
    }
    let loginError = false;

    await MemberApi.login(userData)
      .catch((error) => {
        console.log(error)
        createNotification("error", "Niepoprawne dane logowania");
        setIsLogged(false);
        loginError = true;
        return error;
      });

    if(!loginError) {
      console.log("logged in")
      setIsLogged(true);
      setRedirect(true);
    }

  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="loginpage-container">
      <div className="createaccount-label-container">
        <h1>Nie posiadasz konta?</h1>
        <Link to={"/rejestracja"}>
          <button>UTWÓRZ KONTO</button>
        </Link>
      </div>

      <div className="login-panel-container">
        <h1 className="login-panel-header">
          STREFA <br /> UŻYTKOWNIKA
        </h1>
        <div className="login-data-container">
          <div className="login-data">
            <input
              className="username"
              type="text"
              placeholder="Nazwa Użytkownika"
              onChange={(e) => setUserData({
                ...userData,
                username: e.target.value
              })}
            />
            <div className="icon-container">
              <i className="far fa-user"></i>
            </div>
          </div>

          <div className="login-data">
            <input
              className="password"
              type="password"
              placeholder="Hasło"
              onChange={(e) => setUserData({
                ...userData,
                password: e.target.value
              })}
            />
            <div className="icon-container">
              <i className="fas fa-key"></i>
            </div>
          </div>
          <div className="login-btn">
            <button id="login" onClick={handleSumbit}>ZALOGUJ SIĘ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
