import React from 'react';
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const RegulationsAdd = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your form submission logic here
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <Typography variant="h5">Add New Regulations</Typography>

                <input
                    type="text"
                    placeholder='Regulation'
                    className="textchoose"
                />
                <input
                    type="text"
                    placeholder='Start Year'
                    className="textchoose"
                />
                <div className='AddRegulation'>
                    <Button type="submit" variant="contained" startIcon={<CloudUploadIcon />}>Add Regulation</Button>
                </div>
            </form>
        </div>
    );
};

export default RegulationsAdd;
