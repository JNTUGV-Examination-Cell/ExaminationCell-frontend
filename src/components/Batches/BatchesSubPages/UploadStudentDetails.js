import * as React from 'react';
import './bulkadmissions.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
export default function UploadStudentDetails(){
  return (
  <div>
    <div>
      <h1>Upload Student basic details</h1>
      <div className="bulkadmissionsupload">
        <h1 className="head">upload Student Basic Details File - .txt format</h1>
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
         Upload file
        <VisuallyHiddenInput type="file" />
        </Button>
        <input type='text' id="filled-basic" placeholder="No file Chosen" variant="outlined" className='textchoose'/>
        <div className='buttonproceed'>
        <Button variant='contained'>Proceed</Button>
        </div>
        <br />
        <div className='textshow'>
        <input type='text' id="filled-choosen" placeholder="Shows the data of the file" variant="outlined" className='textfill'/>
        </div>
      </div>
    </div>
  </div>
  )
};
