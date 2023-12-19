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
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter } from 'next/navigation';




function Create() {  

  const router = useRouter()
  // const [open, setOpen] = React.useState(false);
  // const anchorRef = React.useRef(null);
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const [isLoader,setLoader]=useState(false);
  const [isLoader2,setLoader2]=useState(false);
  const [brandlist, setBrandlist] = useState([]);
  const [brand, setBrand] = useState(null);
  const [modellist, setModelList] = useState([]);
  const [model, setModel] = useState(null);
  const [variantList, setVariantList] = useState([]);
  const [variant, setVariant] = useState(null);
  
  const [years, setYears] = useState([]);
  const [regYear, setregYear] = useState(null);
  const [bodyTypelist, setbodyTypelist]=useState([]);
  const [bodyType, setbodyType]=useState(null);
  const [fuelTypelist, setfuelTypelist]=useState([]);
  const [fuelType, setfuelType]=useState(null);
  const [transmission, setTransmission]=useState(null);
  const [ownerTypelist, setownerTypelist]=useState([]);
  const [ownerType, setownerType]=useState(null);
  const [colorList, setcolorList]=useState([]);
  const [color, setColor]=useState(null);
  const [rtoList, setrtoList]=useState([]);
  const [rto, setRto]=useState(null);
  const [cityList, setCityList]=useState([]);
  const [city, setCity]=useState(null);
  const [kmsDriven, setkmsDriven]=useState(null);
  const [carPrice, setcarPrice]=useState(null);
  const [oneClickBuyPrice, setOneClickBuyPrice]=useState(null);
  const [description, setDescription]=useState(null);
  const [seatList, setseatList]=useState([]);
  const [seat, setSeat]=useState(null);

  const [mileage, setMileage]=useState(null);
  const [engine, setEngine]=useState(null);
  const [maxPower, setmaxPower]=useState(null);
  const [maxTorque, setMaxTorque]=useState(null);
  const [noc, setNoc]=useState(null);
  const [mfgYear, setmfgYear]=useState(null);
  const [inspectionReport, setInspectionReport]=useState(null);
  const [insuranceValidity, setInsuranceValidity]=useState(null);
  const [roadTaxValidity, setRoadTaxValidity]=useState(null);
  const [inspectionScore, setInspectionScore]=useState(null);

  const [auctionStartTime, setAuctionStartTime]=useState(null);
  const [auctionEndTime, setAuctionEndTime]=useState(null);
  

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
  const [InteriorPhotos  , setInteriorPhotos ] = useState([]);
  const [EnginePhotos  , setEnginePhotos ] = useState([]);
  const [TyresPhotos  , setTyresPhotos ] = useState([]);
  const [DentsPhotos  , setDentsPhotos ] = useState([]);

  const [engineVideo  , setEngineVideo ] = useState(null);
  const [silencerVideo  , setSilencerVideo ] = useState(null);
  

  const [allCarImage, setAllcarImage] = useState([]);
  const [thumbImage, setThumbImage] = useState([]);

  const [allCarVideo, setAllcarVideo] = useState([]);

  const [error, setError] = useState("");
  
  useEffect(() => {
    getMakeModel();
    getBodytype();
    getFueltype();
    getOwnertype();
    getColor();
    getRto();
    getCity();
    getSeat();


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
  const getCity = async () => {
    try {
      const response = await vehicleApi.getCity();
            // console.log(response.data.data);
      if (response.data.status === 200) {
        setCityList(response.data.data);
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
    
      const filteredResult = brandlist.filter((item) => item.name == e.target.value);
      // console.log(filteredResult[0].models);
      setModelList(filteredResult[0].models);
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
    if (e.target.name === 'city') {
      setCity(e.target.value);
    }
    if (e.target.name === 'kmsDriven') {
      setkmsDriven(e.target.value);
    }
    if (e.target.name === 'carPrice') {
      setcarPrice(e.target.value);
    }
    if (e.target.name === 'oneClickBuyPrice') {
      setOneClickBuyPrice(e.target.value);
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
      
      // console.log(e.target.files[0].size);
      if(e.target.files[0].size<5000000)
      {
          setThumbnailPhotos([...ThumbnailPhotos, e.target.files[0]]);
          uploadAuctionImage(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 5MB!")
      }
      
      
    }

    if (e.target.name === 'ExteriorPhotos' && e.target.files.length > 0) {
      // console.log(e.target.files);
      if(e.target.files[0].size<5000000)
      {
          setExteriorPhotos([...ExteriorPhotos, e.target.files[0]]);
          uploadAuctionImage2(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 5MB!")
      }
      
    }

    if (e.target.name === 'InteriorPhotos' && e.target.files.length > 0) {
      // console.log(e.target.files);
      if(e.target.files[0].size<5000000)
      {
          setInteriorPhotos([...InteriorPhotos, e.target.files[0]]);
          uploadAuctionImage3(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 5MB!")
      }
      
    }

    if (e.target.name === 'EnginePhotos' && e.target.files.length > 0) {
      // console.log(e.target.files);
      if(e.target.files[0].size<5000000)
      {
          setEnginePhotos([...EnginePhotos, e.target.files[0]]);
          uploadAuctionImage4(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 5MB!")
      }
      
    }

    if (e.target.name === 'TyresPhotos' && e.target.files.length > 0) {
      // console.log(e.target.files);
      if(e.target.files[0].size<5000000)
      {
          setTyresPhotos([...TyresPhotos, e.target.files[0]]);
          uploadAuctionImage5(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 5MB!")
      }
    }

    if (e.target.name === 'DentsPhotos' && e.target.files.length > 0) {
      // console.log(e.target.files);
      if(e.target.files[0].size<5000000)
      {
          setDentsPhotos([...DentsPhotos, e.target.files[0]]);
          uploadAuctionImage6(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 5MB!")
      }
    }

    if (e.target.name === 'engineVideo' && e.target.files.length > 0) {
     
      // console.log(e.target.files);
      if(e.target.files[0].size<10000000)
      {
          // setEngineVideo(e.target.files[0]);
          setLoader(true);
          uploadAuctionVideo1(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 10MB!")
      }
    }
    if (e.target.name === 'silencerVideo' && e.target.files.length > 0) {
     
      // console.log(e.target.files);
      if(e.target.files[0].size<10000000)
      {
          setLoader2(true);
          uploadAuctionVideo2(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 10MB!")
      }
    }

    


  }

  const handleRemoveImage = async (id) => {
    setThumbnailPhotos(ThumbnailPhotos.filter((element) => element.name !== id.name));
    setExteriorPhotos(ExteriorPhotos.filter((element) => element.name !== id.name));
    setInteriorPhotos(InteriorPhotos.filter((element) => element.name !== id.name));
    setEnginePhotos(EnginePhotos.filter((element) => element.name !== id.name));
    setTyresPhotos(TyresPhotos.filter((element) => element.name !== id.name));
    setDentsPhotos(DentsPhotos.filter((element) => element.name !== id.name));
  };

  const handleInsuranceDate = (newDate) => {
    setInsuranceValidity(newDate);
    // console.log("current "+newDate);
  };
  const handleRoadTaxValidityDate = (newDate) => {
    setRoadTaxValidity(newDate);
  };
  const handleAuctionStartTime = (newDate) => {
    setAuctionStartTime(newDate);
  };
  const handleAuctionEndTime = (newDate) => {
    setAuctionEndTime(newDate);
  };

  
const uploadAuctionImage= async (data)=>{
  const formData = new FormData();
    formData.append('file', data);
  const response = await vehicleApi.uploadAuctionImage(formData);
  if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
    // console.log(response);
    // setAllcarImage(response.data.data);
    setAllcarImage([...allCarImage, response.data.data]);
    setThumbImage([...thumbImage, response.data.data]);
    setError();
    // console.log(response.data.data);
  }
}

const uploadAuctionImage2= async (data)=>{
  const formData = new FormData();
    formData.append('file', data);
  const response = await vehicleApi.uploadAuctionImage2(formData);
  if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
    // console.log(response);
    setAllcarImage([...allCarImage, response.data.data]);
    // console.log(response.data.data);
  }
}

const uploadAuctionImage3= async (data)=>{
  const formData = new FormData();
    formData.append('file', data);
  const response = await vehicleApi.uploadAuctionImage3(formData);
  if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
    // console.log(response);
    setAllcarImage([...allCarImage, response.data.data]);
    // console.log(response.data.data);
  }
}

const uploadAuctionImage4= async (data)=>{
  const formData = new FormData();
    formData.append('file', data);
  const response = await vehicleApi.uploadAuctionImage4(formData);
  if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
    // console.log(response);
    setAllcarImage([...allCarImage, response.data.data]);
    // console.log(response.data.data);
  }
}

const uploadAuctionImage5= async (data)=>{
  const formData = new FormData();
    formData.append('file', data);
  const response = await vehicleApi.uploadAuctionImage5(formData);
  if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
    // console.log(response);
    setAllcarImage([...allCarImage, response.data.data]);
    // console.log(response.data.data);
  }
}

const uploadAuctionImage6= async (data)=>{
  const formData = new FormData();
    formData.append('file', data);
  const response = await vehicleApi.uploadAuctionImage6(formData);
  if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
    // console.log(response);
    setAllcarImage([...allCarImage, response.data.data]);
    // console.log(response.data.data);
  }
}

const uploadAuctionVideo1= async (data)=>{
  const formData = new FormData();
    formData.append('file', data);
  const response = await vehicleApi.uploadAuctionVideo1(formData);
  setLoader(false);
  if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
    // console.log(response);
    setEngineVideo(response.data.data.path);
    setAllcarVideo([...allCarVideo, response.data.data]);
    
    // console.log(response.data.data);
  }
}

const uploadAuctionVideo2= async (data)=>{
  const formData = new FormData();
    formData.append('file', data);
  const response = await vehicleApi.uploadAuctionVideo2(formData);
  setLoader2(false);
  if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
    // console.log(response);
    setSilencerVideo(response.data.data.path);
    setAllcarVideo([...allCarVideo, response.data.data]);
    
    // console.log(response.data.data);
  }
}


const handleRemoveVideo = async ()=>{
  setEngineVideo(null);
  setAllcarVideo(prevArray => prevArray.filter(item => item.path !== engineVideo));
}
const handleRemoveVideo2 = async ()=>{
  setSilencerVideo(null);
  setAllcarVideo(prevArray => prevArray.filter(item => item.path !== silencerVideo));
}


  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if(thumbImage.length==0)
    {
        setError("Thumbnail Photo is required!")
    }
    else
    {

      setError("");

    const formData={allCarVideo,auctionStartTime,auctionEndTime,thumbImage,allCarImage,brand,model,variant,regYear,bodyType,fuelType,transmission,ownerType,color,rto,city,kmsDriven,carPrice,oneClickBuyPrice,description,seat,mileage,engine,maxPower,maxTorque,noc,mfgYear,inspectionReport,insuranceValidity,roadTaxValidity,inspectionScore,comforts,safety,interior,exterior,entertainment};
    
    // console.log(formData);
    
    // console.log(ThumbnailPhotos);
    // ThumbnailPhotos.map((element, index) => {
    //   formData.append(`ThumbnailPhotos`, element);
    // });
    // ExteriorPhotos.map((element, index) => {
    //   formData.append(`ExteriorPhotos`, element);
    // });

    // console.log(ThumbnailPhotos , ExteriorPhotos);
    
    const response = await vehicleApi.addAuctionVehicle(formData);
    // console.log(response);
    if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
    //   // console.log("ok");
      // setPopupopen(true);
      confirm("Car added successfully");
      router.push("/dashboard/auctionvehicle");

    }

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
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
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
                  <Typography variant='h3'>Add Inspection Details!</Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                  <Box>
                    <Typography variant='h6'>Basic Document Details</Typography>
                  </Box>
                <Grid container spacing={4}>
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="Customer Contact No" onChange={handleInput} name='custContactNo' type="number" required variant="outlined" fullWidth/>
                      </Box>
                  </Grid> 
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select City*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={city}
                          label="Select City*"
                          onChange={handleInput}
                          name='city'
                          required
                        >
                          {cityList.length > 0 && cityList.map((data,key) => (
                            <MenuItem key={key} value={data.name}>{data.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Registration Type*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={regType}
                          label="Select City*"
                          onChange={handleInput}
                          name='regType'
                          required
                        >
                            <MenuItem key='1' value="Private">Private</MenuItem>
                            <MenuItem key='2' value="Commercial">Commercial</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="Registration No" onChange={handleInput} name='regNo' type="number" variant="outlined" required fullWidth/>
                      </Box>
                  </Grid> 
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">RC Availability*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rcAvailability}
                          label="RC Availability*"
                          onChange={handleInput}
                          name='rcAvailability'
                          required
                        >
                            <MenuItem key='1' value="Original">Original</MenuItem>
                            <MenuItem key='2' value="Photocopy">Photocopy</MenuItem>
                            <MenuItem key='3' value="Lost">Lost</MenuItem>
                            <MenuItem key='4' value="Lost with photocopy">Lost with photocopy</MenuItem>
                            <MenuItem key='5' value="Duplicate">Duplicate</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">RC Condition*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rcCondition}
                          label="RC Condition*"
                          onChange={handleInput}
                          name='rcCondition'
                          required
                        >
                            <MenuItem key='1' value="Okay">Okay</MenuItem>
                            <MenuItem key='2' value="Damaged">Damaged</MenuItem>
                            <MenuItem key='3' value="Faded">Faded</MenuItem>
                            <MenuItem key='4' value="Not Applicable">Not Applicable</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                        <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_date} ${"tm_dashboard_rightbar_form_date_gb"} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                          <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['DatePicker']}>
                              <DatePicker label="Registration Date" name='regDate' onChange={handleInsuranceDate} sx={{width:'100%'}} required/>
                            </DemoContainer>
                          </LocalizationProvider>
                        </Box>
                  </Grid>
                  <Grid item md={3}>
                        <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_date} ${"tm_dashboard_rightbar_form_date_gb"} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                          <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['DatePicker']}>
                              <DatePicker label="Fitness Upto" name='fitnessUpto' onChange={handleInsuranceDate} sx={{width:'100%'}} required/>
                            </DemoContainer>
                          </LocalizationProvider>
                        </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">To be Scraped*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={tobeScraped}
                          label="RC Condition*"
                          onChange={handleInput}
                          name='tobeScraped'
                          required
                        >
                            <MenuItem key='1' value="Yes">Yes</MenuItem>
                            <MenuItem key='2' value="No">No</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Registration State*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={regState}
                          label="Registration State*"
                          onChange={handleInput}
                          name='regState'
                          required
                        >
                            <MenuItem key='1' value="West Bengal">West Bengal</MenuItem>
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
                          // value={regRto}
                          label="Select RTO*"
                          onChange={handleInput}
                          name='regRto'
                          required
                        >
                          {rtoList.length > 0 && rtoList.map((data,key) => (
                            <MenuItem key={key} value={data.rtoName}>{data.rtoName} ({data.rtoCode})</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="Owner Serial No" onChange={handleInput} name='ownerSerialNo' type="text" variant="outlined" required fullWidth/>
                      </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Brand *</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={brand}
                          label="Select Brand *"
                          onChange={handleInput}
                          name='brand'
                          required
                        >
                          {brandlist.length > 0 && brandlist.map((data,key) => (
                            <MenuItem key={key} value={data.name}>{data.name}</MenuItem>
                          ))}
                          
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Model *</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={model}
                          label="Select Model *"
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
                        <InputLabel id="demo-simple-select-label">Select Variant *</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={variant}
                          label="Select Variant *"
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
                      <TextField id="outlined-basic" label="Engine No" onChange={handleInput} name='engineNo' type="text" variant="outlined" required fullWidth/>
                      </Box>
                  </Grid>
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="Chassis No" onChange={handleInput} name='chassisNo' type="text" variant="outlined" required fullWidth/>
                      </Box>
                  </Grid>
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="Reg Owner Name" onChange={handleInput} name='regOwnerName' type="text" variant="outlined" required fullWidth/>
                      </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">MFG Month *</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={mfgMonth}
                          label="MFG Month *"
                          onChange={handleInput}
                          name='mfgMonth'
                          required
                        >
                              <MenuItem key='1' value="Jan">January</MenuItem>
                              <MenuItem key='2' value="Feb">February</MenuItem>
                              <MenuItem key='3' value="Mar">March</MenuItem>
                              <MenuItem key='4' value="Apr">April</MenuItem>
                              <MenuItem key='5' value="May">May</MenuItem>
                              <MenuItem key='6' value="Jun">June</MenuItem>
                              <MenuItem key='7' value="Jul">July</MenuItem>
                              <MenuItem key='8' value="Aug">August</MenuItem>
                              <MenuItem key='9' value="Sep">September</MenuItem>
                              <MenuItem key='10' value="Oct">October</MenuItem>
                              <MenuItem key='11' value="Nov">November</MenuItem>
                              <MenuItem key='12' value="Dec">December</MenuItem>
                          
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">MFG Year *</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={mfgYear}
                          label="MFG Year *"
                          onChange={handleInput}
                          name='mfgYear'
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
                        <InputLabel id="demo-simple-select-label">Select Fuel Type *</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={fuelType}
                          label="Select Fuel Type *"
                          onChange={handleInput}
                          name='fuelType'
                          required
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
                      <TextField id="outlined-basic" label="Engine (CC)" onChange={handleInput} name='cc' type="number" variant="outlined" required fullWidth/>
                      </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Hypothecation Details*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={hypoDetails}
                          label="Select Fuel Type *"
                          onChange={handleInput}
                          name='hypoDetails'
                          required
                        >
                            <MenuItem key='1' value="Not Hypothecated">Not Hypothecated</MenuItem>
                            <MenuItem key='2' value="Loan Active">Loan Active</MenuItem>
                            <MenuItem key='3' value="Valid NOC Available">Valid NOC Available</MenuItem>
                            <MenuItem key='4' value="NOC not available, Loan Closed">NOC not available, Loan Closed</MenuItem>

                        </Select>
                      </FormControl>
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
                            required
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
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Missmatch in RC *</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={missmatchRC}
                            label="Missmatch in RC*"
                            onChange={handleInput}
                            name='missmatchRC'
                            required
                          >
                            <MenuItem key='1' value="No Missmatch">No Missmatch</MenuItem>
                            <MenuItem key='2' value="Make">Make</MenuItem>
                            <MenuItem key='3' value="Model">Model</MenuItem>
                            <MenuItem key='4' value="Variant">Variant</MenuItem>
                            <MenuItem key='5' value="Owner SL No">Owner SL No</MenuItem>
                            <MenuItem key='6' value="Fuel Type">Fuel Type</MenuItem>
                            <MenuItem key='7' value="Color">Color</MenuItem>
                            <MenuItem key='8' value="Seating Capacity">Seating Capacity</MenuItem>
                            <MenuItem key='9' value="Date/Year of Mfg">Date/Year of Mfg</MenuItem>
                            <MenuItem key='10' value="Registration Date">Registration Date</MenuItem>
                            
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid> 
                    <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Road Tax Validity *</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={roadTaxValidity}
                            label="Missmatch in RC*"
                            onChange={handleInput}
                            name='roadTaxValidity'
                            required
                          >
                            <MenuItem key='1' value="OTT">OTT</MenuItem>
                            <MenuItem key='2' value="LTT">LTT</MenuItem>
                            <MenuItem key='3' value="Limited Period">Limited Period</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>  
                    <Grid item md={3}>
                        <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_date} ${"tm_dashboard_rightbar_form_date_gb"} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                              <DatePicker label="Road Tax Valid Upto" name="roadTaxValidUpto" onChange={handleRoadTaxValidityDate} sx={{width:'100%'}} required/>
                            </DemoContainer>
                          </LocalizationProvider>
                        </Box>
                    </Grid>
                    <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Insurance *</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={insurance}
                            label="Insurance*"
                            onChange={handleInput}
                            name='insurance'
                            required
                          >
                            <MenuItem key='1' value="Expired">Expired</MenuItem>
                            <MenuItem key='2' value="Third Party">Third Party</MenuItem>
                            <MenuItem key='3' value="Comprehensive">Comprehensive</MenuItem>
                            <MenuItem key='4' value="Zero Depriciation/Nill Depriciation/Bumper to Bumper">Zero Depriciation/Nill Depriciation/Bumper to Bumper</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>  
                    <Grid item md={3}>
                        <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_date} ${"tm_dashboard_rightbar_form_date_gb"} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                          <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['DatePicker']}>
                              <DatePicker label="Insurance Validity" onChange={handleInsuranceDate} value={insuranceValidity} sx={{width:'100%'}} required/>
                            </DemoContainer>
                          </LocalizationProvider>
                        </Box>
                    </Grid>
                    <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Insurance *</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={noClaimBonus}
                            label="No Claim Bonus*"
                            onChange={handleInput}
                            name='noClaimBonus'
                            required
                          >
                            <MenuItem key='1' value="Not Applicable / Not Available">Not Applicable / Not Available</MenuItem>
                            <MenuItem key='2' value="10%">10%</MenuItem>
                            <MenuItem key='3' value="15%">15%</MenuItem>
                            <MenuItem key='4' value="20%">20%</MenuItem>
                            <MenuItem key='5' value="25%">25%</MenuItem>
                            <MenuItem key='6' value="30%">30%</MenuItem>
                            <MenuItem key='7' value="35%">35%</MenuItem>
                            <MenuItem key='8' value="40%">40%</MenuItem>
                            <MenuItem key='9' value="45%">45%</MenuItem>
                            <MenuItem key='10' value="50%">50%</MenuItem>
                            <MenuItem key='11' value="Above 50%">Above 50%</MenuItem>
                            
                            </Select>
                        </FormControl>
                      </Box>
                    </Grid>  

                    <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Mismatch In Insurance *</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={missmatchInsurance}
                            label="Missmatch In Insurance*"
                            onChange={handleInput}
                            name='missmatchInsurance'
                            required
                          >
                            <MenuItem key='1' value="No Missmatch">No Missmatch</MenuItem>
                            <MenuItem key='2' value="Make / Model / Variant">Make / Model / Variant</MenuItem>
                            <MenuItem key='3' value="Chassis Number">Chassis Number</MenuItem>
                            <MenuItem key='4' value="Engine Number">Engine Number</MenuItem>
                            <MenuItem key='5' value="Registraion Number">Registraion Number</MenuItem>
                            <MenuItem key='6' value="Fuel Type">Fuel Type</MenuItem>
                            
                            </Select>
                        </FormControl>
                      </Box>
                    </Grid>  

                    <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Duplicate Key *</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={duplicateKey}
                            label="Duplicate Key*"
                            onChange={handleInput}
                            name='duplicateKey'
                            required
                          >
                            <MenuItem key='1' value="Yes">Yes</MenuItem>
                            <MenuItem key='2' value="No">No</MenuItem>
                            
                            </Select>
                        </FormControl>
                      </Box>
                    </Grid>  
                    <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      
                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">RTO Noc*</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={rtoNoc}
                            label="RTO Noc *"
                            onChange={handleInput}
                            name='rtoNoc'
                            required
                          >
                            
                            <MenuItem value='Not Applicable'>Not Applicable</MenuItem>
                            <MenuItem value='Issued'>Issued</MenuItem>
                            <MenuItem value='Expired (issued 90 days ago)'>Expired (issued 90 days ago)</MenuItem>
                            <MenuItem value='Missing'>Missing</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                  </Grid>
                  <Grid item md={3}>
                        <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_date} ${"tm_dashboard_rightbar_form_date_gb"} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                          <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['DatePicker']}>
                              <DatePicker label="RTO Noc Issue Date" name="rtoNocIssueDate" onChange={handleInsuranceDate}  sx={{width:'100%'}} required/>
                            </DemoContainer>
                          </LocalizationProvider>
                        </Box>
                    </Grid>
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Comments On Basic*</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={commentsOnBasic}
                            label="Comments On Basic"
                            onChange={handleInput}
                            name='commentsOnBasic'
                          >
                            
                            <MenuItem value='CNG/LPG Plate not Available'>CNG/LPG Plate not Available</MenuItem>
                            <MenuItem value='CNG/LPG Removed'>CNG/LPG Removed</MenuItem>
                            <MenuItem value='Vin Plate Missing'>Vin Plate Missing</MenuItem>
                            <MenuItem value='CNG/LPG Cylinder test certificate not Available'>CNG/LPG Cylinder test certificate not Available</MenuItem>
                            <MenuItem value='RC Fitness Expired'>RC Fitness Expired</MenuItem>
                            <MenuItem value='Car Converted from Commercial to private'>Car Converted from Commercial to private</MenuItem>
                            <MenuItem value='Migrated from Other State'>Migrated from Other State</MenuItem>
                            <MenuItem value='Remote Key Damaged / Not Available'>Remote Key Damaged / Not Available</MenuItem>
                            <MenuItem value='Chassis Number Rusted'>Chassis Number Rusted</MenuItem>
                            <MenuItem value='Chassis Number Not Traceable'>Chassis Number Not Traceable</MenuItem>
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
                      <Typography variant='h6'>RC Availablity Images <Box sx={{color:"red"}}>{error}</Box></Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='rcAvailabilityImages' hidden />
                          </Button>
                          
                        </Box>                        
                      </Grid>
                       {/* <Grid item md={9}>
                         {ThumbnailPhotos.length > 0 &&
                          ThumbnailPhotos.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={URL.createObjectURL(element)}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
                        </Grid> */}
                      </Grid>
                  </Box>
                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Chassis Images</Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='chassisImages' hidden />
                          </Button>
                        </Box>                        
                      </Grid>
                      {/* <Grid item md={9}>
                        {ExteriorPhotos.length > 0 &&
                          ExteriorPhotos.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box>
                                  <Image
                                    src={URL.createObjectURL(element)}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
                        </Grid> */}
                      </Grid>
                  </Box>

                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Hypothecation Images</Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='hypoImages' hidden />
                          </Button>
                        </Box>                        
                      </Grid>
                      {/* <Grid item md={9}>
                        {InteriorPhotos.length > 0 &&
                          InteriorPhotos.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={URL.createObjectURL(element)}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
                        </Grid> */}
                      </Grid>
                  </Box>

                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Road Tax Validity Images</Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='roadTaxValidityImages' hidden />
                          </Button>
                        </Box>                        
                      </Grid>
                      {/* <Grid item md={9}>
                        {EnginePhotos.length > 0 &&
                          EnginePhotos.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={URL.createObjectURL(element)}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
                        </Grid> */}
                      </Grid>
                  </Box>

                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Insurance Images</Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='insuranceImages' hidden />
                          </Button>
                        </Box>                        
                      </Grid>
                      {/* <Grid item md={9}>
                        {TyresPhotos.length > 0 &&
                          TyresPhotos.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={URL.createObjectURL(element)}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
                        </Grid> */}
                      </Grid>
                  </Box>

                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Duplicate Key Images</Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='duplicateKeyImages' hidden />
                          </Button>
                        </Box>                        
                      </Grid>
                      {/* <Grid item md={9}>
                        {DentsPhotos.length > 0 &&
                          DentsPhotos.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={URL.createObjectURL(element)}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
                        </Grid> */}
                      </Grid>
                  </Box>

                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>RTO Noc Images</Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='rtoNocImages' hidden />
                          </Button>
                        </Box>                        
                      </Grid>
                      {/* <Grid item md={9}>
                              <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box>
                                    {engineVideo ? (<>
                                    <video width="200" height="100" controls >
                                      <source src={engineVideo} type="video/mp4"/>
                                    </video>
                                    <Button onClick={() => handleRemoveVideo()}><CloseIcon/> </Button>
                                    </>):(<> {isLoader?(<CircularProgress />):(<></>)}</>)}
                                    
                                </Box>
                              </Box>
                        </Grid> */}
                      </Grid>
                  </Box>
                </Box>

                <Box>
                    <Typography variant='h6'>Engine & Transmission Details</Typography>
                </Box>
                <Grid container spacing={4}>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Engine*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={engine}
                          label="Engine*"
                          onChange={handleInput}
                          name='engine'
                          required
                        >
                            <MenuItem key='1' value="Okay">Okay</MenuItem>
                            <MenuItem key='2' value="Repaired">Repaired</MenuItem>
                            <MenuItem key='3' value="MIL Light Glowing">MIL Light Glowing</MenuItem>
                            <MenuItem key='4' value="RPM Fluctuating">RPM Fluctuating</MenuItem>
                            <MenuItem key='5' value="Over Heating">Over Heating</MenuItem>
                            <MenuItem key='6' value="Misfiring">Misfiring</MenuItem>
                            <MenuItem key='7' value="Fuel Leakage from injector">Fuel Leakage from injector</MenuItem>
                            <MenuItem key='8' value="Knoking">Knoking</MenuItem>
                            <MenuItem key='9' value="Long Cranking Due to Weak Compression">Long Cranking Due to Weak Compression</MenuItem>
                            <MenuItem key='10' value="Replaced">Replaced</MenuItem>
                            <MenuItem key='11' value="Air filter Box Damaged">Air filter Box Damaged</MenuItem>
                            <MenuItem key='12' value="Seized">Seized</MenuItem>
                            <MenuItem key='13' value="Sump Damaged">Sump Damaged</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Battery*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={battery}
                          label="Battery*"
                          onChange={handleInput}
                          name='battery'
                          required
                        >
                            <MenuItem value="Okay">Okay</MenuItem>
                            <MenuItem value="Changed">Changed</MenuItem>
                            <MenuItem value="Weak">Weak</MenuItem>
                            <MenuItem value="Dead">Dead</MenuItem>
                            <MenuItem value="Jumpstart">Jumpstart</MenuItem>
                            <MenuItem value="Acid Leakage">Acid Leakage</MenuItem>
                            <MenuItem value="Discharge Light Glowing">Discharge Light Glowing</MenuItem>
                            <MenuItem value="Damaged">Damaged</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Coolant*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={coolant}
                          label="Coolant*"
                          onChange={handleInput}
                          name='coolant'
                          required
                        >
                            <MenuItem value="Okay">Okay</MenuItem>
                            <MenuItem value="Leaking">Leaking</MenuItem>
                            <MenuItem value="Dirty">Dirty</MenuItem>
                            <MenuItem value="Level Low">Level Low</MenuItem>

                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Engine Oil Dipstick*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={engineOilDipstick}
                          label="Engine Oil Dipstick*"
                          onChange={handleInput}
                          name='engineOilDipstick'
                          required
                        >
                            <MenuItem value="Okay">Okay</MenuItem>
                            <MenuItem value="Broken">Broken</MenuItem>
                            <MenuItem value="Not Available">Not Available</MenuItem>

                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Engine Oil*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={engineOil}
                          label="Engine Oil*"
                          onChange={handleInput}
                          name='engineOil'
                          required
                        >
                            <MenuItem value="Okay">Okay</MenuItem>
                            <MenuItem value="Leaking">Leaking</MenuItem>
                            <MenuItem value="Dirty">Dirty</MenuItem>
                            <MenuItem value="Leakage From Manifold">Leakage From Manifold</MenuItem>
                            <MenuItem value="Leakage from Sump Chamber">Leakage from Sump Chamber</MenuItem>
                            <MenuItem value="Low Pressure Warning Light Glowing">Low Pressure Warning Light Glowing</MenuItem>
                            <MenuItem value="Leakage fom Turbo Charger">Leakage fom Turbo Charger</MenuItem>
                            <MenuItem value="Leakage From Side Cover">Leakage From Side Cover</MenuItem>
                            <MenuItem value="Leakage from ingine Head">Leakage from ingine Head</MenuItem>
                            <MenuItem value="Level Low">Level Low</MenuItem>

                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Engine Mount*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={engineMount}
                          label="Engine Mount*"
                          onChange={handleInput}
                          name='engineMount'
                          required
                        >
                            <MenuItem value="Okay">Okay</MenuItem>
                            <MenuItem value="Broken">Broken</MenuItem>
                            <MenuItem value="Loose">Loose</MenuItem>
                            <MenuItem value="Excess Vibration">Excess Vibration</MenuItem>
                            <MenuItem value="Rusted">Rusted</MenuItem>

                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Engine Blow By Status*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={engineBlowbyStatus}
                          label="Engine Blow By Status*"
                          onChange={handleInput}
                          name='engineBlowbyStatus'
                          required
                        >
                            <MenuItem value="No Blow By">No Blow By</MenuItem>
                            <MenuItem value="Permisable Blow By">Permisable Blow By</MenuItem>
                            <MenuItem value="Oil Spilage on Idle">Oil Spilage on Idle</MenuItem>
                            <MenuItem value="Permisable Blow By with Oil Spilage">Permisable Blow By with Oil Spilage</MenuItem>
                            <MenuItem value="Back Compression">Back Compression</MenuItem>

                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Radiator*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={radiator}
                          label="Radiator*"
                          onChange={handleInput}
                          name='radiator'
                          required
                        >
                            <MenuItem value="Fan Motor Noise">Fan Motor Noise</MenuItem>
                            <MenuItem value="Fan Not Working">Fan Not Working</MenuItem>
                            <MenuItem value="Radiator Repaired /Welded">Radiator Repaired /Welded</MenuItem>
                            <MenuItem value="Radiator Damaged">Radiator Damaged</MenuItem>
                            <MenuItem value="Coolant Mixed with Engine Oil">Coolant Mixed with Engine Oil</MenuItem>

                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Comments On Engine*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={commentsOnEngine}
                          label="Comments On Engine*"
                          onChange={handleInput}
                          name='commentsOnEngine'
                          required
                        >
                            <MenuItem value="Not Converting to CNG / LPG">Not Converting to CNG / LPG</MenuItem>
                            <MenuItem value="RPM Not increasing">RPM Not increasing</MenuItem>
                            <MenuItem value="Car not working on Petrol">Car not working on Petrol</MenuItem>
                            <MenuItem value="Turbo Charger Noise">Turbo Charger Noise</MenuItem>
                            <MenuItem value="Turbo Charger Not Working">Turbo Charger Not Working</MenuItem>
                            <MenuItem value="Fan Belt Noise">Fan Belt Noise</MenuItem>
                            <MenuItem value="Alternator Bearing Noise">Alternator Bearing Noise</MenuItem>
                            <MenuItem value="Minor Noise">Minor Noise</MenuItem>
                            <MenuItem value="Major Noise">Major Noise</MenuItem>
                            <MenuItem value="Critical Noise">Critical Noise</MenuItem>
                            <MenuItem value="Oil Coming from Exhaust Tail Pipe">Oil Coming from Exhaust Tail Pipe</MenuItem>
                            <MenuItem value="Leakege From Injector">Leakege From Injector</MenuItem>
                            <MenuItem value="Car is in Working Condition but Towing Suggested to Avoid Damage to Engine">Car is in Working Condition but Towing Suggested to Avoid Damage to Engine</MenuItem>

                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Clutch*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={clutch}
                          label="Clutch*"
                          onChange={handleInput}
                          name='clutch'
                          required
                        >
                            <MenuItem value="Okay">Okay</MenuItem>
                            <MenuItem value="Hard">Hard</MenuItem>
                            <MenuItem value="Spongy">Spongy</MenuItem>
                            <MenuItem value="Burning">Burning</MenuItem>
                            <MenuItem value="Bearing Noise">Bearing Noise</MenuItem>
                            <MenuItem value="Slip / Low Pick up">Slip / Low Pick up</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Gear*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={gear}
                          label="Gear*"
                          onChange={handleInput}
                          name='gear'
                          required
                        >
                            <MenuItem value="Okay">Okay</MenuItem>
                            <MenuItem value="Manual Transmission">Manual Transmission</MenuItem>
                            <MenuItem value="Automatic Transmission">Automatic Transmission</MenuItem>
                            <MenuItem value="Hard">Hard</MenuItem>
                            <MenuItem value="Not Engaging">Not Engaging</MenuItem>
                            <MenuItem value="Abnormal Noise">Abnormal Noise</MenuItem>
                            <MenuItem value="Auto Transmission Not Working">Auto Transmission Not Working</MenuItem>
                            <MenuItem value="Gear Freeplay">Gear Freeplay</MenuItem>
                            <MenuItem value="Gear Knob Broken / Damaged">Gear Knob Broken / Damaged</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Steering*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={steering}
                          label="Steering*"
                          onChange={handleInput}
                          name='steering'
                          required
                        >
                            <MenuItem value="Okay">Okay</MenuItem>
                            <MenuItem value="Abnormal Noise">Abnormal Noise</MenuItem>
                            <MenuItem value="Hard">Hard</MenuItem>
                            <MenuItem value="Pump Noise">Pump Noise</MenuItem>
                            <MenuItem value="Oil Leakage from Rack">Oil Leakage from Rack</MenuItem>
                            <MenuItem value="Telescopic Adjustment not Working">Telescopic Adjustment not Working</MenuItem>
                            <MenuItem value="Wheel Adjustment Not Working">Wheel Adjustment Not Working</MenuItem>
                            <MenuItem value="Hydraulic Power Steering Not Working">Hydraulic Power Steering Not Working</MenuItem>
                            <MenuItem value="Electrical Power Steering Not Working">Electrical Power Steering Not Working</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Brake*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={brake}
                          label="Brake*"
                          onChange={handleInput}
                          name='brake'
                          required
                        >
                            <MenuItem value="Okay">Okay</MenuItem>
                            <MenuItem value="Ineffective">Ineffective</MenuItem>
                            <MenuItem value="Noise">Noise</MenuItem>
                            <MenuItem value="Master Cylinder Leakage">Master Cylinder Leakage</MenuItem>
                            <MenuItem value="Wheel Cylinder Leakage">Wheel Cylinder Leakage</MenuItem>
                            <MenuItem value="Hand / Parking Brake Light Glowing">Hand / Parking Brake Light Glowing</MenuItem>
                            <MenuItem value="Car With Electronic Parking Brake">Car With Electronic Parking Brake</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Suspension*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={suspension}
                          label="Suspension*"
                          onChange={handleInput}
                          name='suspension'
                          required
                        >
                            <MenuItem value="Okay">Okay</MenuItem>
                            <MenuItem value="Weak">Weak</MenuItem>
                            <MenuItem value="Damaged">Damaged</MenuItem>
                            <MenuItem value="Leakage in suspension">Leakage in suspension</MenuItem>
                            <MenuItem value="Abnormal Noise">Abnormal Noise</MenuItem>
                            <MenuItem value="Air Suspension Faulty">Air Suspension Faulty</MenuItem>
                            <MenuItem value="Suspension Modified">Suspension Modified</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Comments On Transmission</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={commentsOnTransmission}
                          label="Comments On Transmission"
                          onChange={handleInput}
                          name='commentsOnTransmission'
                        >
                            <MenuItem value="Car is in Working Condition but Towing Suggested to Avoid Damage to Clutch">Car is in Working Condition but Towing Suggested to Avoid Damage to Clutch</MenuItem>
                            <MenuItem value="Car is in Working Condition but Towing Suggested to Avoid Damage to Gear">Car is in Working Condition but Towing Suggested to Avoid Damage to Gear</MenuItem>
                            <MenuItem value="Towing Required">Towing Required</MenuItem>
                            <MenuItem value="Gear box Oil Leakage">Gear box Oil Leakage</MenuItem>
                            <MenuItem value="Abnormal Noise coming from Gear Box">Abnormal Noise coming from Gear Box</MenuItem>
                            <MenuItem value="All Weel Drive (AWD)">All Weel Drive (AWD)</MenuItem>
                            <MenuItem value="Four Wheel Drive (4X4)">Four Wheel Drive (4X4)</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  
                </Grid>
                <Box className={`${dashboardStyles.tm_dashboard_img_upl} ${"tm_dashboard_img_upl_gb"}`}>
                  {/* <Box className={dashboardStyles.tm_dashboard_img_upl_title}>
                    <Typography variant='h4'>Upload images</Typography>
                  </Box> */}
                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Engine & Transmission Images <Box sx={{color:"red"}}>{error}</Box></Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='engineImages' hidden />
                          </Button>
                          
                        </Box>                        
                      </Grid>
                       {/* <Grid item md={9}>
                         {ThumbnailPhotos.length > 0 &&
                          ThumbnailPhotos.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={URL.createObjectURL(element)}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
                        </Grid> */}
                      </Grid>
                  </Box>
                  
                </Box>

                <Box>
                    <Typography variant='h6'>Electrical & Interior Details</Typography>
                </Box>
                <Grid container spacing={4}>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Fuel Level*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={electrical}
                          label="Electrical*"
                          onChange={handleInput}
                          name='electrical'
                          required
                        >
                          <MenuItem value="Reserve">Reserve</MenuItem>
                            <MenuItem value="Less than 25%">Less than 25%</MenuItem>
                            <MenuItem  value="25% to 50%">25% to 50%</MenuItem>
                            <MenuItem  value="More than 50%">More than 50%</MenuItem>
                            
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Electrical*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={fuelLevel}
                          label="Fuel Level*"
                          onChange={handleInput}
                          name='fuelLevel'
                          required
                        >
                            <MenuItem value="Okay">Okay</MenuItem>
                            <MenuItem value="Odometer Not Working">Odometer Not Working</MenuItem>
                            <MenuItem value="Techometer Not Working">Techometer Not Working</MenuItem>
                            <MenuItem value="Speedometer Not Working">Speedometer Not Working</MenuItem>
                            <MenuItem value="Wiper Motor Not Working">Wiper Motor Not Working</MenuItem>
                            <MenuItem value="Central Locking Not Working">Central Locking Not Working</MenuItem>
                            <MenuItem value="Remote Locking Not Working">Remote Locking Not Working</MenuItem>
                            <MenuItem value="Headlight washer Not Working">Headlight washer Not Working</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Rear wiper & Washer*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rearWiper}
                          label="Rear Wiper*"
                          onChange={handleInput}
                          name='rearWiper'
                          required
                        >
                            <MenuItem value="Okay">Okay</MenuItem>
                            <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                            <MenuItem value="Broken">Broken</MenuItem>
                            <MenuItem value="Not Working">Not Working</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Rear Defogger*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rearDefogger}
                          label="Rear Defogger*"
                          onChange={handleInput}
                          name='rearDefogger'
                          required
                        >
                            <MenuItem value="Okay">Okay</MenuItem>
                            <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                            <MenuItem value="Not Working">Not Working</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Power Window*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={powerWindow}
                          label="Power Window*"
                          onChange={handleInput}
                          name='powerWindow'
                          required
                        >
                            <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">RHS Rear(Power Window)*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsFrontPW}
                          label="RHS Front(Power Window)*"
                          onChange={handleInput}
                          name='rhsFrontPW'
                          required
                        >
                            <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                            <MenuItem value="Working">Working</MenuItem>
                            <MenuItem value="Not Working">Not Working</MenuItem>
                            <MenuItem value="Missing">Missing</MenuItem>
                            <MenuItem value="Broken / Damaged">Broken / Damaged</MenuItem>
                            <MenuItem value="Noisy">Noisy</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">LHS Front(Power Window)*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsFrontPW}
                          label="LHS Front(Power Window)*"
                          onChange={handleInput}
                          name='lhsFrontPW'
                          required
                        >
                            <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                            <MenuItem value="Working">Working</MenuItem>
                            <MenuItem value="Not Working">Not Working</MenuItem>
                            <MenuItem value="Missing">Missing</MenuItem>
                            <MenuItem value="Broken / Damaged">Broken / Damaged</MenuItem>
                            <MenuItem value="Noisy">Noisy</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">LHS Rear(Power Window)*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsRearPW}
                          label="LHS Rear(Power Window)*"
                          onChange={handleInput}
                          name='lhsRearPW'
                          required
                        >
                            <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                            <MenuItem value="Working">Working</MenuItem>
                            <MenuItem value="Not Working">Not Working</MenuItem>
                            <MenuItem value="Missing">Missing</MenuItem>
                            <MenuItem value="Broken / Damaged">Broken / Damaged</MenuItem>
                            <MenuItem value="Noisy">Noisy</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">LHS Rear(Power Window)*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsRearPW}
                          label="LHS Rear(Power Window)*"
                          onChange={handleInput}
                          name='lhsRearPW'
                          required
                        >
                            <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                            <MenuItem value="Working">Working</MenuItem>
                            <MenuItem value="Not Working">Not Working</MenuItem>
                            <MenuItem value="Missing">Missing</MenuItem>
                            <MenuItem value="Broken / Damaged">Broken / Damaged</MenuItem>
                            <MenuItem value="Noisy">Noisy</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">RHS Rear(Power Window)*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsRearPW}
                          label="RHS Rear(Power Window)*"
                          onChange={handleInput}
                          name='rhsRearPW'
                          required
                        >
                            <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                            <MenuItem value="Working">Working</MenuItem>
                            <MenuItem value="Not Working">Not Working</MenuItem>
                            <MenuItem value="Missing">Missing</MenuItem>
                            <MenuItem value="Broken / Damaged">Broken / Damaged</MenuItem>
                            <MenuItem value="Noisy">Noisy</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Comments On Interior</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={commentsOnInterior}
                          label="Comments On Interior"
                          onChange={handleInput}
                          name='commentsOnInterior'
                          
                        >
                            <MenuItem value="Door Trim Torn">Door Trim Torn</MenuItem>
                            <MenuItem value="AC Vent Damaged">AC Vent Damaged</MenuItem>
                            <MenuItem value="AC Knob Damaged / Not Working">AC Knob Damaged / Not Working</MenuItem>
                            <MenuItem value="Cabin Floor Rusted">Cabin Floor Rusted</MenuItem>
                            <MenuItem value="Roof Lining Loose / Replaced">Roof Lining Loose / Replaced</MenuItem>
                            <MenuItem value="Roof lining Damaged">Roof lining Damaged</MenuItem>
                            <MenuItem value="Gear Box Cover Damaged">Gear Box Cover Damaged</MenuItem>
                            <MenuItem value="Dashboard Broken">Dashboard Broken</MenuItem>
                            <MenuItem value="Dashboard Scratched">Dashboard Scratched</MenuItem>
                            <MenuItem value="Electrical Seat Adjusment Not Working">Electrical Seat Adjusment Not Working</MenuItem>
                            <MenuItem value="Driver Seat Broken or Sliding Not Working">Driver Seat Broken or Sliding Not Working</MenuItem>
                            <MenuItem value="Push Button Start Stop Available">Push Button Start Stop Available</MenuItem>
                            <MenuItem value="Knee Airbags Available">Knee Airbags Available</MenuItem>
                            <MenuItem value="Seat Airbags Available">Seat Airbags Available</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Leather Seats</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={leatherSeats}
                          label="Leather Seats"
                          onChange={handleInput}
                          name='leatherSeats'
                          required
                        >
                            <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                            <MenuItem value="Okay">Okay</MenuItem>
                            <MenuItem value="Torn">Torn</MenuItem>
                            <MenuItem value="Worn Out">Worn Out</MenuItem>
                            <MenuItem value="Cushion Damaged">Cushion Damaged</MenuItem>
                            <MenuItem value="Depressed">Depressed</MenuItem>
                            <MenuItem value="Seat Cover Fitted">Seat Cover Fitted</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Fabric Seats</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={fabricSeats}
                          label="Fabric Seats"
                          onChange={handleInput}
                          name='fabricSeats'
                          required
                        >
                            <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                            <MenuItem value="Okay">Okay</MenuItem>
                            <MenuItem value="Torn">Torn</MenuItem>
                            <MenuItem value="Worn Out">Worn Out</MenuItem>
                            <MenuItem value="Cushion Damaged">Cushion Damaged</MenuItem>
                            <MenuItem value="Depressed">Depressed</MenuItem>
                            <MenuItem value="Seat Cover Fitted">Seat Cover Fitted</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Comments On Electricals</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={commentsOnElectrical}
                          label="Comments On Electricals"
                          onChange={handleInput}
                          name='commentsOnElectrical'
                          required
                        >
                            <MenuItem value="Odometer Tampered">Odometer Tampered</MenuItem>
                            <MenuItem value="Navigation Chip Not Available">Navigation Chip Not Available</MenuItem>
                            <MenuItem value="Base Tube / Woofer Retained By the Customer">Base Tube / Woofer Retained By the Customer</MenuItem>
                            <MenuItem value="Music system Retained By the Customer">Music system Retained By the Customer</MenuItem>
                            <MenuItem value="Amplifier Retained By the Customer">Amplifier Retained By the Customer</MenuItem>
                            <MenuItem value="Horn Not Working">Horn Not Working</MenuItem>
                            <MenuItem value="Power Window Master Switch Not Working">Power Window Master Switch Not Working</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  
                </Grid>
                <Box className={`${dashboardStyles.tm_dashboard_img_upl} ${"tm_dashboard_img_upl_gb"}`}>
                  
                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Electrical & Interior Images <Box sx={{color:"red"}}>{error}</Box></Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='electricalImages' hidden />
                          </Button>
                          
                        </Box>                        
                      </Grid>
                       {/* <Grid item md={9}>
                         {ThumbnailPhotos.length > 0 &&
                          ThumbnailPhotos.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={URL.createObjectURL(element)}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
                        </Grid> */}
                      </Grid>
                  </Box>
                  
                </Box>

                <Box>
                    <Typography variant='h6'>Exterior Details</Typography>
                </Box>
                <Grid container spacing={4}>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Bonnet*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={bonnet}
                          label="Bonnet*"
                          onChange={handleInput}
                          name='bonnet'
                          required
                        >
                          <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Repaired">Repaired</MenuItem>
                          <MenuItem value="Repainted">Repainted</MenuItem>
                          <MenuItem value="Replaced">Replaced</MenuItem>
                          <MenuItem value="Dented">Dented</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Rusted">Rusted</MenuItem>
                          <MenuItem value="Faded">Faded</MenuItem>
                          <MenuItem value="Scratched">Scratched</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Upper Cross Member*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={upperCrossMember}
                          label="Upper Cross Member*"
                          onChange={handleInput}
                          name='upperCrossMember'
                          required
                        >
                          <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Repaired">Repaired</MenuItem>
                          <MenuItem value="Replaced">Replaced</MenuItem>
                          <MenuItem value="Welded">Welded</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Rusted">Rusted</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lower Cross Member*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lowerCrossMember}
                          label="Lower Cross Member*"
                          onChange={handleInput}
                          name='lowerCrossMember'
                          required
                        >
                          <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Repaired">Repaired</MenuItem>
                          <MenuItem value="Replaced">Replaced</MenuItem>
                          <MenuItem value="Welded">Welded</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Rusted">Rusted</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Radiator Support*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={radiatorSupport}
                          label="Radiator Support*"
                          onChange={handleInput}
                          name='radiatorSupport'
                          required
                        >
                          <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Repaired">Repaired</MenuItem>
                          <MenuItem value="Replaced">Replaced</MenuItem>
                          <MenuItem value="Welded">Welded</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Rusted">Rusted</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Headlight Support*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={headlightSupport}
                          label="Headlight Support*"
                          onChange={handleInput}
                          name='headlightSupport'
                          required
                        >
                          <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Repaired">Repaired</MenuItem>
                          <MenuItem value="Replaced">Replaced</MenuItem>
                          <MenuItem value="Welded">Welded</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Rusted">Rusted</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lhs Apron*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsApron}
                          label="Lhs Apron*"
                          onChange={handleInput}
                          name='lhsApron'
                          required
                        >
                          <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Repaired">Repaired</MenuItem>
                          <MenuItem value="Repainted">Repainted</MenuItem>
                          <MenuItem value="Replaced">Replaced</MenuItem>
                          <MenuItem value="Welded">Welded</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Rusted">Rusted</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Rhs Apron*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsApron}
                          label="Rhs Apron*"
                          onChange={handleInput}
                          name='rhsApron'
                          required
                        >
                          <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Repaired">Repaired</MenuItem>
                          <MenuItem value="Repainted">Repainted</MenuItem>
                          <MenuItem value="Replaced">Replaced</MenuItem>
                          <MenuItem value="Welded">Welded</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Rusted">Rusted</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Front Windshield*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={frontWindshield}
                          label="Front Windshield*"
                          onChange={handleInput}
                          name='frontWindshield'
                          required
                        >
                          <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Spots">Spots</MenuItem>
                          <MenuItem value="Replaced">Replaced</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Scratched">Scratched</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Firewall*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={firewall}
                          label="Firewall*"
                          onChange={handleInput}
                          name='firewall'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Repaired">Repaired</MenuItem>
                          <MenuItem value="Repainted">Repainted</MenuItem>
                          <MenuItem value="Replaced">Replaced</MenuItem>
                          <MenuItem value="Welded">Welded</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Rusted">Rusted</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Cowl Top*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={cowlTop}
                          label="Cowl Top*"
                          onChange={handleInput}
                          name='cowlTop'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Repaired">Repaired</MenuItem>
                          <MenuItem value="Repainted">Repainted</MenuItem>
                          <MenuItem value="Replaced">Replaced</MenuItem>
                          <MenuItem value="Welded">Welded</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Rusted">Rusted</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Roof*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={roof}
                          label="Roof*"
                          onChange={handleInput}
                          name='roof'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Repaired">Repaired</MenuItem>
                          <MenuItem value="Repainted">Repainted</MenuItem>
                          <MenuItem value="Replaced">Replaced</MenuItem>
                          <MenuItem value="Dented">Dented</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Rusted">Rusted</MenuItem>
                          <MenuItem value="Faded">Faded</MenuItem>
                          <MenuItem value="Scratched">Scratched</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Front Bumper*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={frontBumper}
                          label="Front Bumper*"
                          onChange={handleInput}
                          name='frontBumper'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Repaired">Repaired</MenuItem>
                          <MenuItem value="Repainted">Repainted</MenuItem>
                          <MenuItem value="Replaced">Replaced</MenuItem>
                          <MenuItem value="Dented">Dented</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Rusted">Rusted</MenuItem>
                          <MenuItem value="Faded">Faded</MenuItem>
                          <MenuItem value="Scratched">Scratched</MenuItem>
                          <MenuItem value="Grill Damaged">Grill Damaged</MenuItem>
                          <MenuItem value="Welded">Welded</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lhs Headlamp*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsHeadlamp}
                          label="Lhs Headlamp*"
                          onChange={handleInput}
                          name='lhsHeadlamp'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Repaired">Repaired</MenuItem>
                          <MenuItem value="Not Working">Not Working</MenuItem>
                          <MenuItem value="Missing">Missing</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Scratched">Scratched</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Rhs Headlamp*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsHeadlamp}
                          label="Rhs Headlamp*"
                          onChange={handleInput}
                          name='rhsHeadlamp'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Repaired">Repaired</MenuItem>
                          <MenuItem value="Not Working">Not Working</MenuItem>
                          <MenuItem value="Missing">Missing</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Scratched">Scratched</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lhs Foglamp*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsFoglamp}
                          label="Lhs Foglamp*"
                          onChange={handleInput}
                          name='lhsFoglamp'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Repaired">Repaired</MenuItem>
                          <MenuItem value="Not Working">Not Working</MenuItem>
                          <MenuItem value="Missing">Missing</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Scratched">Scratched</MenuItem>
                          <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Rhs Foglamp*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsFoglamp}
                          label="Rhs Foglamp*"
                          onChange={handleInput}
                          name='rhsFoglamp'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Repaired">Repaired</MenuItem>
                          <MenuItem value="Not Working">Not Working</MenuItem>
                          <MenuItem value="Missing">Missing</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Scratched">Scratched</MenuItem>
                          <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lhs Fender*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsFender}
                          label="Lhs Fender*"
                          onChange={handleInput}
                          name='lhsFender'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Repaired">Repaired</MenuItem>
                          <MenuItem value="Repainted">Repainted</MenuItem>
                          <MenuItem value="Replaced">Replaced</MenuItem>
                          <MenuItem value="Dented">Dented</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Rusted">Rusted</MenuItem>
                          <MenuItem value="Faded">Faded</MenuItem>
                          <MenuItem value="Scratched">Scratched</MenuItem>
                          <MenuItem value="Inner Wheel Housing Rusted">Inner Wheel Housing Rusted</MenuItem>
                          <MenuItem value="Inner Lining Missing/Broken">Inner Lining Missing/Broken</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lhs FrontAlloy*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsFrontAlloy}
                          label="Lhs FrontAlloy*"
                          onChange={handleInput}
                          name='lhsFrontAlloy'
                          required
                        >
                           <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                           <MenuItem value="Scratched">Scratched</MenuItem>
                           <MenuItem value="Damaged">Damaged</MenuItem>
                           <MenuItem value="Okay">Okay</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lhs Front Tyre*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsFrontTyre}
                          label="Lhs Front Tyre*"
                          onChange={handleInput}
                          name='lhsFrontTyre'
                          required
                        >
                           <MenuItem value="Chinese Tyre">Chinese Tyre</MenuItem>
                           <MenuItem value="Resoaled">Resoaled</MenuItem>
                           <MenuItem value="Damaged">Damaged</MenuItem>
                           <MenuItem value="Tyre Life (10%-29%)">Tyre Life (10%-29%)</MenuItem>
                           <MenuItem value="Tyre Life (30%-49%)">Tyre Life (30%-49%)</MenuItem>
                           <MenuItem value="Tyre Life (50%-79%)">Tyre Life (50%-79%)</MenuItem>
                           <MenuItem value="Tyre Life (80%-100%)">Tyre Life (80%-100%)</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lhs Orvm*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsOrvm}
                          label="Lhs Orvm*"
                          onChange={handleInput}
                          name='lhsOrvm'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                           <MenuItem value="Repaired">Repaired</MenuItem>
                           <MenuItem value="Not Working">Not Working</MenuItem>
                           <MenuItem value="Missing">Missing</MenuItem>
                           <MenuItem value="Damaged">Damaged</MenuItem>
                           <MenuItem value="Scratched">Scratched</MenuItem>
                           <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                           <MenuItem value="Indicator Broken / Not Working">Indicator Broken / Not Working</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lhs A Pillar*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsAPillar}
                          label="Lhs A Pillar*"
                          onChange={handleInput}
                          name='lhsAPillar'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                           <MenuItem value="Repaired">Repaired</MenuItem>
                           <MenuItem value="Repainted">Repainted</MenuItem>
                           <MenuItem value="Replaced">Replaced</MenuItem>
                           <MenuItem value="Dented">Dented</MenuItem>
                           <MenuItem value="Damaged">Damaged</MenuItem>
                           <MenuItem value="Rusted">Rusted</MenuItem>
                           <MenuItem value="Faded">Faded</MenuItem>
                           <MenuItem value="Scratched">Scratched</MenuItem>
                           <MenuItem value="Rubber Beading Torn or Missing">Rubber Beading Torn or Missing</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lhs Front Door*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsFrontDoor}
                          label="Lhs Front Door*"
                          onChange={handleInput}
                          name='lhsFrontDoor'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                           <MenuItem value="Repaired">Repaired</MenuItem>
                           <MenuItem value="Repainted">Repainted</MenuItem>
                           <MenuItem value="Replaced">Replaced</MenuItem>
                           <MenuItem value="Dented">Dented</MenuItem>
                           <MenuItem value="Damaged">Damaged</MenuItem>
                           <MenuItem value="Rusted">Rusted</MenuItem>
                           <MenuItem value="Faded">Faded</MenuItem>
                           <MenuItem value="Scratched">Scratched</MenuItem>
                           <MenuItem value="Not Opening">Not Opening</MenuItem>
                           <MenuItem value="Hinges Rusted">Hinges Rusted</MenuItem>
                           <MenuItem value="Handel Broken or not Working">Handel Broken or not Working</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lhs B Pillar*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsBPillar}
                          label="Lhs B Pillar*"
                          onChange={handleInput}
                          name='lhsBPillar'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                           <MenuItem value="Repaired">Repaired</MenuItem>
                           <MenuItem value="Repainted">Repainted</MenuItem>
                           <MenuItem value="Replaced">Replaced</MenuItem>
                           <MenuItem value="Dented">Dented</MenuItem>
                           <MenuItem value="Damaged">Damaged</MenuItem>
                           <MenuItem value="Rusted">Rusted</MenuItem>
                           <MenuItem value="Faded">Faded</MenuItem>
                           <MenuItem value="Scratched">Scratched</MenuItem>
                           <MenuItem value="Rubber Beading Torn or Missing">Rubber Beading Torn or Missing</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lhs Rear Door*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsRearDoor}
                          label="Lhs Rear Door*"
                          onChange={handleInput}
                          name='lhsRearDoor'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                           <MenuItem value="Repaired">Repaired</MenuItem>
                           <MenuItem value="Repainted">Repainted</MenuItem>
                           <MenuItem value="Replaced">Replaced</MenuItem>
                           <MenuItem value="Dented">Dented</MenuItem>
                           <MenuItem value="Damaged">Damaged</MenuItem>
                           <MenuItem value="Rusted">Rusted</MenuItem>
                           <MenuItem value="Faded">Faded</MenuItem>
                           <MenuItem value="Scratched">Scratched</MenuItem>
                           <MenuItem value="Not Opening">Not Opening</MenuItem>
                           <MenuItem value="Hinges Rusted">Hinges Rusted</MenuItem>
                           <MenuItem value="Handel Broken or not Working">Handel Broken or not Working</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lhs C Pillar*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsCPillar}
                          label="Lhs C Pillar*"
                          onChange={handleInput}
                          name='lhsCPillar'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                           <MenuItem value="Repaired">Repaired</MenuItem>
                           <MenuItem value="Repainted">Repainted</MenuItem>
                           <MenuItem value="Replaced">Replaced</MenuItem>
                           <MenuItem value="Dented">Dented</MenuItem>
                           <MenuItem value="Damaged">Damaged</MenuItem>
                           <MenuItem value="Rusted">Rusted</MenuItem>
                           <MenuItem value="Faded">Faded</MenuItem>
                           <MenuItem value="Scratched">Scratched</MenuItem>
                           <MenuItem value="Rubber Beading Torn or Missing">Rubber Beading Torn or Missing</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lhs Running Board*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsRunningBoard}
                          label="Lhs Running Board"
                          onChange={handleInput}
                          name='lhsRunningBoard'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                           <MenuItem value="Repaired">Repaired</MenuItem>
                           <MenuItem value="Repainted">Repainted</MenuItem>
                           <MenuItem value="Replaced">Replaced</MenuItem>
                           <MenuItem value="Dented">Dented</MenuItem>
                           <MenuItem value="Damaged">Damaged</MenuItem>
                           <MenuItem value="Rusted">Rusted</MenuItem>
                           <MenuItem value="Scratched">Scratched</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lhs Rear Alloy*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsRearAlloy}
                          label="Lhs Rear Alloy*"
                          onChange={handleInput}
                          name='lhsRearAlloy'
                          required
                        >
                           <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                           <MenuItem value="Scratched">Scratched</MenuItem>
                           <MenuItem value="Damaged">Damaged</MenuItem>
                           <MenuItem value="Okay">Okay</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lhs Rear Tyre*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsRearTyre}
                          label="Lhs Rear Tyre*"
                          onChange={handleInput}
                          name='lhsRearTyre'
                          required
                        >
                           <MenuItem value="Chinese Tyre">Chinese Tyre</MenuItem>
                           <MenuItem value="Resoaled">Resoaled</MenuItem>
                           <MenuItem value="Damaged">Damaged</MenuItem>
                           <MenuItem value="Tyre Life (10%-29%)">Tyre Life (10%-29%)</MenuItem>
                           <MenuItem value="Tyre Life (30%-49%)">Tyre Life (30%-49%)</MenuItem>
                           <MenuItem value="Tyre Life (50%-79%)">Tyre Life (50%-79%)</MenuItem>
                           <MenuItem value="Tyre Life (80%-100%)">Tyre Life (80%-100%)</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lhs Quarter Panel*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsQuarterPanel}
                          label="Lhs Quarter Panel"
                          onChange={handleInput}
                          name='lhsQuarterPanel'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                           <MenuItem value="Repaired">Repaired</MenuItem>
                           <MenuItem value="Repainted">Repainted</MenuItem>
                           <MenuItem value="Replaced">Replaced</MenuItem>
                           <MenuItem value="Dented">Dented</MenuItem>
                           <MenuItem value="Damaged">Damaged</MenuItem>
                           <MenuItem value="Rusted">Rusted</MenuItem>
                           <MenuItem value="Faded">Faded</MenuItem>
                           <MenuItem value="Scratched">Scratched</MenuItem>
                           <MenuItem value="Inner Wheel Housing Rusted">Inner Wheel Housing Rusted</MenuItem>
                           <MenuItem value="Inner Lining Missing/Broken">Inner Lining Missing/Broken</MenuItem>
                           <MenuItem value="Fuel Lid Lock Rusted">Fuel Lid Lock Rusted</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Rear Bumper*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rearBumper}
                          label="Rear Bumper*"
                          onChange={handleInput}
                          name='rearBumper'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Repaired">Repaired</MenuItem>
                          <MenuItem value="Repainted">Repainted</MenuItem>
                          <MenuItem value="Replaced">Replaced</MenuItem>
                          <MenuItem value="Dented">Dented</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Rusted">Rusted</MenuItem>
                          <MenuItem value="Faded">Faded</MenuItem>
                          <MenuItem value="Scratched">Scratched</MenuItem>
                          <MenuItem value="Grill Damaged">Grill Damaged</MenuItem>
                          <MenuItem value="Welded">Welded</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lhs Tail Lamp*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsTailLamp}
                          label="Lhs Tail Lamp*"
                          onChange={handleInput}
                          name='lhsTailLamp'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Repaired">Repaired</MenuItem>
                          <MenuItem value="Not Working">Not Working</MenuItem>
                          <MenuItem value="Missing">Missing</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Scratched">Scratched</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Rhs Tail Lamp*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsTailLamp}
                          label="Rhs Tail Lamp*"
                          onChange={handleInput}
                          name='rhsTailLamp'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Repaired">Repaired</MenuItem>
                          <MenuItem value="Not Working">Not Working</MenuItem>
                          <MenuItem value="Missing">Missing</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Scratched">Scratched</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Rear Windshield*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rearWindshield}
                          label="Rear Windshield*"
                          onChange={handleInput}
                          name='rearWindshield'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Spots">Spots</MenuItem>
                          <MenuItem value="Replaced">Replaced</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Scratched">Scratched</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Boot Door*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={bootDoor}
                          label="Boot Door*"
                          onChange={handleInput}
                          name='bootDoor'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                           <MenuItem value="Repaired">Repaired</MenuItem>
                           <MenuItem value="Repainted">Repainted</MenuItem>
                           <MenuItem value="Replaced">Replaced</MenuItem>
                           <MenuItem value="Dented">Dented</MenuItem>
                           <MenuItem value="Damaged">Damaged</MenuItem>
                           <MenuItem value="Rusted">Rusted</MenuItem>
                           <MenuItem value="Faded">Faded</MenuItem>
                           <MenuItem value="Scratched">Scratched</MenuItem>
                           <MenuItem value="Not Opening">Not Opening</MenuItem>
                           <MenuItem value="Hinges Rusted">Hinges Rusted</MenuItem>
                           <MenuItem value="Handel Broken or not Working">Handel Broken or not Working</MenuItem>
                           <MenuItem value="Boot Lock Rusted">Boot Lock Rusted</MenuItem>
                           <MenuItem value="Sensor Not Working">Sensor Not Working</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Spare Tyre*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={spareTyre}
                          label="Spare Tyre*"
                          onChange={handleInput}
                          name='spareTyre'
                          required
                        >
                           <MenuItem value="Chinese Tyre">Chinese Tyre</MenuItem>
                           <MenuItem value="Resoaled">Resoaled</MenuItem>
                           <MenuItem value="Damaged">Damaged</MenuItem>
                           <MenuItem value="Tyre Life (10%-29%)">Tyre Life (10%-29%)</MenuItem>
                           <MenuItem value="Tyre Life (30%-49%)">Tyre Life (30%-49%)</MenuItem>
                           <MenuItem value="Tyre Life (50%-79%)">Tyre Life (50%-79%)</MenuItem>
                           <MenuItem value="Tyre Life (80%-100%)">Tyre Life (80%-100%)</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Boot Floor*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={bootFloor}
                          label="Boot Floor*"
                          onChange={handleInput}
                          name='bootFloor'
                          required
                        >
                           <MenuItem value="Okay">Okay</MenuItem>
                           <MenuItem value="Repaired">Repaired</MenuItem>
                           <MenuItem value="Replaced">Replaced</MenuItem>
                           <MenuItem value="Dented">Dented</MenuItem>
                           <MenuItem value="Damaged">Damaged</MenuItem>
                           <MenuItem value="Rusted">Rusted</MenuItem>
                           <MenuItem value="Sealant Broken">Sealant Broken</MenuItem>
                           <MenuItem value="Cracked">Cracked</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                </Grid>
                <Box className={`${dashboardStyles.tm_dashboard_img_upl} ${"tm_dashboard_img_upl_gb"}`}>
                  
                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Exterior Images <Box sx={{color:"red"}}>{error}</Box></Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='electricalImages' hidden />
                          </Button>
                          
                        </Box>                        
                      </Grid>
                       {/* <Grid item md={9}>
                         {ThumbnailPhotos.length > 0 &&
                          ThumbnailPhotos.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={URL.createObjectURL(element)}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
                        </Grid> */}
                      </Grid>
                  </Box>
                  
                </Box>
                
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