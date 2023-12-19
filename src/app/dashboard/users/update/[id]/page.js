"use client"
import React, { useState ,useEffect  } from 'react';
import ImageUploading from 'react-images-uploading';

import Image from 'next/image';
import dashboardStyles from '../../../dashboard.module.css';
import {Box,Grid,TextField,Button,Typography} from '@mui/material';
import '../../../../globals.css';
import Sidebar from '../../../../../../components/Sidebar';
import Header from '../../../../../../components/Header';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import {vehicleApi} from '../../../../../app/service/vehicle';
import { useRouter } from 'next/navigation';
import NativeSelect from '@mui/material/NativeSelect';




function Update({ params }) {  

  const router = useRouter()
  
  const [docId,setDocid]=useState(null);
  const [userList, setUserlist] = useState([]);
  const [userType, setUserType] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);

  //onboard dealer
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [panCardNumber, setPanCardNumber] = useState("");
  const [addressProofNumber, setAddressProofNumber] = useState("");
  const [tradeLicenseNumber, setTradeLicenseNumber] = useState("");
  const [cancelledChequeNumber, setCancelledChequeNumber] = useState("");

  //shop details
  const [shopPhone, setShopPhone] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressLine3, setAddressLine3] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // images

  const [PancardPhoto, setPancardPhoto] = useState("");
  const [AddressProofFrontPhoto, setAddressProofFrontPhoto] = useState("");
  const [AddressProofBackPhoto, setAddressProofBackPhoto] = useState("");
  const [TradeLicensePhoto, setTradeLicensePhoto] = useState("");
  const [CancelledChequePhoto, setCancelledChequePhoto] = useState("");
  const [ShopPhoto, setShopPhoto] = useState("");
  const [allImage, setAllImage] = useState([]);

  

  const [panImages, setPanImages] = useState([]);
  const [AddressProofFrontImages,setAddressProofFrontImages]=useState([]);
  const [AddressProofBackImages,setAddressProofBackImages]=useState([]);
  const [TradeLicenseImages,setTradeLicenseImages]=useState([]);
  const [CancelledChequeImages,setCancelledChequeImages]=useState([]);
  const [ShopImages,setShopImages]=useState([]);

 
  
  useEffect(() => {
    getUserbyId();
  },[]); 

  const getUserbyId = async () => {
    try {
      const data={docId:params.id};
        setDocid(params.id);
      const response = await vehicleApi.getUserbyId(data);
      const result=response.data.data;
            // console.log(response.data.data);
            
      if (response.data.status === 200) {
        
        setUserlist(response.data.data);
        setUserType(result.userTypeStatus);
        setPhone(result.phone);
        
        if(result.profile)
        {
          if(result.profile.firstName)
          {
            setFirstName(result.profile.firstName);
          }
          
          if(result.profile.lastName)
          {
            setLastName(result.profile.lastName);
          }
          
        }

        
        
        //dealer onboard
        if(result.dealerOnboardFormData.name)
        {
          setName(result.dealerOnboardFormData.name);
        }
        
        if(result.dealerOnboardFormData.email)
        {
          setEmail(result.dealerOnboardFormData.email);
        }
        if(result.dealerOnboardFormData.shopName)
        {
          setShopName(result.dealerOnboardFormData.shopName);
        }
        if(result.dealerOnboardFormData.shopAddress)
        {
          setShopAddress(result.dealerOnboardFormData.shopAddress);
        }
        if(result.dealerOnboardFormData.selectedState)
        {
          setSelectedState(result.dealerOnboardFormData.selectedState);
        }
        if(result.dealerOnboardFormData.selectedCity)
        {
          setSelectedCity(result.dealerOnboardFormData.selectedCity);
        }
        if(result.dealerOnboardFormData.pinCode)
        {
          setPinCode(result.dealerOnboardFormData.pinCode);
        }
        if(result.dealerOnboardFormData.panCardNumber)
        {
          setPanCardNumber(result.dealerOnboardFormData.panCardNumber);
        }
        if(result.dealerOnboardFormData.addressProofNumber)
        {
          setAddressProofNumber(result.dealerOnboardFormData.addressProofNumber);
        }
        
        if(result.dealerOnboardFormData.tradeLicenseNumber)
        {
          setTradeLicenseNumber(result.dealerOnboardFormData.tradeLicenseNumber);
        }
        if(result.dealerOnboardFormData.cancelledChequeNumber)
        {
          setCancelledChequeNumber(result.dealerOnboardFormData.cancelledChequeNumber);
        }
        

        
        //shop details
        if(result.shop)
        {
          if(result.shop.phone)
          {
            setShopPhone(result.shop.phone);
          }
          if(result.shop.gstNumber)
          {
            setGstNumber(result.shop.gstNumber);
          }
          
          if(result.shop.addresses!=null)
          {
            setAddressLine1(result.shop.addresses[0].addressLine1);
            setAddressLine2(result.shop.addresses[0].addressLine2);
            setAddressLine3(result.shop.addresses[0].addressLine3);
            setCity(result.shop.addresses[0].city);
            setState(result.shop.addresses[0].state);
            setPostalCode(result.shop.addresses[0].postalCode);
          }
        }
          
          
        
          
        
        //images
        
        // console.log(result.dealerOnboardFormData.docsImagePaths);
        if(result.dealerOnboardFormData?.docsImagePaths)
        {
          setAllImage(result.dealerOnboardFormData.docsImagePaths);
          if(result.dealerOnboardFormData.docsImagePaths.filter((item) => item.type == "pan"))
          {
            const pancardImage = result.dealerOnboardFormData.docsImagePaths.filter((item) => item.type == "pan");
            setPancardPhoto(pancardImage[0].path);
          }
          
          if(result.dealerOnboardFormData.docsImagePaths.filter((item) => item.type == "addressProofFront"))
          {
            const addressProofFrontImage = result.dealerOnboardFormData.docsImagePaths.filter((item) => item.type == "addressProofFront");
            setAddressProofFrontPhoto(addressProofFrontImage[0].path);
          }
          
          if(result.dealerOnboardFormData.docsImagePaths.filter((item) => item.type == "addressProofBack"))
          {
            const addressProofBackImage = result.dealerOnboardFormData.docsImagePaths.filter((item) => item.type == "addressProofBack");
            setAddressProofBackPhoto(addressProofBackImage[0].path);
          }
          
          if(result.dealerOnboardFormData.docsImagePaths.filter((item) => item.type == "tradeLicense"))
          {
            const tradeLicenseImage = result.dealerOnboardFormData.docsImagePaths.filter((item) => item.type == "tradeLicense");
            setTradeLicensePhoto(tradeLicenseImage[0].path);
          }
          
          if(result.dealerOnboardFormData.docsImagePaths.filter((item) => item.type == "cancelledCheque"))
          {
            const cancelledChequeImage = result.dealerOnboardFormData.docsImagePaths.filter((item) => item.type == "cancelledCheque");
            setCancelledChequePhoto(cancelledChequeImage[0].path);
          }
          
          if(result.dealerOnboardFormData.docsImagePaths.filter((item) => item.type == "shop"))
          {
            const shopImage = result.dealerOnboardFormData.docsImagePaths.filter((item) => item.type == "shop");
            setShopPhoto(shopImage[0].path);
          }
          
        }
        
        if(result.dealerOnboardFormData?.docImagePath)
        {
          setAllImage(result.dealerOnboardFormData.docImagePath);
          if(result.dealerOnboardFormData.docImagePath.filter((item) => item.type == "pan"))
          {
            const pancardImage = result.dealerOnboardFormData.docImagePath.filter((item) => item.type == "pan");
            setPancardPhoto(pancardImage[0].path);
          }
          
          if(result.dealerOnboardFormData.docImagePath.filter((item) => item.type == "addressProofFront"))
          {
            const addressProofFrontImage = result.dealerOnboardFormData.docImagePath.filter((item) => item.type == "addressProofFront");
            setAddressProofFrontPhoto(addressProofFrontImage[0].path);
          }
          
          if(result.dealerOnboardFormData.docImagePath.filter((item) => item.type == "addressProofBack"))
          {
            const addressProofBackImage = result.dealerOnboardFormData.docImagePath.filter((item) => item.type == "addressProofBack");
            setAddressProofBackPhoto(addressProofBackImage[0].path);
          }
          
          if(result.dealerOnboardFormData.docImagePath.filter((item) => item.type == "tradeLicense"))
          {
            const tradeLicenseImage = result.dealerOnboardFormData.docImagePath.filter((item) => item.type == "tradeLicense");
            setTradeLicensePhoto(tradeLicenseImage[0].path);
          }
          
          if(result.dealerOnboardFormData.docImagePath.filter((item) => item.type == "cancelledCheque"))
          {
            const cancelledChequeImage = result.dealerOnboardFormData.docImagePath.filter((item) => item.type == "cancelledCheque");
            setCancelledChequePhoto(cancelledChequeImage[0].path);
          }
          
          if(result.dealerOnboardFormData.docImagePath.filter((item) => item.type == "shop"))
          {
            const shopImage = result.dealerOnboardFormData.docImagePath.filter((item) => item.type == "shop");
            setShopPhoto(shopImage[0].path);
          }
          
        }

        
     
      } 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  

  

  const handleInput= async(e)=>{
    
    if (e.target.name === 'firstName') {
      setFirstName(e.target.value);
    }
    if (e.target.name === 'lastName') {
      setLastName(e.target.value);
    }
    if (e.target.name === 'userType') {
      setUserType(e.target.value);
    }
    // dealer onBoard
    if (e.target.name === 'name') {
      setName(e.target.value);
    }
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
    if (e.target.name === 'shopName') {
      setShopName(e.target.value);
    }
    if (e.target.name === 'shopAddress') {
      setShopAddress(e.target.value);
    }
    if (e.target.name === 'selectedState') {
      setSelectedState(e.target.value);
    }
    if (e.target.name === 'selectedCity') {
      setSelectedCity(e.target.value);
    }
    if (e.target.name === 'pinCode') {
      setPinCode(e.target.value);
    }
    if (e.target.name === 'panCardNumber') {
      setPanCardNumber(e.target.value);
    }
    if (e.target.name === 'addressProofNumber') {
      setAddressProofNumber(e.target.value);
    }
    if (e.target.name === 'tradeLicenseNumber') {
      setTradeLicenseNumber(e.target.value);
    }
    if (e.target.name === 'cancelledChequeNumber') {
      setCancelledChequeNumber(e.target.value);
    }

    // shop details
    if (e.target.name === 'shopPhone') {
      setShopPhone(e.target.value);
    }
    if (e.target.name === 'gstNumber') {
      setGstNumber(e.target.value);
    }
    if (e.target.name === 'addressLine1') {
      setAddressLine1(e.target.value);
    }
    if (e.target.name === 'addressLine2') {
      setAddressLine2(e.target.value);
    }
    if (e.target.name === 'addressLine3') {
      setAddressLine3(e.target.value);
    }
    if (e.target.name === 'city') {
      setCity(e.target.value);
    }
    if (e.target.name === 'state') {
      setState(e.target.value);
    }
    if (e.target.name === 'postalCode') {
      setPostalCode(e.target.value);
    }
    
  
    
    if (e.target.name === 'PancardPhoto' && e.target.files.length > 0) {
      // console.log(e.target.files);
      // console.log(e.target.files[0].size);
      if(e.target.files[0].size<2000000)
      {
          setPanImages([...panImages, e.target.files[0]]);
          uploadDealerDocumentImage(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 2MB!")
      }
    }

    if (e.target.name === 'AddressProofFrontPhoto' && e.target.files.length > 0) {
      // console.log(e.target.files);
      // console.log(e.target.files[0].size);
      if(e.target.files[0].size<2000000)
      {
        setAddressProofFrontImages([...AddressProofFrontImages, e.target.files[0]]);
          uploadDealerDocumentImage2(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 2MB!")
      }
    }

    if (e.target.name === 'AddressProofBackPhoto' && e.target.files.length > 0) {
      // console.log(e.target.files);
      // console.log(e.target.files[0].size);
      if(e.target.files[0].size<2000000)
      {
        setAddressProofBackImages([...AddressProofBackImages, e.target.files[0]]);
          uploadDealerDocumentImage3(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 2MB!")
      }
    }

    if (e.target.name === 'TradeLicensePhoto' && e.target.files.length > 0) {
      // console.log(e.target.files);
      // console.log(e.target.files[0].size);
      if(e.target.files[0].size<2000000)
      {
        setTradeLicenseImages([...TradeLicenseImages, e.target.files[0]]);
          uploadDealerDocumentImage4(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 2MB!")
      }
    }

    if (e.target.name === 'CancelledChequePhoto' && e.target.files.length > 0) {
      // console.log(e.target.files);
      // console.log(e.target.files[0].size);
      if(e.target.files[0].size<2000000)
      {
        setCancelledChequeImages([...CancelledChequeImages, e.target.files[0]]);
          uploadDealerDocumentImage5(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 2MB!")
      }
    }

    if (e.target.name === 'ShopPhoto' && e.target.files.length > 0) {
      // console.log(e.target.files);
      // console.log(e.target.files[0].size);
      if(e.target.files[0].size<2000000)
      {
        setShopImages([...ShopImages, e.target.files[0]]);
          uploadDealerDocumentImage6(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 2MB!")
      }
    }

  }

  // const handleRemoveImage = async (id) => {
  //   setThumbnailPhotos(ThumbnailPhotos.filter((element) => element.name !== id.name));
  //   setExteriorPhotos(ExteriorPhotos.filter((element) => element.name !== id.name));
  //   setInteriorPhotos(InteriorPhotos.filter((element) => element.name !== id.name));
  //   setEnginePhotos(EnginePhotos.filter((element) => element.name !== id.name));
  //   setTyresPhotos(TyresPhotos.filter((element) => element.name !== id.name));
  //   setDentsPhotos(DentsPhotos.filter((element) => element.name !== id.name));
  // };

const uploadDealerDocumentImage= async (data)=>{
  const formData = new FormData();
    formData.append('file', data);
    formData.append('type', 'pan');
  const response = await vehicleApi.uploadDealerDocumentImage(formData);
  if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
    // console.log(response.data.data);
    const keyToRemove = 'type';
    const valueToRemove = 'pan'
    const newArray = allImage.filter(obj => obj[keyToRemove] !== valueToRemove);
    setAllImage([...newArray, response.data.data]);

  }
}
const uploadDealerDocumentImage2= async (data)=>{
  const formData = new FormData();
    formData.append('file', data);
    formData.append('type', 'addressProofFront');
  const response = await vehicleApi.uploadDealerDocumentImage(formData);
  if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
    // console.log(response.data.data);
    const keyToRemove = 'type';
    const valueToRemove = 'addressProofFront'
    const newArray = allImage.filter(obj => obj[keyToRemove] !== valueToRemove);
    setAllImage([...newArray, response.data.data]);
  }
}

const uploadDealerDocumentImage3= async (data)=>{
  const formData = new FormData();
    formData.append('file', data);
    formData.append('type', 'addressProofBack');
  const response = await vehicleApi.uploadDealerDocumentImage(formData);
  if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
    // console.log(response.data.data);
    const keyToRemove = 'type';
    const valueToRemove = 'addressProofBack'
    const newArray = allImage.filter(obj => obj[keyToRemove] !== valueToRemove);
    setAllImage([...newArray, response.data.data]);
  }
}

const uploadDealerDocumentImage4= async (data)=>{
  const formData = new FormData();
    formData.append('file', data);
    formData.append('type', 'tradeLicense');
  const response = await vehicleApi.uploadDealerDocumentImage(formData);
  if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
    // console.log(response.data.data);
    const keyToRemove = 'type';
    const valueToRemove = 'tradeLicense'
    const newArray = allImage.filter(obj => obj[keyToRemove] !== valueToRemove);
    setAllImage([...newArray, response.data.data]);
  }
}

const uploadDealerDocumentImage5= async (data)=>{
  const formData = new FormData();
    formData.append('file', data);
    formData.append('type', 'cancelledCheque');
  const response = await vehicleApi.uploadDealerDocumentImage(formData);
  if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
    // console.log(response.data.data);
    const keyToRemove = 'type';
    const valueToRemove = 'cancelledCheque'
    const newArray = allImage.filter(obj => obj[keyToRemove] !== valueToRemove);
    setAllImage([...newArray, response.data.data]);
  }
}

const uploadDealerDocumentImage6= async (data)=>{
  const formData = new FormData();
    formData.append('file', data);
    formData.append('type', 'shop');
  const response = await vehicleApi.uploadDealerDocumentImage(formData);
  if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
    // console.log(response.data.data);
    const keyToRemove = 'type';
    const valueToRemove = 'shop'
    const newArray = allImage.filter(obj => obj[keyToRemove] !== valueToRemove);
    setAllImage([...newArray, response.data.data]);
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // console.log(allImage);

    const formData={docId,allImage,userType,firstName,lastName,phone,name,email,shopName,shopAddress,selectedState,selectedCity,pinCode,panCardNumber,addressProofNumber,tradeLicenseNumber,cancelledChequeNumber,shopPhone,gstNumber,addressLine1,addressLine2,addressLine3,city,state,postalCode};
    
    // console.log(formData);
    
    const response = await vehicleApi.updateUser(formData);
    if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
      // setPopupopen(true);
      confirm("user updated successfully");
      router.push("/dashboard/users");
    }

    
  };
    


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

  return (
    <>
      <Box className={dashboardStyles.tm_dashboard_main}>        
        <Grid container> 
          <Sidebar/>         
          <Grid item md={10}>
            <Box className={dashboardStyles.tm_dashboard_rightbar_main}>
              <Header/>
              <Box className={dashboardStyles.tm_dashboard_rightbar_form_main}>
                <Box className={dashboardStyles.tm_dashboard_rightbar_form_title}>
                  <Typography variant='h3'>Update User  </Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Phone" onChange={handleInput} value={userList.phone} type="string" variant="outlined" 
                    InputLabelProps={{shrink: true,}} disabled fullWidth/>
                    </Box>
                  </Grid>

                  <Grid item md={12}>
                  <Typography>Customer Details</Typography>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="First Name" name='firstName' onChange={handleInput} value={firstName} type="string" variant="outlined" 
                    InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Last Name" name='lastName' onChange={handleInput} value={lastName} type="string" variant="outlined" 
                    InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                  <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        {/* <InputLabel id="demo-simple-select-label">Select User Type *</InputLabel> */}
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={userType}
                          label="Select User Type *"
                          onChange={handleInput}
                          name='userType'
                          required
                          InputLabelProps={{shrink: true,}}
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
                  <Grid item md={12}>
                  <Typography>Dealer Details</Typography>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Name" name='name' onChange={handleInput} value={name} type="string" variant="outlined" InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Email" name='email' onChange={handleInput} value={email} type="string" variant="outlined" InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Shop Name" name='shopName' onChange={handleInput} value={shopName} type="string" variant="outlined" InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Shop Adress" name='shopAddress' onChange={handleInput} value={shopAddress} type="string" variant="outlined" InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="State" name='selectedState' onChange={handleInput} value={selectedState} type="string" variant="outlined" InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="City" name='selectedCity' onChange={handleInput} value={selectedCity} type="string" variant="outlined" InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Pincode" name='pinCode' onChange={handleInput} value={pinCode} type="string" variant="outlined" InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="PAN Card Number" name='panCardNumber' onChange={handleInput} value={panCardNumber} type="string" variant="outlined" InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Address Proof Number" name='addressProofNumber' onChange={handleInput} value={addressProofNumber} type="string" variant="outlined" InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Trade License Number" name='tradeLicenseNumber' onChange={handleInput} value={tradeLicenseNumber} type="string" variant="outlined" InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Cancelled Cheque Number" name='cancelledChequeNumber' onChange={handleInput} value={cancelledChequeNumber} type="string" variant="outlined" InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={12}>
                  <Box className={`${dashboardStyles.tm_dashboard_img_upl} ${"tm_dashboard_img_upl_gb"}`}>
                  <Box className={dashboardStyles.tm_dashboard_img_upl_title}>
                    <Typography variant='h4'>Upload images</Typography>
                  </Box>
                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>PAN Card Photo (Upload only 1 Photo)</Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='PancardPhoto' hidden />
                          </Button>
                        </Box>                        
                      </Grid>
                      <Grid item md={9}>
                      
                      <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                        <Box >
                          <Image
                            src={PancardPhoto}
                            alt='PAN Card Image'
                            height='300'
                            width='300'
                          />
                          {/* <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button> */}
                        </Box>
                      </Box>

                        {panImages.length > 0 &&
                          panImages.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={URL.createObjectURL(element)}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  {/* <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button> */}
                                </Box>
                              </Box>
                            );
                          })}
                        </Grid>
                      </Grid>
                  </Box>

                

                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Address Proof Front Photo (Upload only 1 Photo)</Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='AddressProofFrontPhoto' hidden />
                          </Button>
                        </Box>                        
                      </Grid>

                      <Grid item md={9}>
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                          <Box>
                            <Image
                              src={AddressProofFrontPhoto}
                              alt='Uploaded Image'
                              height='300'
                              width='300'
                            />
                            {/* <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button> */}
                          </Box>
                        </Box>

                        {AddressProofFrontImages.length > 0 &&
                          AddressProofFrontImages.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box>
                                  <Image
                                    src={URL.createObjectURL(element)}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  {/* <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button> */}
                                </Box>
                              </Box>
                            );
                          })}
                        </Grid>
                      </Grid>
                  </Box>

                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Address Proof Back Photo(Upload only 1 Photo)</Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='AddressProofBackPhoto' hidden />
                          </Button>
                        </Box>                        
                      </Grid>
                      <Grid item md={9}>
                        <Box  className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                          <Box >
                            <Image
                              src={AddressProofBackPhoto}
                              alt='Uploaded Image'
                              height='300'
                              width='300'
                            />
                            {/* <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button> */}
                          </Box>
                        </Box>

                        {AddressProofBackImages.length > 0 &&
                          AddressProofBackImages.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={URL.createObjectURL(element)}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  {/* <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button> */}
                                </Box>
                              </Box>
                            );
                          })}
                        </Grid>
                      </Grid>
                  </Box>

                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Cancel Cheque Photo(Upload only 1 Photo)</Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='CancelledChequePhoto' hidden />
                          </Button>
                        </Box>                        
                      </Grid>
                      <Grid item md={9}>
                              <Box  className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={CancelledChequePhoto}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  {/* <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button> */}
                                </Box>
                              </Box>

                              {CancelledChequeImages.length > 0 &&
                                  CancelledChequeImages.map((element, index) => {
                                    return (
                                      <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                        <Box >
                                          <Image
                                            src={URL.createObjectURL(element)}
                                            alt='Uploaded Image'
                                            height='300'
                                            width='300'
                                          />
                                          {/* <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button> */}
                                        </Box>
                                      </Box>
                                    );
                                  })}
                        
                        </Grid>
                      </Grid>
                  </Box>

                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Trade License Photo (Upload only 1 Photo)</Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='TradeLicensePhoto' hidden />
                          </Button>
                        </Box>                        
                      </Grid>
                      <Grid item md={9}>
                              <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={TradeLicensePhoto}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  {/* <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button> */}
                                </Box>
                              </Box>
                        {TradeLicenseImages.length > 0 &&
                          TradeLicenseImages.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={URL.createObjectURL(element)}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  {/* <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button> */}
                                </Box>
                              </Box>
                            );
                          })}
                        </Grid>
                      </Grid>
                  </Box>

                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Shop Photo (Upload only 1 Photo)</Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='ShopPhoto' hidden />
                          </Button>
                        </Box>                        
                      </Grid>
                      <Grid item md={9}>
                      
                      <Box  className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                        <Box >
                          <Image
                            src={ShopPhoto}
                            alt='Uploaded Image'
                            height='300'
                            width='300'
                          />
                          {/* <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button> */}
                        </Box>
                      </Box>
                            
                        {ShopImages.length > 0 &&
                          ShopImages.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={URL.createObjectURL(element)}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  {/* <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button> */}
                                </Box>
                              </Box>
                            );
                          })}
                        </Grid>
                      </Grid>
                  </Box>

                
                  
                </Box>
                  </Grid>

                  <Grid item md={12}>
                  <Typography>Shop Details</Typography>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Shop Phone No" name='shopPhone' onChange={handleInput} value={shopPhone} type="string" variant="outlined" InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="GST No" name='gstNumber' onChange={handleInput} value={gstNumber} type="string" variant="outlined" InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Address Line 1" name='addressLine1' onChange={handleInput} value={addressLine1} type="string" variant="outlined" InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Address Line 2" name='addressLine2' onChange={handleInput} value={addressLine2} type="string" variant="outlined" InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Address Line 3" name='addressLine3' onChange={handleInput} value={addressLine3} type="string" variant="outlined" InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="City" name='city' onChange={handleInput} value={city} type="string" variant="outlined" InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="State" name='state' onChange={handleInput} value={state} type="string" variant="outlined" InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Postal Code" name='postalCode' onChange={handleInput} value={postalCode} type="string" variant="outlined" InputLabelProps={{shrink: true,}} fullWidth/>
                    </Box>
                  </Grid>
                  
                  
        
                  
                  
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
       
      </Box>
    </>
  )
}

export default Update