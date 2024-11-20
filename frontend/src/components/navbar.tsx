"use client"

import { Box, ThemeProvider, Toolbar, Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import logo from '../public/logo.png';
import { NavbarSearch } from "@/components/navbarSearch";
import Image from "next/image";
import theme from "@/theme";
import Link from "next/link";
import {StyledHeaderButton} from "@/components/headerCard";

export default function Navbar() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ bgcolor: 'rgba(52, 86, 123, 255)', color: 'white', p: 2 }}>
                <AppBar position="static" sx={{ bgcolor: 'rgba(23,52,85,255)', borderRadius: 1.5 }}>
                    <Toolbar sx={{ gap: 2 }}>
                        <Link href={'/'} passHref>
                            <Box sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: 0.5}}>
                                <Image src={logo} alt='logo' width={50} height={50} />
                                <Typography sx={{ mt: 1, margin: '5px', display: 'block' }} component="div">
                                    Advanced scientific article search
                                </Typography>
                            </Box>
                        </Link>
                        <StyledHeaderButton sx={{  marginBottom:2, width: '30%' }}>
                            <Link href="/searchParameters">Deep search</Link>
                        </StyledHeaderButton>
                        {/* @ts-expect-error wierd mui problem */}
                        <NavbarSearch sx={{ marginLeft: 2, width:'30%' }} />
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    )
}
