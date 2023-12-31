import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const ManageBatches = () =>{
    return(
        <div>
            <div>
                <h1>Manage Batch - MCA R16 [2018-2021]</h1>
                <Stack spacing={2} direction="row">
                <Button variant="contained">New Admission</Button>
                <Button variant="contained">Bulk Admissions</Button>
                <Button variant="contained">Free Setup</Button>
                </Stack>
            </div>
        </div>
    );
}

export default ManageBatches;