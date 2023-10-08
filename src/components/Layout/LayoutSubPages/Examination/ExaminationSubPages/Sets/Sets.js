import React, { useState } from 'react';
import './Sets.css';
import { Typography, Button, Paper,Grid } from '@mui/material';
import MarkAbsents from './MarkAbsents'; 
import MarkMalpractice from './MarkMalpractice';

function Sets() {
  const [activeSetting, setActiveSetting] = useState(null);

  const handleSettingsClick = (setting) => {
    setActiveSetting(setting === activeSetting ? null : setting);
  };

  const setstitle =
    "Sets - R111223 - B.Tech I Year I sem R20 Reg February 2023 - R201102 - COMMUNICATIVE ENGLISH - 20 February 2023 10:00 AM";

  return (
    <div className='malpractice'>
      <Typography variant='h5' className='head'>{setstitle}</Typography>
      <Grid container spacing={2} className='buttons'>
        <Grid item>
          <Button
            variant="contained"
            style={{
              height: 30,
            }}
            onClick={() => handleSettingsClick('Sets Allocation')}
          >
            Sets Allocation
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            // style={{
            //   height: 30,
            // }}
            onClick={() => handleSettingsClick('Mark Absent')}
          >
            Mark Absent
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{
              height: 30,
            }}
            onClick={() => handleSettingsClick('Mark MalPractice')}
          >
            Mark MalPractice
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained"
            style={{
              height: 30,
            }}
            onClick={() => handleSettingsClick('Download D Form')}
          >
            Download D Form
          </Button>
        </Grid>
      </Grid>

      {activeSetting === 'Mark Absent' && <MarkAbsents />} 
      {activeSetting === 'Mark MalPractice' && <MarkMalpractice />} 
      {activeSetting === null && (
      <Grid container spacing={2} className='set'>
      
        <Grid item xs={6} className='set1'>
          <Paper style={{ backgroundColor: '#b8e7ee', display: "flex","flexDirection":" column",
    "alignItems": "center" }}>
            <Typography variant='h6'>SET 1</Typography>
            <hr style={{ width: '60%' }} />
            <Typography variant='h6' style={{ color: 'red' }}>Not Available</Typography>
            <hr style={{ width: '60%' }} />
          </Paper>

        </Grid>
      </Grid>)}
    </div>
  );
}


export default Sets;
