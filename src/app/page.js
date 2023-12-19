'use client';
import React, { useState } from 'react'
import Image from 'next/image';
import styles from './page.module.css';
import {Container,Box,Grid,TextField,Button,Typography} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './globals.css';
import {authapi} from '../app/service/auth';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';


export default function Home() {
  const router = useRouter();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoader,setLoader]=useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  
    
    const onInputChange = (e) => {
        if(e.target.name=="email")
        {
          setEmail(e.target.value);
        }
        if(e.target.name=="password")
        {
            setPassword(e.target.value);
        }
    }
    const onInputSubmit=async (e)=>{
        const data={email ,password};
        if(email==''){
            setError("Enter Your Email!");
        }
        else if(password==''){
            setError("Enter Your Password!");
        }
        else
        {
            setError("");
            setLoader(true);
            // console.log("success :"+email+" "+password);
            const response = await authapi.loginUser(data);
            // console.log(response.data.data.access_token);

            if (response.data.status === 200) {
                setEmail("");
                setPassword("");
                localStorage.setItem('token', response.data.data.access_token);
                router.push("/dashboard");
            }
            else
            {
                setError("Invalid Credentials!");
                setLoader(false);
            }
        }
    }
  return (
    <>
      <Box className={styles.tm_amin_main}>
        <Container maxWidth="md">
          <Box className={styles.tm_amin_main_box}>
            <Grid container sx={{display:'flex', alignItems:'center'}} spacing={4}>
              <Grid item md={6}>
                <Box className={styles.tm_amin_main_img}>
                  <Image src={"/admin/admin.png"} alt='' className='tm_images_cust' layout="fill"/>
                </Box>
              </Grid>
              <Grid item md={6}>
                  <Box className={`${styles.tm_amin_main_text} ${"tm_amin_main_text_gb"}`}>
                      <Box className={styles.tm_amin_main_text_title}>
                      <Typography variant='h4'>Sign in to admin</Typography>
                      <Typography style={{ color: "red" }}>{error}</Typography>
                      </Box>
                      <Box className="tm_amin_main_text_gb_field">
                        <TextField id="outlined-basic" onChange={onInputChange} name='email' label="Email" variant="outlined" fullWidth/>
                      </Box>    
                      <Box className="tm_amin_main_text_gb_field">
                        <FormControl sx={{ }} variant="outlined" fullWidth>
                          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"
                            onChange={onInputChange}
                            name='password'
                          />
                        </FormControl>
                      </Box> 
                      {/* <Box className={`${styles.tm_amin_main_checkbox} ${"tm_amin_main_checkbox_gb"}`}>
                        <FormControlLabel required control={<Checkbox />} label="Remember me" />
                      </Box> */}
                      <Box className={`${styles.tm_amin_main_btn} ${"tm_amin_main_btn_gb"}`}>
                        <Button variant="contained" onClick={onInputSubmit}>Sign In {isLoader?(<CircularProgress />):(<></>)}</Button>
                      </Box>                  
                  </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  )
}
