// import axios from 'axios';

// async function downloadFile(data) {
//     console.log("downloadFile data",data);
//     const serverUrl = 'http://localhost:5000/download_data';
//     try {
//         const response = await axios.post(serverUrl, data);
//         console.log("Upload data response", response);
//         return response.data;
//     } catch (error) {
//         console.error('Error uploading data:', error);
//         throw error;
//     }
// }

// export default downloadFile;
import React from 'react';
import { styled } from '@mui/material/styles';
import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';

const WhiteButton = styled(Button)({
    color: '#000000', // צבע טקסט - שחור בהיר
    backgroundColor: '#FFFFFF', // צבע רקע - לבן
    '&:hover': {
        backgroundColor: '#FFFFFF', // צבע רקע בעת העכברוש - לבן
    },
    '& .MuiButton-startIcon': {
        color: '#000000', // צבע האייקון בתוך הכפתור - שחור
    },
});

const DownloadExcelButton = ({ data, filename }) => {
    console.log("data",data);
    console.log("filename",filename);
    const handleDownload = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, `${filename}.xlsx`);
    };

    return (
        <WhiteButton size="large" variant="contained" startIcon={<CloudDownloadOutlinedIcon />} onClick={handleDownload}>
            Download File
        </WhiteButton>
    );
};

export default DownloadExcelButton;



