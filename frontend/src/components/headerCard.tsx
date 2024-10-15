"use client"

import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

export const HeaderCard = () => {

    return (
        <Card sx={{ margin: 2, boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', border: "3px solid rgba(52, 86, 123, 255)" }}>
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <Typography sx={{ fontWeight: '600' }}>
                    Discover relevant scientific articles with our advanced search tool, designed to streamline your research process and uncover hidden gems in the Springer Link database. Our tool was created to address the need for a more efficient and effective way to search through the vast repository of scientific articles.
                </Typography>
                <StyledHeaderButton><Link href="/searchParameters">Click here for tailored search options</Link></StyledHeaderButton>
            </div>
        </Card>
    );
}

export const StyledHeaderButton = styled('button')({
    marginTop: '15px',
    backgroundColor: 'rgba(52, 86, 123, 255)',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    '&:hover': {
        backgroundColor: 'rgba(23, 52, 85, 255)',
        border: '1px solid white',
    },
});
