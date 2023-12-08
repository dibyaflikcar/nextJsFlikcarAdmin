"use client"
import React, { useState ,useEffect  } from 'react';
import Image from 'next/image';
import dashboardStyles from '../../../dashboard.module.css';
import {Box,Grid,TextField,Button,Typography} from '@mui/material';
import '../../../../globals.css';
import Sidebar from '../../../../../../components/Sidebar';
import Header from '../../../../../../components/Header';
import {vehicleApi} from '../../../../../app/service/vehicle';
import { useRouter } from 'next/navigation';
import Paper from '@mui/material/Paper';

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

function Update({ params }) {  
  const router = useRouter()
  const [brand, setBrand] = useState(null);
  const [modelList, setModelList] = useState([]);
  const [model, setModel] = useState("");
  const [docId,setDocid]=useState(null);
  const [indexId,setIndexId]=useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editpopupOpen, setEditPopupopen] = useState(false);

 
  useEffect(() => {
    getBrandwithID();
  }, []); 

  const getBrandwithID = async () => {
    try {
      setDocid(params.id);
      const id=params.id;
      const data={id};
      const response = await vehicleApi.getBrandwithID(data);
            console.log(response.data.data);
      if (response.data.status === 200) {
        setModelList(response.data.data.models);
        setBrand(response.data.data.name);
      } 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  

  const handleInput= async(e)=>{
    
    if (e.target.name === 'model') {
      setModel(e.target.value);
    }  
  }

  const handleCloseBtn = () => {
    setEditPopupopen(false);
  };

  const handleEdit =(indexId,model)=>{
    // alert(indexId +" "+model);
    setEditPopupopen(true);
    setModel(model);
    setIndexId(indexId);
  }

  const handleUpdate = async (e) => {
    e.preventDefault(); 

    const formData={docId,model,indexId};
    
    console.log(formData);
    
    const response = await vehicleApi.updateModel(formData);
    if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
      // setPopupopen(true);
      confirm("Model updated successfully");
      setEditPopupopen(false);
      getBrandwithID();
    }
  };

  const handleDelete = async (indexId)=>{
    // alert(indexId);
    const userConfirmed = confirm("Do you want to delete this Model?");
    if (userConfirmed) {
      const formData={docId,indexId};
      // console.log(formData);
      const response = await vehicleApi.deleteModel(formData);
      if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
        confirm("Model Deleted Successfully");
        getBrandwithID();
      }
    }
    
  }
    
  return (
    <>
      {/* <Box className={dashboardStyles.tm_dashboard_main}>        
        <Grid container> 
          <Sidebar/>         
          <Grid item md={10}>
            <Box className={dashboardStyles.tm_dashboard_rightbar_main}>
              <Header/>
              <Box className={dashboardStyles.tm_dashboard_rightbar_form_main}>
                <Box className={dashboardStyles.tm_dashboard_rightbar_form_title}>
                  <Typography variant='h3'>Update your Model! {params.id} </Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Brand" onChange={handleInput} name='brand' type="text" value={brand} variant="outlined" required 
                    InputLabelProps={{shrink: true, }} fullWidth/>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={4}>
                  {modelList.length > 0 && modelList.map((data,key) => (
                      <Grid item md={3}>
                        <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                        <TextField id="outlined-basic" label="Models" onChange={handleInput} name='model' type="text" value={data.name} variant="outlined" required 
                        InputLabelProps={{shrink: true, }} fullWidth/>
                        </Box>
                      </Grid>
                  ))}
                </Grid>
                <Box sx={{margin:'50px 0 0'}}>
                  <Box className={dashboardStyles.tm_dashboard_rightbar_form_submit_btn}>
                    <Button variant="contained" type='submit'>submit</Button>           
                  </Box>
                </Box>
                </form>
              </Box>
            </Box>
          </Grid>
        </Grid>      
       
      </Box> */}
      <Box className={dashboardStyles.tm_dashboard_main}>        
        <Grid container> 
          <Sidebar/>         
          <Grid item md={10}>
            <Box className={dashboardStyles.tm_dashboard_rightbar_main}>
              <Header/>
              <Box className={dashboardStyles.tm_auctionvehicle_table_main}>
                <Box className={dashboardStyles.tm_auctionvehicle_table_main_top}>
                  <Box className={dashboardStyles.tm_auctionvehicle_table_main_top_title}>
                    <Typography variant='h4'>Model List</Typography>
                  </Box>
                  {/* <Box className={dashboardStyles.tm_auctionvehicle_table_main_top_btn}>
                    <Button variant="contained" >Add</Button>
                  </Box> */}
                </Box>
                 
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>            
                  <TableContainer sx={{ maxHeight: 800 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" colSpan={8}>Model List</TableCell>
                          {/* <TableCell align="center" colSpan={3}>List</TableCell> */}
                        </TableRow>
                        <TableRow>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>Id</TableCell>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>Brand</TableCell>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>Model List</TableCell>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      
                      <TableBody>
                                {modelList.map((data,key) => (
                                    <TableRow key={key}>
                                      <TableCell align="center" component="th" scope="row">{key+1}</TableCell>
                                      <TableCell align="center">{brand}</TableCell>
                                      <TableCell align="center">{data.name}</TableCell>
                                      <TableCell align="center">
                                         <EditIcon onClick={(e) => handleEdit(`${key}` , `${data.name}`)} />
                                         <DeleteIcon onClick={(e) => handleDelete(`${key}`)} />
                                     </TableCell>
                                    </TableRow>
                                  ))}
                      </TableBody>
                    </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={modelList.length}
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
        
         <Dialog open={editpopupOpen} onClose={handleCloseBtn} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title" className={dashboardStyles.tm_dashboard_rightbar_add_brand_title}>{"Update Brand"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <form onSubmit={handleUpdate}>
                    <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${dashboardStyles.tm_dashboard_rightbar_form_panel_odd} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="Brand" type="text" value={brand} variant="outlined" disabled fullWidth/>
                      </Box>
                    </Grid>
                    <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${dashboardStyles.tm_dashboard_rightbar_form_panel_odd} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="Model" onChange={handleInput} name='model' type="text" value={model} variant="outlined" required fullWidth/>
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

export default Update