import React ,{useState}from 'react'
import './StudentPhotosButton.css'
import  StudentPhotosData from './StudentPhotosData.json';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const StudentPhotosButton = () => {
  const [searchQuery,setSearchQuery]=useState('');

  const filteredImages =StudentPhotosData.filter(studentphotosdata =>
    studentphotosdata.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  return (
    <>
    <div className='headerbar'>
    <div className='studentphotostitle'>Student Photos</div>
    <div className='photosSearchbar'>
    <TextField
        label="Search by Roll Number"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      </div>
      </div>
    <div className='studentphotos'>
      {
          filteredImages.map ((studentphotosdata) =>{
            return(
              <div className='photos' key={studentphotosdata.id}>
                <img src={studentphotosdata.image} alt=''/>
                <br className='studentrollnumber'/>
                {studentphotosdata.rollNumber}
              </div>
            )
          })
 
      }
    </div>
    </>
  );
}

export default StudentPhotosButton