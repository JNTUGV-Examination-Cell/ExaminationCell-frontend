import { Link } from 'react-router-dom';
import { Boxdata } from './Boxdata';
import './Batchesmain.css'


const Batchesmain = ()=> {
   
        return (
            <div className="Batchesdiv">
                <div className="Batchesheading">Batches</div>
                <Link to="/studentbutton"><button className="studentphotosbutton">Student photos</button></Link>
                <div className='Batchesblocks'><Boxdata /></div>
            </div>
        );
    }

export default Batchesmain;

