
import { Link } from 'react-router-dom';
import { Boxdata } from './Boxdata';
import './Batchesmain.css'
import Button from "@mui/material/Button";


const Batchesmain = ()=> {
   
        return (
            <div className="Batchesdiv">
                <div className="Batchesheading">Batches</div>
               
                    <Button
                    component={Link}
                    to={'/layout/batches/studentphotos'}
                    variant='contained'
                     className="studentphotosbutton">Student photos
                     </Button>
               
                <div className='Batchesblocks'><Boxdata /></div>
            </div>
        );
    }


export default Batchesmain;
