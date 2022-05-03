const FinesTable = (memberActiveFinesList) => {
    return (
        <div className="loan-table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID KARY</th>
                        <th>ID WYPOŻYCZENIA</th>
                        <th>DATA NAŁOŻENIA</th>
                        <th>KWOTA</th>
                    </tr>
                </thead>
                <tbody>
                    {console.log("in fines table", memberActiveFinesList)}
                    {memberActiveFinesList.memberActiveFinesList.map(fine =>(
                        fine && <tr key={fine.id} >

                            <td>{fine.id}</td>
                            <td>{fine.loan.id}</td>
                            <td>{fine.fineDate}</td>
                            <td>{fine.fineAmount}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FinesTable;
