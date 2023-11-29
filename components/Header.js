import React from 'react';
import Image from 'next/image';
import dashboardStyles from "../src/app/dashboard/dashboard.module.css"
import {Container,Box,Grid,TextField,Button,Typography} from '@mui/material';
import '../src/app/globals.css';
import Link from 'next/link';
import {  Home as HomeIcon, AccountCircle as AccountCircleIcon, Lock as LockIcon, Logout as LogoutIcon, Group as GroupIcon} from '@mui/icons-material';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';


const Header = () => {
  const router = useRouter()
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

  const signOut = (e)=>{
    localStorage.removeItem('token');
    router.push("/");
  }

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
        <Box className={dashboardStyles.tm_dashboard_header}>
            <Box className={dashboardStyles.tm_dashboard_header_left}>
                <Link href="/"><HomeIcon/></Link>
            </Box>
            <Box className={dashboardStyles.tm_dashboard_header_right}>
                <Stack direction="row" spacing={2}>      
                <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <Box className={dashboardStyles.tm_dashboard_header_right_bd_tlt}>
                    <Box className={dashboardStyles.tm_dashboard_header_right_bd_tlt_icon}>
                        <Image src={"/header/user.png"} alt='' className='tm_images_cust' layout="fill"/>
                    </Box>
                    <Box className={dashboardStyles.tm_dashboard_header_right_bd_tlt_text}>
                        <Typography variant='h5'>Flikcar Admin</Typography>
                        <Typography variant='h6'>Admin panel</Typography>
                    </Box>
                    </Box>
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                        transformOrigin:
                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                            >
                            <MenuItem onClick={handleClose}><AccountCircleIcon/>Profile</MenuItem>
                            <MenuItem onClick={handleClose}><LockIcon/>Change Password</MenuItem>
                            <MenuItem onClick={signOut}><LogoutIcon/>Logout</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                        </Paper>
                    </Grow>
                    )}
                </Popper>      
                </Stack>
            </Box>
        </Box>
    </>
  )
}

export default Header