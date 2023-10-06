import React, { useState } from 'react';
import './InternalMarks.css'; // Import the CSS file

const jsonData = [
    { Slno: 1, Hallticket: '22NM1A05B5', Name : 'PALADUGU ANITHA' , Branch : 'CSE' , SubjectCode : 'R201102', Subject : 'COMMUNICATIVE ENGLISH', FinalInternalMarks : 23 },
    { Slno: 2, Hallticket: '22NM1A04G9', Name : 'YENUMULA VIRAJA SHANMUKHI' , Branch : 'ECE' , SubjectCode : 'R201101', Subject : 'MATHEMATICS-I[CALCULUS]', FinalInternalMarks : 28 },
    { Slno: 3, Hallticket: '22NM1A04G9', Name : 'YENUMULA VIRAJA SHANMUKHI' , Branch : 'ECE' , SubjectCode : 'R201102', Subject : 'COMMUNICATIVE ENGLISH', FinalInternalMarks : 27 },
    { Slno: 4, Hallticket: '22NM1A04G8', Name : 'YELLAMELLI ANKITA' , Branch : 'ECE' , SubjectCode : 'R201102', Subject : 'COMMUNICATIVE ENGLISH', FinalInternalMarks : 24 },
    { Slno: 5, Hallticket: '22NM1A04G6', Name : 'YARIPALLI AMANI' , Branch : 'ECE' , SubjectCode : 'R201115', Subject : 'APPLIED CHEMISTRY', FinalInternalMarks : 25 },
    { Slno: 6, Hallticket: '22NM1A04G6', Name : 'YARIPALLI AMANI' , Branch : 'ECE' , SubjectCode : 'R201101', Subject : 'MATHEMATICS-I[CALCULUS]', FinalInternalMarks : 26 },
    { Slno: 7, Hallticket: '22NM1A04G6', Name : 'YARIPALLI AMANI' , Branch : 'ECE' , SubjectCode : 'R201102', Subject : 'COMMUNICATIVE ENGLISH', FinalInternalMarks : 24 },
    { Slno: 8, Hallticket: '22NM1A04F6', Name : 'VAITLA SUREKHA' , Branch : 'ECE' , SubjectCode : 'R201101', Subject : 'MATHEMATICS-I[CALCULUS]', FinalInternalMarks : 26 },
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle the search
  const handleSearch = () => {
    // Perform the search logic here based on the searchQuery state
    // For example, filter the jsonData based on the searchQuery
    const filteredData = jsonData.filter((user) =>
      user.Hallticket.includes(searchQuery) ||
      user.Name.includes(searchQuery)
    );

    // Update the UI or perform any action with the filtered data
    console.log(filteredData);
  };

  return (
    <div>
      <div>
        <h1 className="main-heading">Internal Marks - R111223 - B.Tech I Year I Sem R20 Reg February 2023 </h1>
      </div>
      <div className='buttons'>
        <button className='download-button'>Download Final Internal Marks</button>
      </div>
      <center>
        <h2 className='sub-heading'>List of Students with Final Internal Marks</h2>
      </center>
      <div className="setline1">
        <div className='set1'>
          <button className="search-button" onClick={handleSearch}>Search by Hallticket/Name/MobileNo/Id</button>
          <div className="search-results"></div>
        </div>
        <div className='set2'>
          <select className="dropdown-select">
            <option value="option1">Branch</option>
          </select>
        </div>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Sl no</th>
            <th>Hallticket</th>
            <th>Name</th>
            <th>Branch</th>
            <th>Subject Code</th>
            <th>Subject</th>
            <th>Final Internal Marks</th>
          </tr>
        </thead>
        <tbody>
          {jsonData.map((user) => (
            <tr key={user.Slno}>
              <td>{user.Slno}</td>
              <td>{user.Hallticket}</td>
              <td>{user.Name}</td>
              <td>{user.Branch}</td>
              <td>{user.SubjectCode}</td>
              <td>{user.Subject}</td>
              <td>{user.FinalInternalMarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
