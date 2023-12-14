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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Link from 'next/link';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Mode } from '@mui/icons-material';
import { red } from '@mui/material/colors';

function Rto() {  
  const [id,setId]=useState("");
  const [newRtoCode,setNewRtoCode]=useState("");
  const [newRtoName,setNewRtoName]=useState("");
  const [editRtoCode,setEditRtoCode]=useState("");
  const [editRtoName,setEditRtoName]=useState("");
  const [rtoList,setRtoList]=useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [popupOpen, setPopupopen] = useState(false);
  const [editpopupOpen, setEditPopupopen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []); 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCloseBtn = () => {
    setPopupopen(false);
    setEditPopupopen(false);
  };

  const fetchData = async () => {
    try {
      const response = await vehicleApi.getRtoList();
            // console.log(response.data.data);
      if (response.data.status === 200) {
        setRtoList(response.data.data.reverse());
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInput = (e)=>{
    if(e.target.name=="newRtoName")
    {
      setNewRtoName(e.target.value);
    }
    if(e.target.name=="newRtoCode")
    {
      setNewRtoCode(e.target.value);
    }
    if(e.target.name=="editRtoName")
    {
      setEditRtoName(e.target.value);
    }
    if(e.target.name=="editRtoCode")
    {
      setEditRtoCode(e.target.value);
    }
  };

  const handleSubmit =async (e)=>{
    e.preventDefault(); 
    const formData={newRtoName,newRtoCode};

    const response = await vehicleApi.addRto(formData);
    // console.log(response);
    if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
      setNewRtoName("");
      setNewRtoCode("");
      setPopupopen(false);
      confirm("RTO added successfully");
      fetchData();
    }
  };

  const handleAdd = async ()=>{
    setPopupopen(true);
  };

  const handleDelete = async (id) => {
    // alert(id);
    const userConfirmed = confirm("Do you want to delete this Rto?");
    if (userConfirmed) {
      const formData={id};
      const response = await vehicleApi.deleteRto(formData);
      if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
        // console.log(response);
        alert("Rto Deleted Successfully");
        fetchData();
      }
    } 
  }

  const handleEdit = async (id,name,code) => {
    // alert(id+" "+name+ " "+code);
    setId(id);
    setEditRtoName(name);
    setEditRtoCode(code);
    setEditPopupopen(true);
    
  }

  const handleUpdate =async (e)=>{
    e.preventDefault(); 
    const formData={id , editRtoName,  editRtoCode};

    const response = await vehicleApi.updateRto(formData);
    // console.log(response);
    if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
      setEditPopupopen(false);
      confirm("Rto Updated successfully");
      fetchData();
    }
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
                    <Typography variant='h4'>RTO List</Typography>
                  </Box>
                  <Box className={dashboardStyles.tm_auctionvehicle_table_main_top_btn}>
                    <Button variant="contained" onClick={handleAdd}>Add</Button>
                  </Box>
                </Box>
                 
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>            
                  <TableContainer sx={{ maxHeight: 800 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" colSpan={8}>RTO List</TableCell>
                          {/* <TableCell align="center" colSpan={3}>List</TableCell> */}
                        </TableRow>
                        <TableRow>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>Id</TableCell>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>RTO Name</TableCell>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>RTO Code</TableCell>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      
                      <TableBody>
                                {rtoList.map((data,key) => (
                                    <TableRow key={key}>
                                      <TableCell align="center" component="th" scope="row">{data.id}</TableCell>
                                      <TableCell align="center">{data.data.rtoName}</TableCell>
                                      <TableCell align="center"> {data.data.rtoCode} </TableCell>
                                      <TableCell align="center">
                                         <EditIcon onClick={(e) => handleEdit(`${data.id}`, `${data.data.rtoName}`,  `${data.data.rtoCode}`)} />
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
        count={rtoList.length}
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
        <Dialog open={popupOpen} onClose={handleCloseBtn} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title" className={dashboardStyles.tm_dashboard_rightbar_add_brand_title}>{"Add RTO"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              <form onSubmit={handleSubmit}>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${dashboardStyles.tm_dashboard_rightbar_form_panel_odd} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="RTO Name" onChange={handleInput} name='newRtoName' type="text" value={newRtoName} variant="outlined" required fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${dashboardStyles.tm_dashboard_rightbar_form_panel_odd} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="RTO Code" onChange={handleInput} name='newRtoCode' type="text" value={newRtoCode} variant="outlined" required fullWidth/>
                    </Box>
                  </Grid>
                  <Box className={dashboardStyles.tm_dashboard_rightbar_form_submit_btn_odd}>
                    <Button variant="contained" type='submit'>submit</Button>           
                  </Box>
              </form>
              </DialogContentText>
            </DialogContent>
         </Dialog> 
         <Dialog open={editpopupOpen} onClose={handleCloseBtn} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title" className={dashboardStyles.tm_dashboard_rightbar_add_brand_title}>{"Update Color"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <form onSubmit={handleUpdate}>
                <Grid item md={3}>
                  <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${dashboardStyles.tm_dashboard_rightbar_form_panel_odd} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                  <TextField id="outlined-basic" label="RTO Name" onChange={handleInput} name='editRtoName' type="text" value={editRtoName} variant="outlined" required fullWidth/>
                  </Box>
                </Grid>
                <Grid item md={3}>
                  <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${dashboardStyles.tm_dashboard_rightbar_form_panel_odd} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                  <TextField id="outlined-basic" label="RTO Code" onChange={handleInput} name='editRtoCode' type="text" value={editRtoCode} variant="outlined" required fullWidth/>
                  </Box>
                </Grid>
              <Box className={dashboardStyles.tm_dashboard_rightbar_form_submit_btn_odd}>
                <Button variant="contained" type='submit'>Update</Button>           
              </Box>
            </form>
            </DialogContentText>
          </DialogContent>
         </Dialog>  
     
            
      </Box>
    </>
  )
}

export default Rto