import { Component } from 'react';
import Records from './example.json'
import './Batchesmain.css'
import { Link } from 'react-router-dom';
export class Boxdata extends Component {
  render() {
    return (
      <div className='Batchesblocks' >
        {
          Records.map(record => {
            return (
              <div className='Batch'>
                <div className='Batchname'> Batch</div>
                <div className='Batchnumber'>{record.batch}</div>
                <div className='Batchregulation'>{record.reg}</div>
                <hr style={{width:"80%",border:'0.3px solid #9BA5B7'}}/>
                <Link to="/layout/batches/managebatches" style={{textDecoration:"none"}}><button className='Batchbutton'>Manage</button></Link>
                <button className='Batchbutton2'>Years and Terms</button>
              </div>
            )
          })
        }
      </div>
    )
  }
}
