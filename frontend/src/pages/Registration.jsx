import { useState } from "react";
import { Redirect } from "react-router";
import "../Styles/Registration.css"
import * as MemberApi from '../api/MemberApi';

const Registration = ({createNotification}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    const [redirect, setRedirect] = useState(false);

    const register = (e) => {
        e.preventDefault();
        var member = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            repeatedPassword: repeatedPassword
        }

        MemberApi.register(member)
          .then((res) => {
            if (res.status === 400) {
              throw new Error('Nieprawidlowe dane rejestracji');
            }
            setRedirect(true);
          })
          .catch((error) => {
            createNotification("error", "Niepoprawne dane rejestracji");
            return error;
          });
    }

    function comparePasswords() {
        let password = document.getElementById("password").value;
        let repeatedPassword = document.getElementById("repeatedPassword").value;

        let passwordsMismatch = document.getElementById("passwordsMismatch");

        let submitButton = document.getElementById("submitButton");

        if(password !== repeatedPassword) {
            passwordsMismatch.style.display = "";
            submitButton.disabled = true;
        } else {
            passwordsMismatch.style.display = "none";
            submitButton.disabled = false;
        }
    }

    // const onSubmit = (e) => {
    function onSubmit(e) {
      e.preventDefault();
      register();
    }

    if (redirect) {
        return <Redirect to="/" />;
    }
    return (
        <div className="registration-container">
            <div className="registration-panel" >
                <h1 className = "registration-header">REJESTRACJA</h1>
                <form onSubmit={(e) => register(e)}>
                    <div className="registration-data">
                        <input
                            className="firstname"
                            type="text"
                            placeholder="Imię"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <div className="icon-container">
                            <i className="far fa-user"></i>
                        </div>
                    </div>

                    <div className="registration-data">
                        <input
                            className="lastname"
                            type="text"
                            placeholder="Nazwisko"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <div className="icon-container">
                            <i className="far fa-user"></i>
                        </div>
                    </div>

                    <div className="registration-data">
                        <input
                            className="email"
                            type="email"
                            placeholder="E-mail"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="icon-container">
                            <i className="far fa-envelope"></i>
                        </div>
                    </div>

                    <div className="registration-data">
                        <input
                            className="username"
                            type="text"
                            placeholder="Nazwa Użytkownika"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className="icon-container">
                            <i className="far fa-user"></i>
                        </div>
                    </div>

                    <div className="registration-data">
                        <input
                            className="password"
                            type="password"
                            placeholder="Hasło"
                            id={"password"}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                comparePasswords();
                            }}
                        />
                        <div className="icon-container">
                            <i className="fas fa-key"></i>
                        </div>
                    </div>

                    <div className="registration-data">
                        <input
                            className="password"
                            type="password"
                            placeholder="Powtórz hasło"
                            id={"repeatedPassword"}
                            onChange={(e) => {
                                setRepeatedPassword(e.target.value);
                                comparePasswords();
                            }}
                        />
                        <div className="icon-container">
                            <i className="fas fa-key"></i>
                        </div>
                    </div>

                    <div id="passwordsMismatch" style={{display: "none"}} className="error">Hasła muszą się zgadzać!</div>

                    <div className="register-btn">
                        <button id="submitButton" type="submit">ZAREJESTRUJ SIĘ</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registration;
