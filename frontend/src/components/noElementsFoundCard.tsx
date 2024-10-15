import React from 'react';
import {Box, Typography} from '@mui/material';

const NoElementsFoundCard = () => {
    return (
        <Box sx={{mt:3, textAlign:'center'}}>
            <Typography variant="h6" component="div">
                No articles/books found
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Try adjusting your search criteria or check back later.
            </Typography>
        </Box>
    );
};

export default NoElementsFoundCard;