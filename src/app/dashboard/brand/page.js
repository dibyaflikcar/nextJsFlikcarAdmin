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

function Brand() {  
  const [brand,setBrand]=useState("");
  const [brandList,setBrandList]=useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [popupOpen, setPopupopen] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCloseBtn = () => {
    setPopupopen(false);
  };

  const handleInput = (e)=>{
    if(e.target.name=="brand")
    {
        setBrand(e.target.value);
    }
  };

  const handleSubmit =async (e)=>{
    e.preventDefault(); 
    const formData={brand};

    const response = await vehicleApi.addBrand(formData);
    // console.log(response);
    if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
      confirm("Brand added successfully");
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      const response = await vehicleApi.getBrand();
            // console.log(response.data.data);
      if (response.data.status === 200) {
          setBrandList(response.data.data);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAdd = async ()=>{
    setPopupopen(true);
  };

  const handleDelete = async (id) => {
    // alert(id);
    const userConfirmed = confirm("Do you want to delete this brand?");
    if (userConfirmed) {
      const formData={id};
      const response = await vehicleApi.deleteBrand(formData);
      if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
        // console.log(response);
        alert("Brand Deleted Successfully");
        fetchData();
        
      }
    } 
  }

 
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
                    <Typography variant='h4'>Brand List</Typography>
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
                          <TableCell align="center" colSpan={8}>Brand List</TableCell>
                          {/* <TableCell align="center" colSpan={3}>List</TableCell> */}
                        </TableRow>
                        <TableRow>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>Id</TableCell>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>Brand</TableCell>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      
                      <TableBody>
                                {brandList.map((data,key) => (
                                    <TableRow key={key}>
                                      <TableCell align="center" component="th" scope="row">{key+1}</TableCell>
                                      <TableCell align="center">{data.data.name}</TableCell>
                                      <TableCell align="center">
                                        {/* <Link as={`update/${data.id}`} href={`update?id=${data.id}`}><EditIcon /></Link> */}
                                         <DeleteIcon onClick={(e) => handleDelete(`${data.id}`)} /></TableCell>
                                    </TableRow>
                                  ))}
                      </TableBody>
                    </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={brandList.length}
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
        <DialogTitle id="alert-dialog-title">{"Add Brand"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <form onSubmit={handleSubmit}>
                 <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Brand" onChange={handleInput} name='brand' type="text" value={brand} variant="outlined" required fullWidth/>
                    </Box>
                  </Grid>
                  <Box className={dashboardStyles.tm_dashboard_rightbar_form_submit_btn}>
                    <Button variant="contained" type='submit'>submit</Button>           
                  </Box>
          </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>       
      </Box>
    </>
  )
}

export default Brand