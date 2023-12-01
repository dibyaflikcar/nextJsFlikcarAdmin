"use client"
import React, { useState,useEffect } from 'react'
import Image from 'next/image';
import dashboardStyles from './dashboard.module.css';
import {Container,Box,Grid,TextField,Button,Typography} from '@mui/material';
import '../globals.css';
import Link from 'next/link';
import {  Home as HomeIcon, AccountCircle as AccountCircleIcon, Lock as LockIcon, Logout as LogoutIcon, Group as GroupIcon} from '@mui/icons-material';
import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';
import { useRouter } from 'next/navigation';


function Dashboard() {  
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if(!userToken) {
        router.push("/");
    }
      // getUserData();
  }, [router]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <>
      <Box className={dashboardStyles.tm_dashboard_main}>        
        <Grid container> 
          <Sidebar/>         
          <Grid item md={10}>
            <Box className={dashboardStyles.tm_dashboard_rightbar_main}>
              <Header/>
              <Box className={dashboardStyles.tm_dashboard_rightbar_panel_main}>
                <Grid container spacing={4}>
                  <Grid item md={4}>
                    <Box className={dashboardStyles.tm_dashboard_rightbar_panel}>
                      <Box className={dashboardStyles.tm_dashboard_rightbar_panel_text}>
                          <Typography variant='h5'>Total Customer</Typography>
                          <Typography variant='h3'>0</Typography>
                          <Link href="javascript:void(0)">View</Link>
                      </Box>
                      <Box className={dashboardStyles.tm_dashboard_rightbar_panel_icon}>
                        <GroupIcon/>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Box className={dashboardStyles.tm_dashboard_rightbar_panel}>
                      <Box className={dashboardStyles.tm_dashboard_rightbar_panel_text}>
                          <Typography variant='h5'>Total Dealer</Typography>
                          <Typography variant='h3'>0</Typography>
                          <Link href="javascript:void(0)">View</Link>
                      </Box>
                      <Box className={dashboardStyles.tm_dashboard_rightbar_panel_icon}>
                        <GroupIcon/>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Box className={dashboardStyles.tm_dashboard_rightbar_panel}>
                      <Box className={dashboardStyles.tm_dashboard_rightbar_panel_text}>
                          <Typography variant='h5'>Total Auction Vehicle</Typography>
                          <Typography variant='h3'>0</Typography>
                          <Link href="javascript:void(0)">View</Link>
                      </Box>
                      <Box className={dashboardStyles.tm_dashboard_rightbar_panel_icon}>
                        <GroupIcon/>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Box className={dashboardStyles.tm_dashboard_rightbar_panel}>
                      <Box className={dashboardStyles.tm_dashboard_rightbar_panel_text}>
                          <Typography variant='h5'>Total Dealer Vehicle</Typography>
                          <Typography variant='h3'>0</Typography>
                          <Link href="javascript:void(0)">View</Link>
                      </Box>
                      <Box className={dashboardStyles.tm_dashboard_rightbar_panel_icon}>
                        <GroupIcon/>
                      </Box>
                    </Box>
                  </Grid>
                                   
                </Grid>
              </Box>
              <Box className={dashboardStyles.tm_dashboard_footer}>
                
              </Box>
            </Box>
          </Grid>
        </Grid>        
      </Box>
    </>
  )
}

export default Dashboard