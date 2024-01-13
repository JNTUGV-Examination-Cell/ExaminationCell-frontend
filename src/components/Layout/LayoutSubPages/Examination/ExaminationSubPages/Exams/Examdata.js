import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import data from "./Data";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setExam,
  setExamName,
} from "../../../../../../features/exams/examSlice";

const jsonData = data;
const Examdata = () => {
  const dispatch = useDispatch();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Exam with Year</TableCell>
            <TableCell>Exam</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Batch</TableCell>
            <TableCell>Semester</TableCell>
            <TableCell>ExamType</TableCell>
            <TableCell>Any</TableCell>
            <TableCell>Month</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jsonData.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.exam_with_year}
              </TableCell>
              <TableCell>{row.exam}</TableCell>
              <TableCell>{row.code}</TableCell>
              <TableCell>{row.batch}</TableCell>
              <TableCell>{row.semester}</TableCell>
              <TableCell>{row.examtype}</TableCell>
              <TableCell>{row.any}</TableCell>
              <TableCell>{row.month}</TableCell>
              <TableCell>{row.year}</TableCell>
              <TableCell>{row.Type}</TableCell>
              <TableCell>
                <Button
                  component={Link}
                  to={row.path}
                  onClick={() => {
                    dispatch(setExam(row.code));
                    dispatch(setExamName(row.exam));
                  }}
                >
                  Manage
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Examdata;
