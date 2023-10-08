import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const jsonData = [
  { Slno: 1, Hallticket: '22NM1A0202' },
  { Slno: 2, Hallticket: '22NM1A0234' },
  { Slno: 3, Hallticket: '22NM1A0478' },
  { Slno: 4, Hallticket: '22NM1A04E9' },
  { Slno: 5, Hallticket: '22NM1A04F7' },
];

const jsonData1 = [
  { Slno: 1, Hallticket: '22NM1A0267', Amount: 500 },
];

function CondonationandDetention() {
  
  const [isPaymentFormVisible, setPaymentFormVisible] = useState(false);
  const handleSettingsClick = () => {
    
    setPaymentFormVisible(!isPaymentFormVisible); 
  };

  return (
    <div className='set'>
      <div style={{ marginBottom: '20px' }}>
        <Typography variant="h4">Condonation and Detention - R111223 - B.Tech I Year I Sem R20 Reg February 2023</Typography>
      </div>
      <div style={{ marginBottom: '30px' }}>
        <Button onClick={handleSettingsClick} variant="contained" color="primary">
          Payment
        </Button>
      </div>

      {isPaymentFormVisible && (
        <div>
          {/* Render your payment form or payment processing logic here */}
        </div>
      )}

      <div>
        
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>

          <div className='Detained'>
            <Typography variant="h5">Detained Students</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sl no</TableCell>
                  <TableCell>Hallticket</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jsonData.map((user) => (
                  <TableRow key={user.Slno}>
                    <TableCell>{user.Slno}</TableCell>
                    <TableCell>{user.Hallticket}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className='Condonation'>
              <Typography variant="h5">Condonation Students</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sl no</TableCell>
                    <TableCell>Hallticket</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jsonData1.map((user) => (
                    <TableRow key={user.Slno}>
                      <TableCell>{user.Slno}</TableCell>
                      <TableCell>{user.Hallticket}</TableCell>
                      <TableCell>{user.Amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            </Grid>
      </Grid>
      </div>
    </div>
  );
}

export default CondonationandDetention;
