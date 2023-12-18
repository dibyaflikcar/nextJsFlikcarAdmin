"use client"
import React, { useState,useEffect  } from 'react';
import Image from 'next/image';
import dashboardStyles from '../dashboard.module.css';
import {Box,Grid,TextField,Button,Typography} from '@mui/material';
import '../../globals.css';
import Sidebar from '../../../../components/Sidebar';
import Header from '../../../../components/Header';
import Paper from '@mui/material/Paper';
import {vehicleApi} from '../../../app/service/vehicle';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Mode } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// import ArraytoCsv from '../../../../components/ArraytoCsv';



function User() {  
  const [userList,setUserList]=useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [docId,setDocId]=useState("");
  const [editpopupOpen, setEditPopupopen] = useState(false);
  const [userType, setUserType] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCloseBtn = () => {
    setEditPopupopen(false);
  };

  const handleInput = (e)=>{
    if(e.target.name=="userType")
    {
      setUserType(e.target.value);
    }
    
  };

  

  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      const response = await vehicleApi.getUsers();
            // console.log(response);
      if (response.data.status === 200) {
        setUserList(response.data.data.reverse());
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = async (id, userType) => {
    // alert(userType);
    setEditPopupopen(true);
    setDocId(id);
    setUserType(userType);
  }

  const UpdateUserType = async (e)=>{
    e.preventDefault(); 
    const formData={docId , userType};
    // alert(formData.userType);
      const response = await vehicleApi.updateUserType(formData);
      if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
        // console.log(response);
        setEditPopupopen(false);
        alert("you have updated successfully");
        fetchData();
        
      }
  }

  const handleDelete = async (id) => {
    // alert(id);
    const userConfirmed = confirm("Do you want to delete this user?");
    if (userConfirmed) {
      // Perform the action when the user clicks OK
      const formData={id};
      const response = await vehicleApi.deleteUser(formData);
      if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
        // console.log(response);
        alert("you have deleted successfully");
        fetchData();
        
      }
    } 
  }

  const handleDownloadCsv = () => {
    ArraytoCsv(userList, 'user-list.csv');
  };

 
  return (
    <>
      <Box className={dashboardStyles.tm_dashboard_main}>        
        <Grid container> 
          <Sidebar/>         
          <Grid item md={10}>
            <Box className={dashboardStyles.tm_dashboard_rightbar_main}>
              <Header/>
              <Box className={dashboardStyles.tm_auctionvehicle_table_main}>
                <Box className={dashboardStyles.tm_auctionvehicle_table_main_top}>
                  <Box className={dashboardStyles.tm_auctionvehicle_table_main_top_title}>
                    <Typography variant='h4'> Users List</Typography>
                  </Box>
                  {/* <Box className={dashboardStyles.tm_auctionvehicle_table_main_top_btn}>
                    <Button variant="contained" onClick={handleDownloadCsv}>Download CSV</Button>
                  </Box> */}
                </Box>
                 
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>            
                  <TableContainer sx={{ maxHeight: 700 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" colSpan={8}>Users List</TableCell>
                          {/* <TableCell align="center" colSpan={3}>List</TableCell> */}
                        </TableRow>
                        <TableRow>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>Id</TableCell>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>Phone No</TableCell>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>User Type	</TableCell>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>Created At</TableCell>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      
                      <TableBody>
                                {userList.map((data,key) => (
                                    <TableRow key={key}>
                                      <TableCell align="center" component="th" scope="row">{data.id}</TableCell>
                                      <TableCell align="center" >{data.phone} </TableCell>
                                      <TableCell align="center">{data.userTypeStatus} <EditIcon onClick={(e) => handleEdit(`${data.id}`,`${data.userTypeStatus}`)} /></TableCell>
                                      <TableCell align="center">{data.createdAt ? data.createdAt : 'NA'}</TableCell>
                                      <TableCell align="center">
                                        <Link as={`update/${data.id}`} href={`update?id=${data.id}`}><EditIcon /></Link> 
                                        <DeleteIcon onClick={(e) => handleDelete(`${data.id}`)} />
                                    </TableCell>
                                    </TableRow>
                                  ))}
                      </TableBody>
                    </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={userList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
                </Paper>
              </Box>
            </Box>
          </Grid>
        </Grid>        
      </Box>
      <Dialog open={editpopupOpen} onClose={handleCloseBtn} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title" className={dashboardStyles.tm_dashboard_rightbar_add_brand_title}>{"Update User Type"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <form onSubmit={UpdateUserType}>
                <Grid item md={3}>
                    {/* <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${dashboardStyles.tm_dashboard_rightbar_form_panel_odd} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Brand" onChange={handleInput} name='brand' type="text" value={brand} variant="outlined" required fullWidth/>
                    </Box> */}
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${dashboardStyles.tm_dashboard_rightbar_form_panel_odd} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select User Type *</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={userType}
                          label="Select User Type *"
                          onChange={handleInput}
                          name='userType'
                          required
                        >
                            <MenuItem key="1" value="CUSTOMER">CUSTOMER</MenuItem>
                            <MenuItem key="2" value="DEALER_FORMS_SUBMITTED">DEALER_FORMS_SUBMITTED</MenuItem>
                            <MenuItem key="3" value="DEALER_REJECTED">DEALER_REJECTED</MenuItem>
                            <MenuItem key="4" value="DEALER">DEALER</MenuItem>
                            <MenuItem key="5" value="BLOCKED">BLOCKED</MenuItem>
                            <MenuItem key="6" value="DELETED">DELETED</MenuItem>
                          
                        </Select>
                      </FormControl>
                    </Box>
                </Grid>
                <Box className={dashboardStyles.tm_dashboard_rightbar_form_submit_btn_odd}>
                    <Button variant="contained" type='submit'>Update</Button>           
                </Box>
            </form>
            </DialogContentText>
          </DialogContent>
         </Dialog> 
    </>
  )
}

export default User