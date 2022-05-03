import { useState } from "react";
import { Link } from "react-router-dom";
import LoansTable from "../components/LoansTable";
import "../Styles/Account.css";
import * as LoanApi from '../api/LoanApi';
import { useEffect } from "react";

const Account = ({ setIsLogged }) => {
  var userData = JSON.parse(localStorage.getItem("userData"));

  const [memberActiveLoansList, setMemberActiveLoansList] = useState(null);
  const [memberFines, setMemberFines] = useState(null);

  const [loanClicked, setLoanClicked] = useState(false);
  const [fineClicked, setFineClicked] = useState(false);

  useEffect(() => {

  }, [memberActiveLoansList]);

  //funkcja wczytująca aktywne wypozyczenia uzytkownika
  const loadLoans = () => {
    LoanApi.getActiveLoans(userData.id, localStorage.getItem("token")).then((loans) => {
      console.log(loans[0])
      setMemberActiveLoansList(loans);
    })
  };

  //funkcja wczytująca opłaty uzytkownika
  const loadFines = () => {
    LoanApi.getMemberFines(userData.username, localStorage.getItem("token"))
      .then((fines) => {
        setMemberFines(fines);
      });
  };

  const checkClick = (event) => {
    if (event.target.matches(".element-loan")) {
      setFineClicked(false);
      setLoanClicked(true);
      loadLoans();
    }
    if (event.target.matches(".element-fine")) {
      setLoanClicked(false);
      setFineClicked(true);
      loadFines();
    }
  };

  return (
    <div className="account-container" onClick={(e) => checkClick(e)}>
      <div className="left-side">
        <div className="account-div">
          <div className="profile-img">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="account-info">
            <h1>
              {userData.firstName} {userData.lastName}
            </h1>
            <h3>{userData.username}</h3>
          </div>
        </div>

        <div className="general">
          <h1 className="header-text">OGÓLNE</h1>
          <div className="options">
            <div
              className="element-loan"
              style={{
                backgroundColor:
                  loanClicked === true ? "rgba(238, 238, 238, 0.397)" : "white",
                borderRight:
                  loanClicked === true ? "3px solid rgba(68, 148, 68)" : "none",
              }}
            >
              <i
                className="fas fa-book"
                style={{
                  color:
                    loanClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              ></i>
              <h1
                style={{
                  color:
                    loanClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              >
                Wypożyczenia
              </h1>
            </div>

            <div
              className="element-fine"
              style={{
                backgroundColor:
                  fineClicked === true ? "rgba(238, 238, 238, 0.397)" : "white",
                borderRight:
                  fineClicked === true ? "3px solid rgba(68, 148, 68)" : "none",
              }}
            >
              <i
                className="fas fa-coins"
                style={{
                  color:
                    fineClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              ></i>
              <h1
                style={{
                  color:
                    fineClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              >
                Opłaty
              </h1>
            </div>
          </div>
        </div>
        <Link
          to={"/logowanie"}
          onClick={() => {
            localStorage.clear();
            setIsLogged(false);
          }}
        >
          <div className="logout-btn">
            <h1>WYLOGUJ SIĘ</h1>
          </div>
        </Link>
      </div>
      <div className="right-side">
        <div
          className="loans"
          style={{ display: loanClicked === true ? "flex" : "none" }}
        >
          {memberActiveLoansList && (
            <LoansTable memberActiveLoansList={memberActiveLoansList} />
          )}
        </div>
        <div className="fines"></div>
      </div>
    </div>
  );
};

export default Account;
