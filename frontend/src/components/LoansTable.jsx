const LoansTable = ({memberActiveLoansList, deleteLoan}) => {
  if(deleteLoan) {
    return (
      <div className="loan-table-container">
          <table>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>TYTUŁ</th>
                      <th>AUTOR</th>
                      <th>DATA WYPOŻYCZENIA</th>
                      <th>DATA ZWROTU</th>
                      {
                        deleteLoan && <th>AKCJE</th>
                      }
                  </tr>
              </thead>
              <tbody>
                  {memberActiveLoansList.map(loan =>(
                      loan && <tr key={loan.id} >
                          <td>{loan.book.id}</td>
                          <td>{loan.book.title}</td>
                          <td>{loan.book.authors.map(author => {
                              return (author.firstName + ' ' + author.lastName) + ' '
                          })}</td>

                          <td>{loan.loanDate}</td>

                          <td>
                              {loan.returnedDate === null ? 'Nieokreślone' : loan.returnedDate }
                          </td>
                          {
                              deleteLoan &&
                              <td>
                                  <button onClick={() => deleteLoan(loan.id)}>Usuń wypożyczenie</button>
                              </td>
                          }
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    );
  } else {
    return (
      <div className="loan-table-container">
          <table>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>TYTUŁ</th>
                      <th>AUTOR</th>
                      <th>DATA WYPOŻYCZENIA</th>
                      <th>DATA ZWROTU</th>
                  </tr>
              </thead>
              <tbody>

                  {memberActiveLoansList.map(loan =>(
                      loan.returnedDate && <tr key={loan.id} >
                          <td>{loan.book.id}</td>
                          <td>{loan.book.title}</td>
                          <td>{loan.book.authors.map(author => {
                              return (author.firstName + ' ' + author.lastName) + ' '
                          })}</td>

                          <td>{loan.loanDate}</td>

                          <td>
                              {loan.returnedDate === null ? 'Nieokreślone' : loan.returnedDate }
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    );
  }

}

export default LoansTable;
