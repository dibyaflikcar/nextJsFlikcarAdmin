"use client"
import React, { useState ,useEffect  } from 'react';
import ImageUploading from 'react-images-uploading';

import Image from 'next/image';
import dashboardStyles from '../../dashboard.module.css';
import {Box,Grid,TextField,Button,Typography} from '@mui/material';
import '../../../globals.css';
import Sidebar from '../../../../../components/Sidebar';
import Header from '../../../../../components/Header';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import { Margin } from '@mui/icons-material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {vehicleApi} from '../../../../app/service/vehicle';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




function Create() {  
  // const [open, setOpen] = React.useState(false);
  // const anchorRef = React.useRef(null);
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  

  const [brandlist, setBrandlist] = useState([]);
  const [brand, setBrand] = useState("");
  const [modellist, setModelList] = useState([]);
  const [model, setModel] = useState("");
  const [variantList, setVariantList] = useState([]);
  const [variant, setVariant] = useState("");
  
  const [years, setYears] = useState([]);
  const [regYear, setregYear] = useState("");
  const [bodyTypelist, setbodyTypelist]=useState([]);
  const [bodyType, setbodyType]=useState("");
  const [fuelTypelist, setfuelTypelist]=useState([]);
  const [fuelType, setfuelType]=useState("");
  const [transmission, setTransmission]=useState("");
  const [ownerTypelist, setownerTypelist]=useState([]);
  const [ownerType, setownerType]=useState("");
  const [colorList, setcolorList]=useState([]);
  const [color, setColor]=useState("");
  const [rtoList, setrtoList]=useState([]);
  const [rto, setRto]=useState("");
  const [kmsDriven, setkmsDriven]=useState("");
  const [carPrice, setcarPrice]=useState();
  const [description, setDescription]=useState("");
  const [seatList, setseatList]=useState([]);
  const [seat, setSeat]=useState("");

  const [mileage, setMileage]=useState("");
  const [engine, setEngine]=useState("");
  const [maxPower, setmaxPower]=useState("");
  const [maxTorque, setMaxTorque]=useState("");
  const [noc, setNoc]=useState("");
  const [mfgYear, setmfgYear]=useState("");
  const [inspectionReport, setInspectionReport]=useState("");
  const [insuranceValidity, setInsuranceValidity]=useState(null);
  const [roadTaxValidity, setRoadTaxValidity]=useState(null);
  const [inspectionScore, setInspectionScore]=useState("");

  const [comforts, setComforts] = useState([]);
  const [safety, setSafety] = useState([]);
  const [interior, setInterior] = useState([]);
  const [exterior, setExterior] = useState([]);
  const [entertainment, setEntertainment] = useState([]);

  const [comfortList, setComfortList] = useState([]);
  const [safetyList, setSafetyList] = useState([]);
  const [interiorList, setInteriorList] = useState([]);
  const [exteriorList, setExteriorList] = useState([]);
  const [entertainmentList, setEntertainmentList] = useState([]);

  const [popupOpen, setPopupopen] = useState(false);
  const [ThumbnailPhotos, setThumbnailPhotos] = useState([]);
  const [ExteriorPhotos , setExteriorPhotos] = useState([]);
  
  
  useEffect(() => {
    getMakeModel();
    getBodytype();
    getFueltype();
    getOwnertype();
    getColor();
    getRto();
    getSeat();
    // setComforts([]);
    // setSafety([]);
    // setInterior([]);
    // setExterior([]);
    // setEntertainment([]);

    getCarFeatureList([]);
  
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    const yearsArray = [];
    for (let year = startYear; year <= currentYear; year++) {
      yearsArray.push(year);
    }
    setYears(yearsArray);

  }, []); 

  const getMakeModel = async () => {
    try {
      const response = await vehicleApi.getMakeModel();
            // console.log(response.data.data);
      if (response.data.status === 200) {
        setBrandlist(response.data.data);
        // console.log(response.data.data);
      } 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getBodytype = async () => {
    try {
      const response = await vehicleApi.getBodytype();
            // console.log(response.data.data);
      if (response.data.status === 200) {
        setbodyTypelist(response.data.data);
        // console.log(response.data);
      } 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getFueltype = async () => {
    try {
      const response = await vehicleApi.getFueltype();
            // console.log(response.data.data);
      if (response.data.status === 200) {
        setfuelTypelist(response.data.data);
        // console.log(response.data);
      } 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getOwnertype = async () => {
    try {
      const response = await vehicleApi.getOwnertype();
            // console.log(response.data.data);
      if (response.data.status === 200) {
        setownerTypelist(response.data.data);
        // console.log(response.data);
      } 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getColor = async () => {
    try {
      const response = await vehicleApi.getColor();
            // console.log(response.data.data);
      if (response.data.status === 200) {
        setcolorList(response.data.data);
        // console.log(response.data);
      } 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getRto = async () => {
    try {
      const response = await vehicleApi.getRto();
            // console.log(response.data.data);
      if (response.data.status === 200) {
        setrtoList(response.data.data);
        // console.log(response.data);
      } 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getSeat = async () => {
    try {
      const response = await vehicleApi.getSeat();
            // console.log(response.data.data);
      if (response.data.status === 200) {
        setseatList(response.data.data);
        // console.log(response.data);
      } 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getCarFeatureList = async () => {
    try {
      const response = await vehicleApi.getCarFeature();
            // console.log(response.data.data);
      if (response.data.status === 200) {
        setComfortList(response.data.data[0].labels);
        setSafetyList(response.data.data[1].labels);
        setInteriorList(response.data.data[2].labels);
        setExteriorList(response.data.data[3].labels);
        setEntertainmentList(response.data.data[4].labels);
        // console.log(response.data.data[0].labels);
      } 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  

  const handleInput= async(e)=>{
    
    if (e.target.name === 'brand') {
      setBrand(e.target.value);
    
      const filteredResult = brandlist.filter((item) => item.id == e.target.value);
      // console.log(filteredResult[0].models);
      setModelList(filteredResult[0].data.models);
    }
    if (e.target.name === 'model') {
      setModel(e.target.value);
    
      const filteredResult = modellist.filter((item) => item.name == e.target.value);
      // console.log(filteredResult[0].variants.length);
      if(filteredResult[0].variants.length>0)
      {
        setVariantList(filteredResult[0].variants);
      }
      
    }
    if(e.target.name === "variant")
    {
      setVariant(e.target.value);
    }
    if (e.target.name === 'regYear') {
      setregYear(e.target.value);
    }
    if (e.target.name === 'bodyType') {
      setbodyType(e.target.value);
    }
    if (e.target.name === 'fuelType') {
      setfuelType(e.target.value);
    }
    if (e.target.name === 'transmission') {
      setTransmission(e.target.value);
    }
    if (e.target.name === 'ownerType') {
      setownerType(e.target.value);
    }
    if (e.target.name === 'color') {
      setColor(e.target.value);
    }
    if (e.target.name === 'rto') {
      setRto(e.target.value);
    }
    if (e.target.name === 'kmsDriven') {
      setkmsDriven(e.target.value);
    }
    if (e.target.name === 'carPrice') {
      setcarPrice(e.target.value);
    }
    if (e.target.name === 'description') {
      setDescription(e.target.value);
    }
    if (e.target.name === 'seat') {
      setSeat(e.target.value);
    }
    if (e.target.name === 'mileage') {
      setMileage(e.target.value);
    }
    if (e.target.name === 'engine') {
      setEngine(e.target.value);
    }
    if (e.target.name === 'maxPower') {
      setmaxPower(e.target.value);
    }
    if (e.target.name === 'maxTorque') {
      setMaxTorque(e.target.value);
    }
    if (e.target.name === 'noc') {
      setNoc(e.target.value);
    }
    if (e.target.name === 'mfgYear') {
      setmfgYear(e.target.value);
    }
    if (e.target.name === 'inspectionReport') {
      setInspectionReport(e.target.value);
    }
    // if (e.target.name === 'insuranceValidity') {
    //   setInsuranceValidity(e.target.value);
    // }
    // if (e.target.name === 'roadTaxValidity') {
    //   setRoadTaxValidity(e.target.value);
    // }
    if (e.target.name === 'inspectionScore') {
      setInspectionScore(e.target.value);
    }
    if (e.target.name === 'comforts') {
      if (e.target.checked) {
        setComforts([...comforts, e.target.value]);
      } else {
        setComforts(comforts.filter((element) => Number(element) !== Number(e.target.value)));
      }
    }

    if (e.target.name === 'safety') {
      if (e.target.checked) {
        setSafety([...safety, e.target.value]);
      } else {
        setSafety(safety.filter((element) => Number(element) !== Number(e.target.value)));
      }
    }

    if (e.target.name === 'interior') {
      if (e.target.checked) {
        setInterior([...interior, e.target.value]);
      } else {
        setInterior(interior.filter((element) => Number(element) !== Number(e.target.value)));
      }
    }

    if (e.target.name === 'exterior') {
      if (e.target.checked) {
        setExterior([...exterior, e.target.value]);
      } else {
        setExterior(exterior.filter((element) => Number(element) !== Number(e.target.value)));
      }
    }

    if (e.target.name === 'entertainment') {
      if (e.target.checked) {
        setEntertainment([...entertainment, e.target.value]);
      } else {
        setEntertainment(entertainment.filter((element) => Number(element) !== Number(e.target.value)));
      }
    }

    if (e.target.name === 'ThumbnailPhotos' && e.target.files.length > 0) {
      // console.log(e.target.files);
      setThumbnailPhotos([...ThumbnailPhotos, e.target.files[0]]);
    }

    if (e.target.name === 'ExteriorPhotos' && e.target.files.length > 0) {
      // console.log(e.target.files);
      setExteriorPhotos([...ExteriorPhotos, e.target.files[0]]);
    }


  }

  const handleRemoveImage = async (id) => {
    setThumbnailPhotos(ThumbnailPhotos.filter((element) => element.name !== id.name));
    setExteriorPhotos(ExteriorPhotos.filter((element) => element.name !== id.name));
  };

  const handleInsuranceDate = (newDate) => {
    setInsuranceValidity(newDate);
  };
  const handleRoadTaxValidityDate = (newDate) => {
    setRoadTaxValidity(newDate);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    const formData = new FormData();
    formData.append('brand', brand);
    formData.append('model', model);
    formData.append('variant', variant);
    formData.append('regYear', regYear);
    formData.append('bodyType', bodyType);
    formData.append('fuelType', fuelType);
    formData.append('transmission', transmission);
    formData.append('ownerType', ownerType);
    formData.append('color', color);
    formData.append('rto', rto);
    formData.append('kmsDriven', kmsDriven);
    formData.append('carPrice', carPrice);
    formData.append('description', description);
    formData.append('seat', seat);
    formData.append('mileage', mileage);
    formData.append('engine', engine);
    formData.append('maxPower', maxPower);
    formData.append('maxTorque', maxTorque);
    formData.append('noc', noc);
    formData.append('mfgYear', mfgYear);
    formData.append('inspectionReport', inspectionReport);
    formData.append('insuranceValidity', insuranceValidity);
    formData.append('roadTaxValidity', roadTaxValidity);
    formData.append('inspectionScore', inspectionScore);
    formData.append('comforts', comforts);
    formData.append('safety', safety);
    formData.append('interior', interior);
    formData.append('exterior', exterior);
    formData.append('entertainment', entertainment);
    // console.log(ThumbnailPhotos);
    ThumbnailPhotos.map((element, index) => {
      formData.append(`ThumbnailPhotos`, element);
    });

    
    ExteriorPhotos.map((element, index) => {
      formData.append(`ExteriorPhotos`, element);
    });

    // console.log(ThumbnailPhotos , ExteriorPhotos);
    
    const response = await vehicleApi.addAuctionVehicle(formData);
    // console.log(response);
    if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
    //   // console.log("ok");
      setPopupopen(true);

    }
  };
    

  // const getModelList = async (brandId) => {
  //   // setModel('');
  //   // setVariantList([]);
  //   const response = await vehicleApi.getModel(brandId);
  //   if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
  //     setModelList(response.data);
  //     console.log(response.data);
  //   }
  // };

  

  // return focus to the button when we transitioned from !open -> open
  // const prevOpen = React.useRef(open);
  // React.useEffect(() => {
  //   if (prevOpen.current === true && open === false) {
  //     anchorRef.current.focus();
  //   }
  //   prevOpen.current = open;
  // }, [open]);

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
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

   
    

// Interior Photos  
    const [InteriorPhotos  , setInteriorPhotos ] = React.useState([]);
    const InteriorPhotosNumber = 10;
  
    const InteriorPhotosonChange = (imageList, addUpdateIndex) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setInteriorPhotos (imageList);
    };
// Engine Photos  
    const [EnginePhotos  , setEnginePhotos ] = React.useState([]);
    const EnginePhotosNumber = 10;
  
    const EnginePhotosonChange = (imageList, addUpdateIndex) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setEnginePhotos (imageList);
    }
// Tyres Photos 
    const [TyresPhotos  , setTyresPhotos ] = React.useState([]);
    const TyresPhotosNumber = 10;
  
    const TyresPhotosonChange = (imageList, addUpdateIndex) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setTyresPhotos (imageList);
    };
// Dents Photos
const [DentsPhotos  , setDentsPhotos ] = React.useState([]);
const DentsPhotosNumber = 10;

const DentsPhotosonChange = (imageList, addUpdateIndex) => {
  // data for submit
  console.log(imageList, addUpdateIndex);
  setDentsPhotos (imageList);
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
                  <Typography variant='h3'>List your car!</Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select brand *</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={brand}
                          label="Select brand *"
                          onChange={handleInput}
                          name='brand'
                          required
                        >
                          {brandlist.length > 0 && brandlist.map((data,key) => (
                            <MenuItem key={key} value={data.id}>{data.id}</MenuItem>
                          ))}
                          
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select model</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={model}
                          label="Select model"
                          onChange={handleInput}
                          name='model'
                          required
                        >
                          {modellist.length > 0 && modellist.map((data,key) => (
                            <MenuItem key={key} value={data.name}>{data.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select variant</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={variant}
                          label="Select variant"
                          onChange={handleInput}
                          name='variant'
                          required
                        >
                          
                          {variantList.length > 0 && variantList.map((data,key) => (
                            <MenuItem key={key} value={data}>{data}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Registration Year</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={regYear}
                          label="Registration Year"
                          onChange={handleInput}
                          name='regYear'
                          required
                        >
                          {years.map((year) => (
                              <MenuItem key={year} value={year}>{year}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select body type</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={bodyType}
                          label="Select body type"
                          onChange={handleInput}
                          name='bodyType'
                        >
                          {bodyTypelist.length > 0 && bodyTypelist.map((data,key) => (
                            <MenuItem key={key} value={data.name}>{data.name}</MenuItem>
                          ))}
                          
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select fuel type</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={fuelType}
                          label="Select body type"
                          onChange={handleInput}
                          name='fuelType'
                        >
                          {fuelTypelist.length > 0 && fuelTypelist.map((data,key) => (
                            <MenuItem key={key} value={data.name}>{data.name}</MenuItem>
                          ))}
                          
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select transmission*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={transmission}
                          label="Select Transmission"
                          onChange={handleInput}
                          name='transmission'
                        >
                          <MenuItem value="Manual">Manual</MenuItem>
                          <MenuItem value="Automatic">Automatic</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>                  
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select owner type*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={ownerType}
                          label="Select Owner type"
                          onChange={handleInput}
                          name='ownerType'
                        >
                          {ownerTypelist.length > 0 && ownerTypelist.map((data,key) => (
                            <MenuItem key={key} value={data.type}>{data.type}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select color*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={color}
                          label="Select color"
                          onChange={handleInput}
                          name='color'
                        >
                          {colorList.length > 0 && colorList.map((data,key) => (
                            <MenuItem key={key} value={data.name}>{data.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select RTO*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={rto}
                          label="Select RTO"
                          onChange={handleInput}
                          name='rto'
                        >
                          {rtoList.length > 0 && rtoList.map((data,key) => (
                            <MenuItem key={key} value={data.name}>{data.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Kilometers Driven*" onChange={handleInput} name='kmsDriven' value={kmsDriven} variant="outlined" required fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Your Selling Price*" onChange={handleInput} name='carPrice' value={carPrice} variant="outlined" required fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={12}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Description*" onChange={handleInput} name='description' value={description} variant="outlined" required fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Seating Capacity *</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={seat}
                            label="Seating Capacity*"
                            onChange={handleInput}
                            name='seat'
                          >
                            {seatList.length > 0 && seatList.map((data,key) => (
                            <MenuItem key={key} value={data.noOfSeats}>{data.noOfSeats}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>   
                    
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="Mileage in kmpl*" onChange={handleInput} name='mileage' value={mileage} variant="outlined" fullWidth/>
                      </Box>
                  </Grid>                 
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="Engine (CC)*" onChange={handleInput} name='engine' value={engine} variant="outlined" fullWidth/>
                      </Box>
                  </Grid>
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="Max Power*" onChange={handleInput} name='maxPower' value={maxPower} variant="outlined" fullWidth/>
                      </Box>
                  </Grid>
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="Max Torque*" onChange={handleInput} name='maxTorque' value={maxTorque} variant="outlined" fullWidth/>
                      </Box>
                  </Grid>
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      
                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Noc</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={noc}
                            label="Noc"
                            onChange={handleInput}
                            name='noc'
                          >
                            
                            <MenuItem value='true'>True</MenuItem>
                            <MenuItem value='false'>False</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                  </Grid>
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="MFG Year*" name='mfgYear' onChange={handleInput} value={mfgYear} variant="outlined" fullWidth/>
                      </Box>
                  </Grid>
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="Inspection Report*" onChange={handleInput} name='inspectionReport' value={inspectionReport} variant="outlined" fullWidth/>
                      </Box>
                  </Grid>
                  <Grid item md={3}>
                        <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_date} ${"tm_dashboard_rightbar_form_date_gb"} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                          <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['DatePicker']}>
                              <DatePicker label="Insurance Validity" onChange={handleInsuranceDate} value={insuranceValidity} sx={{width:'100%'}}/>
                            </DemoContainer>
                          </LocalizationProvider>
                        </Box>
                    </Grid>
                    <Grid item md={3}>
                        <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_date} ${"tm_dashboard_rightbar_form_date_gb"} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                              <DatePicker label="Road Tax Validity" onChange={handleRoadTaxValidityDate} value={roadTaxValidity} sx={{width:'100%'}}/>
                            </DemoContainer>
                          </LocalizationProvider>
                        </Box>
                    </Grid>
                    {/* <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_date_time} ${"tm_dashboard_rightbar_form_date_time_gb"} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker label="Basic date time picker" />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Box>
                    </Grid> */}
        
                  
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Inspection Score</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={inspectionScore}
                            label="Seating Capacity*"
                            onChange={handleInput}
                            name='inspectionScore'
                          >
                            
                            <MenuItem value='1'>1</MenuItem>
                            <MenuItem value='2'>2</MenuItem>
                            <MenuItem value='3'>3</MenuItem>
                            <MenuItem value='4'>4</MenuItem>
                            <MenuItem value='5'>5</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                      
                  </Grid>
                  
                </Grid>
                <Box className={`${dashboardStyles.tm_dashboard_img_upl} ${"tm_dashboard_img_upl_gb"}`}>
                  <Box className={dashboardStyles.tm_dashboard_img_upl_title}>
                    <Typography variant='h4'>Upload images</Typography>
                  </Box>
                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Add Thumbnail Photos (Upload only 1 Photo)</Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='ThumbnailPhotos' hidden />
                          </Button>
                        </Box>                        
                      </Grid>
                      <Grid item md={9}>
                        {ThumbnailPhotos.length > 0 &&
                          ThumbnailPhotos.map((element, index) => {
                            return (
                              <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box key={index}>
                                  <img
                                    key={index}
                                    src={URL.createObjectURL(element)}
                                    alt='Uploaded Image'
                                    height='300'
                                  />
                                  <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
                        </Grid>
                      </Grid>
                  </Box>
                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Add Exterior Photos (Upload only 5 Photo)</Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='ExteriorPhotos' hidden />
                          </Button>
                        </Box>                        
                      </Grid>
                      <Grid item md={9}>
                        {ExteriorPhotos.length > 0 &&
                          ExteriorPhotos.map((element, index) => {
                            return (
                              <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box key={index}>
                                  <img
                                    key={index}
                                    src={URL.createObjectURL(element)}
                                    alt='Uploaded Image'
                                    height='300'
                                  />
                                  <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
                        </Grid>
                      </Grid>
                  </Box>
                
                  {/* <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Add Interior Photos (maximum Upload upto 10 Photos)</Typography>
                    </Box>
                    <ImageUploading
                      multiple
                      value={InteriorPhotos}
                      onChange={InteriorPhotosonChange}
                      maxNumber={InteriorPhotosNumber}
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                          <Grid container spacing={4}>
                            <Grid item md={3}> 
                              <Box className={dashboardStyles.tm_dashboard_img_upl_btns}>
                                <button
                                  style={isDragging ? { color: 'red' } : undefined}
                                  onClick={onImageUpload}
                                  {...dragProps}
                                >
                                  Click or Drop here
                                </button>
                                <button onClick={onImageRemoveAll}>Remove all images</button>
                              </Box>
                              
                            </Grid>
                            <Grid item md={9}>
                              <Box className="tm_image_item_main">
                                {imageList.map((image, index) => (                          
                                  <Box key={index} className="image-item">
                                      <Image src={image['data_url']} alt="" width="100" />
                                      <Box className="image-item__btn-wrapper">
                                        <button className='tm_image_item_main_update_btn' onClick={() => onImageUpdate(index)}>Update</button>
                                        <button className='tm_image_item_main_remove_btn' onClick={() => onImageRemove(index)}><CloseIcon/></button>
                                      </Box>                            
                                  </Box>
                                ))}
                              </Box>
                            </Grid>
                          </Grid>
                          
                          
                        </div>
                      )}
                    </ImageUploading>
                  </Box> */}
                  {/* <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Add Engine Photos (maximum Upload upto 10 Photos)</Typography>
                    </Box>
                    <ImageUploading
                      multiple
                      value={EnginePhotos}
                      onChange={EnginePhotosonChange}
                      maxNumber={EnginePhotosNumber}
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                          <Grid container spacing={4}>
                            <Grid item md={3}> 
                              <Box className={dashboardStyles.tm_dashboard_img_upl_btns}>
                                <button
                                  style={isDragging ? { color: 'red' } : undefined}
                                  onClick={onImageUpload}
                                  {...dragProps}
                                >
                                  Click or Drop here
                                </button>
                                <button onClick={onImageRemoveAll}>Remove all images</button>
                              </Box>
                              
                            </Grid>
                            <Grid item md={9}>
                              <Box className="tm_image_item_main">
                                {imageList.map((image, index) => (                          
                                  <Box key={index} className="image-item">
                                      <Image src={image['data_url']} alt="" width="100" />
                                      <Box className="image-item__btn-wrapper">
                                        <button className='tm_image_item_main_update_btn' onClick={() => onImageUpdate(index)}>Update</button>
                                        <button className='tm_image_item_main_remove_btn' onClick={() => onImageRemove(index)}><CloseIcon/></button>
                                      </Box>                            
                                  </Box>
                                ))}
                              </Box>
                            </Grid>
                          </Grid>
                          
                          
                        </div>
                      )}
                    </ImageUploading>
                  </Box> */}
                  {/* <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Add Tyres Photos (maximum Upload upto 10 Photos)</Typography>
                    </Box>
                    <ImageUploading
                      multiple
                      value={TyresPhotos}
                      onChange={TyresPhotosonChange}
                      maxNumber={TyresPhotosNumber}
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                          <Grid container spacing={4}>
                            <Grid item md={3}> 
                              <Box className={dashboardStyles.tm_dashboard_img_upl_btns}>
                                <button
                                  style={isDragging ? { color: 'red' } : undefined}
                                  onClick={onImageUpload}
                                  {...dragProps}
                                >
                                  Click or Drop here
                                </button>
                                <button onClick={onImageRemoveAll}>Remove all images</button>
                              </Box>
                              
                            </Grid>
                            <Grid item md={9}>
                              <Box className="tm_image_item_main">
                                {imageList.map((image, index) => (                          
                                  <Box key={index} className="image-item">
                                      <Image src={image['data_url']} alt="" width="100" />
                                      <Box className="image-item__btn-wrapper">
                                        <button className='tm_image_item_main_update_btn' onClick={() => onImageUpdate(index)}>Update</button>
                                        <button className='tm_image_item_main_remove_btn' onClick={() => onImageRemove(index)}><CloseIcon/></button>
                                      </Box>                            
                                  </Box>
                                ))}
                              </Box>
                            </Grid>
                          </Grid>
                          
                          
                        </div>
                      )}
                    </ImageUploading>
                  </Box> */}
                  {/* <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Add Dents Photos (maximum Upload upto 10 Photos)</Typography>
                    </Box>
                    <ImageUploading
                      multiple
                      value={DentsPhotos}
                      onChange={DentsPhotosonChange}
                      maxNumber={DentsPhotosNumber}
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                          <Grid container spacing={4}>
                            <Grid item md={3}> 
                              <Box className={dashboardStyles.tm_dashboard_img_upl_btns}>
                                <button
                                  style={isDragging ? { color: 'red' } : undefined}
                                  onClick={onImageUpload}
                                  {...dragProps}
                                >
                                  Click or Drop here
                                </button>
                                <button onClick={onImageRemoveAll}>Remove all images</button>
                              </Box>
                              
                            </Grid>
                            <Grid item md={9}>
                              <Box className="tm_image_item_main">
                                {imageList.map((image, index) => (                          
                                  <Box key={index} className="image-item">
                                      <Image src={image['data_url']} alt="" width="100" />
                                      <Box className="image-item__btn-wrapper">
                                        <button className='tm_image_item_main_update_btn' onClick={() => onImageUpdate(index)}>Update</button>
                                        <button className='tm_image_item_main_remove_btn' onClick={() => onImageRemove(index)}><CloseIcon/></button>
                                      </Box>                            
                                  </Box>
                                ))}
                              </Box>
                            </Grid>
                          </Grid>
                          
                          
                        </div>
                      )}
                    </ImageUploading>
                  </Box> */}
                </Box>

                <Box sx={{margin:'50px 0 0'}}>
                  <Grid container spacing={4}>
                    
                    {/* <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Alloy wheels *</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Alloy wheels *"
                            onChange={handleChange}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Spare wheel*</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Spare wheel*"
                            onChange={handleChange}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Turbo chargers*</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Turbo chargers*"
                            onChange={handleChange}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Front break type*</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Front break type*"
                            onChange={handleChange}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="Fuel tank capacity (in liters)*" variant="outlined" fullWidth/>
                      </Box>
                    </Grid> */}
                  </Grid>
                </Box>
                <Box sx={{margin:'50px 0 0'}}>
                  <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_title}>
                      <Typography variant='h4'>Comfort</Typography>
                    </Box>
                    <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox_all}>

                      <Grid container spacing={0}>
                        {comfortList.length > 0 &&
                          comfortList.map((element, index) => {
                            return (
                              <Grid item md={6} key={index}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      value={element}
                                      key={index}
                                      name='comforts'
                                      onChange={handleInput}
                                      checked={ Object.values(comforts).includes(element.toString())? true : false }
                                    />
                                  }
                                  label={element}
                                />
                              </Grid>
                            );
                          })}
                      </Grid>

                    </Box>                    
                  </Box>
                  <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_title}>
                      <Typography variant='h4'>Safety</Typography>
                    </Box>
                    <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox_all}>
                          <Grid container spacing={0}>
                                    {safetyList.length > 0 &&
                                      safetyList.map((element, index) => {
                                        return (
                                          <Grid item md={6} key={index}>
                                            <FormControlLabel
                                              control={
                                                <Checkbox
                                                  value={element}
                                                  name='safety'
                                                  key={index}
                                                  onChange={handleInput}
                                                  checked={
                                                    Object.values(safety).includes(element.toString()) ? true : false
                                                  }
                                                />
                                              }
                                              label={element}
                                            />
                                          </Grid>
                                        );
                                      })}
                          </Grid>                     
                    </Box>                    
                  </Box>                 
                  
                  <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_title}>
                      <Typography variant='h4'>Interior</Typography>
                    </Box>
                    <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox_all}>
                          <Grid container spacing={0}>
                                    {interiorList.length > 0 &&
                                      interiorList.map((element, index) => {
                                        return (
                                          <Grid item md={6} key={index}>
                                            <FormControlLabel
                                              control={
                                                <Checkbox
                                                  key={index}
                                                  name='interior'
                                                  value={element}
                                                  onChange={handleInput}
                                                  checked={
                                                    Object.values(interior).includes(element.toString())
                                                      ? true
                                                      : false
                                                  }
                                                />
                                              }
                                              label={element}
                                            />
                                          </Grid>
                                        );
                                      })}
                          </Grid>                    
                    </Box>                    
                  </Box>
                  <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_title}>
                      <Typography variant='h4'>Exterior</Typography>
                    </Box>
                    <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox_all}>
                            <Grid container spacing={0}>
                                    {exteriorList.length > 0 &&
                                      exteriorList.map((element, index) => {
                                        return (
                                          <Grid item md={6} key={index}>
                                            <FormControlLabel
                                              control={
                                                <Checkbox
                                                  key={index}
                                                  value={element}
                                                  name='exterior'
                                                  onChange={handleInput}
                                                  checked={
                                                    Object.values(exterior).includes(element.toString())
                                                      ? true
                                                      : false
                                                  }
                                                />
                                              }
                                              label={element}
                                            />
                                          </Grid>
                                        );
                                      })}
                              </Grid>                    
                    </Box>                    
                  </Box>
                  <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_title}>
                      <Typography variant='h4'>Entertainment and Communication</Typography>
                    </Box>
                    <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox_all}>
                              <Grid container spacing={0}>
                                    {entertainmentList.length > 0 &&
                                      entertainmentList.map((element, index) => {
                                        return (
                                          <Grid item md={6} key={index}>
                                            <FormControlLabel
                                              control={
                                                <Checkbox
                                                  key={index}
                                                  value={element}
                                                  name='entertainment'
                                                  onChange={handleInput}
                                                  checked={
                                                    Object.values(entertainment).includes(element.toString())
                                                      ? true
                                                      : false
                                                  }
                                                />
                                              }
                                              label={element}
                                            />
                                          </Grid>
                                        );
                                      })}
                                  </Grid>                     
                    </Box>                    
                  </Box>
                  <Box className={dashboardStyles.tm_dashboard_rightbar_form_submit_btn}>
                    <Button variant="contained" type='submit'>submit</Button>           
                  </Box>
                </Box>
                </form>
              </Box>
            </Box>
          </Grid>
        </Grid>      
        <Dialog
        open={popupOpen}
        onClose={handleCloseBtn}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Success Message"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have added successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleCloseBtn}>Ok</Button> */}
          <Button onClick={handleCloseBtn} autoFocus>Ok</Button>
        </DialogActions>
      </Dialog>  
      </Box>
    </>
  )
}

export default Create