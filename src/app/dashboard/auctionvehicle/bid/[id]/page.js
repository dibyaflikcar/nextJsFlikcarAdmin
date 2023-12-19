"use client"
import React, { useState,useEffect  } from 'react';
import Image from 'next/image';
import dashboardStyles from '../../../dashboard.module.css';
import {Box,Grid,TextField,Button,Typography} from '@mui/material';
import '../../../../globals.css';
import Sidebar from '../../../../../../components/Sidebar';
import Header from '../../../../../../components/Header';
import Paper from '@mui/material/Paper';
import {vehicleApi} from '../../../../../app/service/vehicle';

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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

// export async function generateStaticParams() {
//   return [{ id: "fallback" }];
// }

function Bid({ params }) {  

  const router = useRouter()

  const [auctionData,setAuctionData]=useState(null);
  const [bidList,setBidList]=useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [docId,setDocid]=useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetchData();
  },[]); 

  const fetchData = async () => {
    try {
      const data={id:params.id};
      setDocid(params.id);
      const response = await vehicleApi.getBidList(data);
      console.log(response.data.auction);
      if (response.data.status === 200) {
        setBidList(response.data.data.reverse());
        setAuctionData(response.data.auction);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
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
                    <Typography variant='h4' sx={{fontSize:'30px', padding:'0 0 10px'}}>Bid List </Typography>

                    {auctionData ? (<>
                      <Image src={auctionData.carDetails.imagePath} alt='Image' height={100} width={150}/>
                      <Typography variant='h4' sx={{fontSize:'20px', padding:'10px 0'}}>{auctionData.carDetails.brand} {auctionData.carDetails.model} {auctionData.carDetails.variant} {auctionData.carDetails.registrationYear} 
                      </Typography>
                    </>):
                    (<></>)}
                  </Box>
                </Box>
                 
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>            
                  <TableContainer sx={{ maxHeight: 800 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" colSpan={8}>Bid List</TableCell>
                          {/* <TableCell align="center" colSpan={3}>List</TableCell> */}
                        </TableRow>
                        <TableRow>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>Sl No</TableCell>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>Name</TableCell>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>Phone</TableCell>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>UserID</TableCell>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>Price</TableCell>
                            <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>Date</TableCell>
                            {/* <TableCell  align="center" style={{ top: 57, minWidth: 170 }}>Action</TableCell> */}
                        </TableRow>
                      </TableHead>
                      
                      <TableBody>
                                {bidList.map((data,key) => {
                                  const date2 = new Date(data.placedTime);
                                  const year2 = date2.getFullYear();
                                  const month2 = (date2.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
                                  const day2 = date2.getDate().toString().padStart(2, '0');
                                  const hours2 = date2.getHours().toString().padStart(2, '0');
                                  const minutes2 = date2.getMinutes().toString().padStart(2, '0');
                                  const bidTime = `${day2}-${month2}-${year2} ${hours2}:${minutes2}`;

                                  return (
                                      <TableRow key={key}>
                                      <TableCell align="center" component="th" scope="row">{data.id}</TableCell>
                                      <TableCell align="center">{data.bidder.firstName} {data.bidder.lastName}</TableCell>
                                      <TableCell align="center" className={dashboardStyles.tm_auctionvehicle_table_phone}><Link as={`/dashboard/users/update/${data.bidder.userId}`} href={`/dashboard/users/update?id=${data.bidder.userId}`} target="_blank"> {data.bidder.phone} </Link></TableCell>
                                      <TableCell align="center">{data.bidder.userId}</TableCell>
                                      <TableCell align="center">{data.price}</TableCell>
                                      <TableCell align="center">{bidTime}</TableCell>
                                      </TableRow>
                                  );
                                    
                                  })}
                      </TableBody>
                    </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={bidList.length}
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
    </>
  )
}

export default Bid