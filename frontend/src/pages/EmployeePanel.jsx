import { useState } from "react";
import { Link } from "react-router-dom";
import LoansTable from "../components/LoansTable";
import FinesTable from "../components/FinesTable";
import MembersTable from "../components/MembersTable";

import BookAdd from "../components/BookAdd";
import FineAdd from "../components/FineAdd";
import AuthorToBookAdd from "../components/AuthorToBookAdd";
import "../Styles/Account.css";
import "../Styles/EmployeePanel.css";
import CreateCategory from "../components/CreateCategory";
import CreateAuthor from "../components/CreateAuthor";
import * as LoanApi from '../api/LoanApi';
import * as MemberApi from '../api/MemberApi';

const EmployeePanel = ({ setIsLogged }) => {
  var userData = JSON.parse(localStorage.getItem("userData"));

  const [membersList, setMembersList] = useState(null);
  const [memberLoans, setMemberLoans] = useState(null);
  const [memberFines, setMemberFines] = useState(null);

  const [selectedMember, setSelectedMember] = useState(null);
  const [membersClicked, setMembersClicked] = useState(false);
  const [bookAddFormClicked, setBookAddFormClicked] = useState(false);
  const [authorAddFormClicked, setAuthorAddFormClicked] = useState(false);
  const [createCategoryClicked, setCreateCategoryClicked] = useState(false);
  const [createAuthorClicked, setCreateAuthorClicked] = useState(false);

  //funkcja wczytująca użytkowników
  const loadMembersList = () => {
    MemberApi.getAllMembers()
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((members) => {
        console.log(members);
        setMembersList(members);
      });
  };

  //funkcja wczytująca wypozyczenia uzytkownika
  const loadMemberLoanList = (memberId) => {
    LoanApi.getMemberLoans(memberId, localStorage.getItem("token"))
      .then((res) => {
        return res.json();
      })
      .then((loans) => {
        console.log("get user loans", loans);
        if (loans.length > 0) {
          setMemberLoans(loans);
        } else {
          setMemberLoans(null);
        }
      });
  };

  const loadMemberFineList = (username) => {
    LoanApi.getMemberLoans(username, localStorage.getItem("token"))
      .then((res) => {
        return res.json();
      })
      .then((fines) => {
        console.log("get user fines", fines);
        if (fines.length > 0) {
          setMemberFines(fines);
        } else {
          setMemberFines(null);
        }
      });
  };

  function deleteLoan(loanId) {
    LoanApi.deleteLoan(loanId)
      .then((response) => {
        console.log("response", response.data);
        //delete i update listy
        loadMemberLoanList(selectedMember.id);
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  function postFine(loanId, amount) {
    LoanApi.postFine(loanId, amount)
      .then((response) => {
        console.log("response", response.data);
        loadMemberFineList(selectedMember.username);
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  const checkClick = (event) => {
    if (event.target.matches(".element-loan")) {
      setMembersClicked(true);
      setBookAddFormClicked(false);
      setAuthorAddFormClicked(false);
      loadMembersList();
      setCreateCategoryClicked(false);
      setCreateAuthorClicked(false);
    }
    if (event.target.matches(".element-book-form")) {
      setMembersClicked(false);
      setBookAddFormClicked(true);
      setAuthorAddFormClicked(false);
      setSelectedMember(null);
      setCreateCategoryClicked(false);
      setCreateAuthorClicked(false);
    }
    if (event.target.matches(".element-author-form")) {
      setMembersClicked(false);
      setBookAddFormClicked(false);
      setAuthorAddFormClicked(true);
      setSelectedMember(null);
      setCreateCategoryClicked(false);
      setCreateAuthorClicked(false);
    }
    if (event.target.matches(".element-create-category-form")) {
      setMembersClicked(false);
      setBookAddFormClicked(false);
      setAuthorAddFormClicked(false);
      setSelectedMember(null);
      setCreateCategoryClicked(true);
      setCreateAuthorClicked(false);
    }
    if (event.target.matches(".element-create-author-form")) {
      setMembersClicked(false);
      setBookAddFormClicked(false);
      setAuthorAddFormClicked(false);
      setSelectedMember(null);
      setCreateCategoryClicked(false);
      setCreateAuthorClicked(true);
    }
  };

  const selectMember = (id) => {
    console.log("Select member", id);
    setMembersClicked(true);

    let member = membersList.find((el) => el.id === id);
    setSelectedMember(member);

    loadMemberLoanList(id);
    loadMemberFineList(member.username);
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
                  membersClicked === true
                    ? "rgba(238, 238, 238, 0.397)"
                    : "white",
                borderRight:
                  membersClicked === true
                    ? "3px solid rgba(68, 148, 68)"
                    : "none",
              }}
            >
              <i
                className="fas fa-book"
                style={{
                  color:
                    membersClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              ></i>
              <h1
                style={{
                  color:
                    membersClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              >
                Użytkownicy
              </h1>
            </div>

            <div
              className="element-book-form"
              style={{
                backgroundColor:
                  bookAddFormClicked === true
                    ? "rgba(238, 238, 238, 0.397)"
                    : "white",
                borderRight:
                  membersClicked === true
                    ? "3px solid rgba(68, 148, 68)"
                    : "none",
              }}
            >
              <i
                className="fas fa-book"
                style={{
                  color:
                    bookAddFormClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              ></i>
              <h1
                style={{
                  color:
                    bookAddFormClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              >
                Dodaj książkę
              </h1>
            </div>

            <div
              className="element-author-form"
              style={{
                backgroundColor:
                  authorAddFormClicked === true
                    ? "rgba(238, 238, 238, 0.397)"
                    : "white",
                borderRight:
                  membersClicked === true
                    ? "3px solid rgba(68, 148, 68)"
                    : "none",
              }}
            >
              <i
                className="fas fa-book"
                style={{
                  color:
                    authorAddFormClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              ></i>
              <h1
                style={{
                  color:
                    authorAddFormClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              >
                Dodaj autora do książki
              </h1>
            </div>

            <div
              className="element-create-category-form"
              style={{
                backgroundColor:
                  createCategoryClicked === true
                    ? "rgba(238, 238, 238, 0.397)"
                    : "white",
                borderRight:
                  createCategoryClicked === true
                    ? "3px solid rgba(68, 148, 68)"
                    : "none",
              }}
            >
              <i
                className="fas fa-book"
                style={{
                  color:
                    createCategoryClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              ></i>
              <h1
                style={{
                  color:
                    createCategoryClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              >
                Utwórz kategorię
              </h1>
            </div>

            <div
              className="element-create-author-form"
              style={{
                backgroundColor:
                  createAuthorClicked === true
                    ? "rgba(238, 238, 238, 0.397)"
                    : "white",
                borderRight:
                  createAuthorClicked === true
                    ? "3px solid rgba(68, 148, 68)"
                    : "none",
              }}
            >
              <i
                className="fas fa-book"
                style={{
                  color:
                    createAuthorClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              ></i>
              <h1
                style={{
                  color:
                    createAuthorClicked === true
                      ? "rgba(68, 148, 68)"
                      : "rgb(61, 61, 61)",
                }}
              >
                Utwórz autora
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
        {selectedMember && (
          <div className="member-details">
            <h3 className="member-header">
              Użytkownik {selectedMember.username}
            </h3>
            {(memberLoans && (
              <LoansTable
                memberActiveLoansList={memberLoans}
                deleteLoan={deleteLoan}
              />
            )) || <h3 className="no-data-header">Brak wypożyczeń</h3>}
            {(memberFines && (
              <FinesTable memberActiveFinesList={memberFines} />
            )) || <h3 className="no-data-header">Brak kar</h3>}
          </div>
        )}
        {selectedMember && (
          <div className="employee-actions">
            {memberLoans && (
              <FineAdd memberLoans={memberLoans} postFine={postFine} />
            )}
          </div>
        )}

        <div
          className="loans"
          style={{ display: membersClicked === true ? "flex" : "none" }}
        >
          {(membersList && (
            <MembersTable
              membersList={membersList}
              selectMember={selectMember}
            />
          )) || <h3 className="no-data-header">Brak użytkowników</h3>}
        </div>

        <div
          className="book-form"
          style={{ display: bookAddFormClicked === true ? "flex" : "none" }}
        >
          <BookAdd />
        </div>

        <div
          className="author-form"
          style={{ display: authorAddFormClicked === true ? "flex" : "none" }}
        >
          <AuthorToBookAdd />
        </div>

        <div
          className="category-form"
          style={{ display: createCategoryClicked === true ? "flex" : "none" }}
        >
          <CreateCategory />
        </div>

        <div
          className="author-form"
          style={{ display: createAuthorClicked === true ? "flex" : "none" }}
        >
          <CreateAuthor />
        </div>
      </div>
    </div>
  );
};

export default EmployeePanel;
