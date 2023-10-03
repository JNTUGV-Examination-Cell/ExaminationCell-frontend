import React from 'react';
import './HallTickets.css'; 


const jsonData = [
  { SIno: 1 , Hallticket: '22NM1A0201', Name:'AGARPU YASASWINI',Branch:'Electrical and Electronics Engineering',Mobile:'8121504788',Id:'8621010564'},
  { SIno: 2 , Hallticket: '22NM1A0203', Name:'ALLAVARAPU KUSUMA',Branch:'Electrical and Electronics Engineering',Mobile:'9966240149',Id:'9987213857'},
  { SIno: 3 , Hallticket: '22NM1A0204', Name:'ALLURI SANJULA',Branch:'Electrical and Electronics Engineering',Mobile:'8333022234',Id:'9902054338'},
  { SIno: 4 , Hallticket: '22NM1A0205', Name:'ARASADA CHANDINI',Branch:'Electrical and Electronics Engineering',Mobile:'9398209484',Id:'7874214661'},
  { SIno: 5 , Hallticket: '22NM1A0206', Name:'BALLA GAYATHRI',Branch:'Electrical and Electronics Engineering',Mobile:'8179845156',Id:'7108470975'},
  { SIno: 6 , Hallticket: '22NM1A0207', Name:'BANTUBILLI ANUSHA',Branch:'Electrical and Electronics Engineering',Mobile:'9346817970',Id:'5136547972'},
  { SIno: 7 , Hallticket: '22NM1A0208', Name:'BHUMIREDDY SAI DIVYA',Branch:'Electrical and Electronics Engineering',Mobile:'9949124498',Id:'2888664721'},
  { SIno: 8 , Hallticket: '22NM1A0209', Name:'BODDAPATI NANDINI',Branch:'Electrical and Electronics Engineering',Mobile:'9381486459',Id:'2181844270'},
]
function App() {
    const handleDownload = () => {
          // Add the logic for downloading hall tickets here
          // For example, you could create a link to a file or generate a file for download
        };
  return (
    <div>
      <h1>FINAL LIST OF EXAMINATION - R111223 - B.Tech I YEAR I SEM R20 EG FEBRUARY 2023</h1>
      <button className="Button" onClick={handleDownload}>Download Hall Tickets</button>
      <table>
        <thead>
          <tr>
            <th>SIno</th>
            <th>Hallticket</th>
            <th>Name</th>
            <th>Branch</th>
            <th>Mobile</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
          {jsonData.map((user) => (
            <tr key={user.id}>
            <td>{user.SIno}</td>
              <td>{user.Hallticket}</td>
              <td>{user.Name}</td>
              <td>{user.Branch}</td>
              <td>{user.Mobile}</td>
              <td>{user.Id}</td>
               </tr>
          )
          )
          }
        </tbody>
      </table>
    </div>
  );
}
export default App;