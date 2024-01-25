import "./Batchesmain.css";
import { Link } from "react-router-dom";

const Boxdata = ({ batchesData }) => {
  return (
    <div style={{display: "flex", flexWrap: "wrap"}}>
      {batchesData?.map((record) => (
        <div className="Batch" key={record.batch_id}>
          <div className="Batchname"> Batch</div>
          <div className="Batchnumber">{record.batch_id}</div>
          <div className="Batchregulation">
            {record.regulation_course_title}
          </div>
          <hr style={{ width: "80%", border: "0.3px solid #9BA5B7" }} />
          <Link to="managebatches">
            <button className="Batchbutton">Manage</button>
          </Link>
          <br></br>
          <button className="Batchbutton2">Years and Terms</button>
        </div>
      ))}
    </div>
  );
};

export default Boxdata;
