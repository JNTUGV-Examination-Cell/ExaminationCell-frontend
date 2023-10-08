import React from 'react';
import "./CondonationandDetention.css";
const jsonData = [
    { Slno: 1, Hallticket: '22NM1A0202'},
    { Slno: 2, Hallticket:'22NM1A0234' },
    { Slno: 3, Hallticket: '22NM1A0478'},
    { Slno: 4, Hallticket: '22NM1A04E9'},
    { Slno: 5, Hallticket:'22NM1A04F7'},
   
  
  ];
  
  const jsonData1 = [
    { Slno: 1, Hallticket: '22NM1A0267', Amount:500},
    
  ]; 
function App() {
    return (
      <div className='set'>
      <div>  <h1>Condonation and Detention - R111223 - B.Tech I Year I Sem R20 Reg February 2023 </h1></div>
       <div> <button onClick={handleSettingsClick}>Payment</button></div>
        <div>
        <div className='setline1'>
           <div className='Detained'>
           <h3 >Detained Students</h3>
           <table>
           
    <thead>
      <tr>
        <th>Sl no</th>
        <th>Hallticket</th>
      </tr>
    </thead>
    <tbody>
      {jsonData.map((user) => (
        <tr key={user.Slno}>
          <td>{user.Slno}</td>
          <td>{user.Hallticket}</td>
          
        </tr>
      ))}
    </tbody>
  </table>
                



            </div>
            <div className='setline2'>
            <div className='Condonation'>
                        <h3 >Condonation Students</h3>
                        <table>
           
    <thead>
      <tr>
        <th>Sl no</th>
        <th>Hallticket</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      {jsonData1.map((user) => (
        <tr key={user.Slno}>
          <td>{user.Slno}</td>
          <td>{user.Hallticket}</td>
          <td>{user.Amount}</td>
          
        </tr>
      ))}
    </tbody>
  </table>
            </div>
            </div>
        </div>
    </div>
    </div>
        
       
    )
} 

function handleSettingsClick() {
    // Add logic for handling settings button click here
}

export default App;