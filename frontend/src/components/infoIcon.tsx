import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Tooltip, Typography } from '@mui/material';

interface InfoIconProps {
    text: string;
}

const IconWrapper = styled('div')({
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '1px solid #737272',
    backgroundColor: 'white',
    textAlign: 'center',
    lineHeight: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    marginLeft: '5px',
    color: '#737272',
});

const InfoIcon = ({ text }: InfoIconProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Tooltip
            title={<Typography variant="body2">{text}</Typography>}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            arrow
        >
            <IconWrapper
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
            >
                i
            </IconWrapper>
        </Tooltip>
    );
};

export default InfoIcon;