const MembersTable = ({membersList, selectMember}) => {
    return (
        <div className="loan-table-container">
            <table>
               <thead data-testid="thead">
                    <tr data-testid="table-header-row">
                        <th>ID</th>
                        <th>EMAIL</th>
                        <th>NAZWA UŻYTKOWNIKA</th>
                        <th>IMIĘ</th>
                        <th>NAZWISKO</th>
                        <th>TYP</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {membersList.map(member =>(
                        <tr key={member.id} onClick = {e => selectMember(member.id)} data-testid="table-row" >
                            <td>{member.id}</td>
                            <td>{member.email}</td>
                            <td>{member.username}</td>
                            <td>{member.firstName}</td>
                            <td>{member.lastName}</td>
                            <td>{member.types.map(type => (
                                type.typeValue + ", "
                            ))}</td>
                            <td>{member.memberStatus.statusValue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MembersTable;
