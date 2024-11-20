import React, { useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import { handleExport } from '@/utils/handleExport';

const ExportButton = ({ query, startIdx }: { query: string, startIdx: number }) => {
    const [open, setOpen] = useState(false);

    const handleClick = async () => {
        await handleExport(query, startIdx);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<GetAppIcon />}
                onClick={handleClick}
                style={{ marginLeft: 'auto', background: 'rgba(52, 86, 123, 255)', }}
            >
                Export
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%', bgcolor: 'lightgray' }}>
                    File exported
                </Alert>
            </Snackbar>
        </>
    );
};

export default ExportButton;