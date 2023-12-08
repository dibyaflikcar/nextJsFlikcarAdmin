"use client"
import React from 'react';
import Image from 'next/image';
import dashboardStyles from  '../src/app/dashboard/dashboard.module.css'
import {Box,Grid,Typography} from '@mui/material';
import '../src/app/globals.css';
import Link from 'next/link';
import {Dashboard as DashboardIcon, ExpandMore as ExpandMoreIcon, Factory as FactoryIcon, DirectionsCar as DirectionsCarIcon, Home as HomeIcon, AccountCircle as AccountCircleIcon, Lock as LockIcon, Logout as LogoutIcon, Group as GroupIcon} from '@mui/icons-material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

const Sidebar = () => {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  
  return (
    <>
      <Grid item md={2}>
        <Box className={dashboardStyles.tm_dashboard_siderbar_main}>
          <Box className={dashboardStyles.tm_dashboard_siderbar_logo}>
            <Image src={"/sidebar/logo.png"} alt='' className='tm_images_cust' layout="fill"/>
          </Box>
          <Box className={dashboardStyles.tm_dashboard_siderbar_title}>
            <Typography variant="h4">Admin Panel</Typography>
          </Box>
          <Box className={dashboardStyles.tm_dashboard_siderbar_menu}>
            <Box className={dashboardStyles.tm_dashboard_siderbar_menu_icon_text}>
              <Link href="/dashboard"><DashboardIcon/> Dashboards</Link>
            </Box>                
          </Box>
          <Box className={`${dashboardStyles.tm_dashboard_siderbar_menu_odd} ${"tm_dashboard_siderbar_menu_odd_gb"}`}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <Box className={dashboardStyles.tm_dashboard_siderbar_menu_odd_icon_text}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Link href="javascript:void(0)"><DirectionsCarIcon/>Vehicle Management</Link>
                </AccordionSummary>
              </Box>
              <AccordionDetails className={dashboardStyles.tm_dashboard_siderbar_menu_details}>
                <Link href="/dashboard/auctionvehicle">-<FactoryIcon/> Auction Vehicle</Link>
              </AccordionDetails>
              <AccordionDetails className={dashboardStyles.tm_dashboard_siderbar_menu_details}>
                <Link href="/dashboard/vehicleenquiry">-<FactoryIcon/> Vehicle Enquiry</Link>
              </AccordionDetails>
              <AccordionDetails className={dashboardStyles.tm_dashboard_siderbar_menu_details}>
                <Link href="/dashboard/brand">-<FactoryIcon/> Brand</Link>
              </AccordionDetails>
            </Accordion>                
          </Box>
          {/* <Box className={`${dashboardStyles.tm_dashboard_siderbar_menu_odd} ${"tm_dashboard_siderbar_menu_odd_gb"}`}>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <Box className={dashboardStyles.tm_dashboard_siderbar_menu_odd_icon_text}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Link href="javascript:void(0)"><DirectionsCarIcon/>Vehicle Management</Link>
                </AccordionSummary>
              </Box>
              <AccordionDetails className={dashboardStyles.tm_dashboard_siderbar_menu_details}>
                <Link href="javascript:void(0)">-<FactoryIcon/> auction Vehicle</Link>
              </AccordionDetails>
            </Accordion>                
          </Box> */}
        </Box>
      </Grid>
    </>
  )
}

export default Sidebar