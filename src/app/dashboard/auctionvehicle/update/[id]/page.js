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
import { Margin } from '@mui/icons-material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {vehicleApi} from '../../../../../app/service/vehicle';
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
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';




function Update({ params }) {  

  const router = useRouter()
  

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
  

  const [allCarImage, setAllcarImage] = useState([]);
  const [thumbImage, setThumbImage] = useState(null);

  const [error, setError] = useState("");
  const [auctionCarDatails, setAuctionCarDetails] = useState();
  const [thumbImages, setThumbImages] = useState([]);
  const [extImages,setExtImages]=useState([]);
  const [intImages,setIntImages]=useState([]);
  const [engineImages,setEngineImages]=useState([]);
  const [tyreImages,settyreImages]=useState([]);
  const [dentImages,setdentImages]=useState([]);


  

  const [docId,setDocid]=useState(null);
  const [carsoldStatus,setCarsoldStatus]=useState(null);

  const [auctionDetails,setAuctionDetails]=useState([]);

 
  
  useEffect(() => {
    getMakeModel();
    getBodytype();
    getFueltype();
    getOwnertype();
    getColor();
    getRto();
    getSeat();
    getCarFeatureList([]);
    // getAuctionCarDetails([]);
  
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
        const data={id:params.id};
        setDocid(params.id);
        const getAuctionDetails = await vehicleApi.getAuctionDetails(data);
        if (getAuctionDetails.data.status === 200)
        {
            setAuctionDetails(getAuctionDetails.data.data);
            setCarsoldStatus(getAuctionDetails.data.data.isSoldOut);

            //startAuction
            if(getAuctionDetails.data.data.startTime!=0)
            {
              const date = new Date(getAuctionDetails.data.data.startTime);
              const year = date.getFullYear();
              const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
              const day = date.getDate().toString().padStart(2, '0');
              const hours = date.getHours().toString().padStart(2, '0');
              const minutes = date.getMinutes().toString().padStart(2, '0');
              const AuctionStartTime = `${year}-${month}-${day}T${hours}:${minutes}`;
              setAuctionStartTime(dayjs(AuctionStartTime));
            }
            

            //endAuction
            if(getAuctionDetails.data.data.endTime!=0)
            {
              const date2 = new Date(getAuctionDetails.data.data.endTime);
              const year2 = date2.getFullYear();
              const month2 = (date2.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
              const day2 = date2.getDate().toString().padStart(2, '0');
              const hours2 = date2.getHours().toString().padStart(2, '0');
              const minutes2 = date2.getMinutes().toString().padStart(2, '0');
              const AuctionEndTime = `${year2}-${month2}-${day2}T${hours2}:${minutes2}`;
              setAuctionEndTime(dayjs(AuctionEndTime));
            }
            

            setThumbImage(getAuctionDetails.data.data.carDetails.imagePath);
            
        }

        const response2 = await vehicleApi.getAuctionCarDetails(data);
            // console.log(response2.data.data);
          if (response2.data.status === 200) {
            const result=response2.data.data;
            // console.log(result);
            setAuctionCarDetails(result);
            setcarPrice(result.carPrice);
            setBrand(result.properties.brand);

            const filteredResult = response.data.data.filter((item) => item.name == result.properties.brand);
            setModelList(filteredResult[0].models);

            setModel(result.properties.model);
            const filteredResult2 = filteredResult[0].models.filter((item) => item.name == result.properties.model);
            // console.log(filteredResult2[0].variants.length);
            if(filteredResult2[0].variants.length>0)
            {
              setVariantList(filteredResult2[0].variants);
            }
            setVariant(result.properties.variant);
            setregYear(result.properties.registrationYear);
            setbodyType(result.properties.bodyType);
            setfuelType(result.properties.fuelType);
            setTransmission(result.properties.transmission);
            setownerType(result.properties.ownerType);
            setColor(result.properties.color);
            setRto(result.properties.rtoLocation);
            setkmsDriven(result.properties.kmsDriven);
            setDescription(result.properties.carDescription);
            setSeat(result.properties.seat);
            setMileage(result.properties.mileage);
            setEngine(result.properties.engineCC);
            setmaxPower(result.properties.maxPower);
            setMaxTorque(result.properties.maxTorque);
            setNoc(result.properties.noc);
            setmfgYear(result.properties.manufacturingYear);
            setInspectionReport(result.properties.inspectionReport);
            setAllcarImage(result.images);

            if(result.properties.insuranceValidity!=0)
            {
              const date = new Date(result.properties.insuranceValidity);
              // dayjs('2022-04-17')
              setInsuranceValidity(dayjs(date.toLocaleDateString('en-US')));
            }
            
            if(result.properties.roadTaxValidity!=0)
            {
              const date2 = new Date(result.properties.roadTaxValidity);
              setRoadTaxValidity(dayjs(date2.toLocaleDateString('en-US')));
            }
           

            
            
            // setInsuranceValidity(result.properties.insuranceValidity);

            // const date2 = new Date(result.properties.roadTaxValidity);
            // const month2 = (date2.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
            // const day2 = date2.getDate().toString().padStart(2, '0');
            // const year2 = date2.getFullYear();
            // const formattedDate2 = `${month2}/${day2}/${year2}`;
            // setRoadTaxValidity(formattedDate2);

            setInspectionScore(result.properties.inspectionScore);
            

            const thumbImages = result.images.filter((item) => item.type == "THUMB");
            setThumbImages(thumbImages);

            const extImages = result.images.filter((item) => item.type == "EXT");
            setExtImages(extImages);

            const intImages = result.images.filter((item) => item.type == "INT");
            setIntImages(intImages);

            const engineImages = result.images.filter((item) => item.type == "ENGINE");
            setEngineImages(engineImages);

            const tyreImages = result.images.filter((item) => item.type == "TYRE");
            settyreImages(tyreImages);

            const dentImages = result.images.filter((item) => item.type == "DENT");
            setdentImages(dentImages);

            setComforts(result.properties.comfort);
            setSafety(result.properties.safety);
            setInterior(result.properties.interior);
            setExterior(result.properties.exterior);
            setEntertainment(result.properties.entertainment);


            
          } 
      } 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // const getAuctionCarDetails = async ()=>{
  //   const data={id:params.id};
  //   try {
  //     const response = await vehicleApi.getAuctionCarDetails(data);
  //           // console.log(response.data.data);
  //     if (response.data.status === 200) {
  //       const result=response.data.data;
  //       console.log(result);
  //       setAuctionCarDetails(result);
  //       setcarPrice(result.carPrice);
  //       setBrand(result.properties.brand);

  //       console.log(brandlist);
  //       const filteredResult = brandlist.filter((item) => item.name == result.properties.brand);
  //       setModelList(filteredResult[0].models);

  //       setModel(result.properties.model);
  //       const filteredResult2 = modellist.filter((item) => item.name == result.properties.model);
  //       // console.log(filteredResult2[0].variants.length);
  //       if(filteredResult2[0].variants.length>0)
  //       {
  //         setVariantList(filteredResult2[0].variants);
  //       }
  //       setVariant(result.properties.variant);
        
  //     } 
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }

  

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
      
      // console.log(e.target.files[0].size);
      if(e.target.files[0].size<500000)
      {
          setThumbnailPhotos([...ThumbnailPhotos, e.target.files[0]]);
          uploadAuctionImage(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 500kb!")
      }
      
      
    }

    if (e.target.name === 'ExteriorPhotos' && e.target.files.length > 0) {
      // console.log(e.target.files);
      if(e.target.files[0].size<500000)
      {
          setExteriorPhotos([...ExteriorPhotos, e.target.files[0]]);
          uploadAuctionImage2(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 500kb!")
      }
      
    }

    if (e.target.name === 'InteriorPhotos' && e.target.files.length > 0) {
      // console.log(e.target.files);
      if(e.target.files[0].size<500000)
      {
          setInteriorPhotos([...InteriorPhotos, e.target.files[0]]);
          uploadAuctionImage3(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 500kb!")
      }
      
    }

    if (e.target.name === 'EnginePhotos' && e.target.files.length > 0) {
      // console.log(e.target.files);
      if(e.target.files[0].size<500000)
      {
          setEnginePhotos([...EnginePhotos, e.target.files[0]]);
          uploadAuctionImage4(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 500kb!")
      }
      
    }

    if (e.target.name === 'TyresPhotos' && e.target.files.length > 0) {
      // console.log(e.target.files);
      if(e.target.files[0].size<500000)
      {
          setTyresPhotos([...TyresPhotos, e.target.files[0]]);
          uploadAuctionImage5(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 500kb!")
      }
      
    }

    if (e.target.name === 'DentsPhotos' && e.target.files.length > 0) {
      // console.log(e.target.files);
      if(e.target.files[0].size<500000)
      {
          setDentsPhotos([...DentsPhotos, e.target.files[0]]);
          uploadAuctionImage6(e.target.files[0]);
      }
      else
      {
          alert("Image size should be less than 500kb!")
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
    // console.log(newDate);
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
    setThumbImage(response.data.data.path);

    
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




  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // console.log(allCarImage);
    // console.log(thumbImage);
  

    if(thumbImage==null)
    {
        setError("Thumbnail Photo is required!")
    }
    else
    {

      setError("");

    const formData={docId,auctionStartTime,auctionEndTime,carsoldStatus,thumbImage,allCarImage,brand,model,variant,regYear,bodyType,fuelType,transmission,ownerType,color,rto,kmsDriven,carPrice,description,seat,mileage,engine,maxPower,maxTorque,noc,mfgYear,inspectionReport,insuranceValidity,roadTaxValidity,inspectionScore,comforts,safety,interior,exterior,entertainment};
    
    console.log(formData);
    
    const response = await vehicleApi.updateAuctionVehicle(formData);
    if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
      // setPopupopen(true);
      confirm("Car updated successfully");
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
                  <Typography variant='h3'>Update your car!  </Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
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
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Registration Year *</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={regYear}
                          label="Registration Year *"
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
                        <InputLabel id="demo-simple-select-label">Select Body Type *</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={bodyType}
                          label="Select Body Type *"
                          onChange={handleInput}
                          name='bodyType'
                          required
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
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Transmission*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={transmission}
                          label="Select Transmission *"
                          onChange={handleInput}
                          name='transmission'
                          required
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
                        <InputLabel id="demo-simple-select-label">Select Owner Type*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={ownerType}
                          label="Select Owner Type *"
                          onChange={handleInput}
                          name='ownerType'
                          required
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
                        <InputLabel id="demo-simple-select-label">Select Color*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={color}
                          label="Select Color *"
                          onChange={handleInput}
                          name='color'
                          required
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
                          label="Select RTO*"
                          onChange={handleInput}
                          name='rto'
                          required
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
                    <TextField id="outlined-basic" label="Kilometers Driven" onChange={handleInput} name='kmsDriven' value={kmsDriven} type="number" variant="outlined" required fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Your Selling Price" onChange={handleInput} name='carPrice' value={carPrice}  type="number" InputLabelProps={{shrink: true,}} variant="outlined" required fullWidth/>
                    </Box>
                  </Grid>
                  <Grid item md={12}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                    <TextField id="outlined-basic" label="Description" onChange={handleInput} name='description' value={description} variant="outlined" required fullWidth/>
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
                      <TextField id="outlined-basic" label="Mileage in kmpl" onChange={handleInput} name='mileage' type="number" value={mileage} variant="outlined" required fullWidth/>
                      </Box>
                  </Grid>                 
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="Engine (CC)" onChange={handleInput} name='engine' type="number" value={engine} variant="outlined" required fullWidth/>
                      </Box>
                  </Grid>
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="Max Power" onChange={handleInput} name='maxPower' type="number" value={maxPower} variant="outlined" required fullWidth/>
                      </Box>
                  </Grid>
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="Max Torque" onChange={handleInput} name='maxTorque' type="number" value={maxTorque} variant="outlined" required fullWidth/>
                      </Box>
                  </Grid>
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      
                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Noc*</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={noc}
                            label="Noc *"
                            onChange={handleInput}
                            name='noc'
                            required
                          >
                            
                            <MenuItem value='true'>True</MenuItem>
                            <MenuItem value='false'>False</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                  </Grid>
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="MFG Year" name='mfgYear' type="number" onChange={handleInput} value={mfgYear} variant="outlined" required fullWidth/>
                      </Box>
                  </Grid>
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="Inspection Report" onChange={handleInput} name='inspectionReport' value={inspectionReport} required variant="outlined" fullWidth/>
                      </Box>
                  </Grid>
                  <Grid item md={3}>
                        <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_date} ${"tm_dashboard_rightbar_form_date_gb"} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                          <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['DatePicker']}>
                              <DatePicker label="Insurance Validity" onChange={handleInsuranceDate} format="DD-MM-YYYY" value={insuranceValidity}  sx={{width:'100%'}} required/>
                            </DemoContainer>
                          </LocalizationProvider>
                        </Box>
                    </Grid>
                    <Grid item md={3}>
                        <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_date} ${"tm_dashboard_rightbar_form_date_gb"} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                              <DatePicker label="Road Tax Validity" onChange={handleRoadTaxValidityDate} format="DD-MM-YYYY" value={roadTaxValidity} sx={{width:'100%'}} required/>
                            </DemoContainer>
                          </LocalizationProvider>
                          
                        </Box>
                    </Grid>
                    <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_date_time} ${"tm_dashboard_rightbar_form_date_time_gb"} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker label="Auction Start Time" onChange={handleAuctionStartTime} format="DD-MM-YYYY HH:mm" value={auctionStartTime} sx={{width:'100%'}} required />
                          </DemoContainer>
                        </LocalizationProvider>
                        
                        
                      </Box>
                    </Grid>
                    <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_date_time} ${"tm_dashboard_rightbar_form_date_time_gb"} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker label="Auction End Time" onChange={handleAuctionEndTime} format="DD-MM-YYYY HH:mm" value={auctionEndTime} sx={{width:'100%'}} required />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Box>
                    </Grid>
        
                  
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
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      {/* <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Car Sold Status</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={carsoldStatus}
                            label="Car Sold Status"
                            onChange={handleInput}
                            name='carsoldStatus'
                            helperText="Please select your currency"
                          >
                            
                            <MenuItem value='true'>Yes</MenuItem>
                            <MenuItem value='false'>No</MenuItem>
                          </Select>
                        </FormControl> */}
                        <TextField
                          id="outlined-select-currency-native"
                          select
                          label="Car Sold Status"
                          defaultValue={carsoldStatus}
                          onChange={handleInput}
                          name='carsoldStatus'
                          SelectProps={{
                            native: true,
                          }}
                          fullWidth
                          // helperText="Please select your currency"
                        >
                            <option key="1" value="true">Yes </option>
                            <option key="2" value="false">No </option>
                        </TextField>
                      </Box>
                  </Grid>
                  
                </Grid>
                <Box className={`${dashboardStyles.tm_dashboard_img_upl} ${"tm_dashboard_img_upl_gb"}`}>
                  <Box className={dashboardStyles.tm_dashboard_img_upl_title}>
                    <Typography variant='h4'>Upload images</Typography>
                  </Box>
                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Add Thumbnail Photos (Upload only 1 Photo) <Box sx={{color:"red"}}>{error}</Box></Typography>
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
                      
                      
                      {thumbImages.length > 0 &&
                          thumbImages.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={element.path}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}

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
                      {extImages.length > 0 &&
                          extImages.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box>
                                  <Image
                                    src={element.path}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
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
                        </Grid>
                      </Grid>
                  </Box>

                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Add Interior Photos (Upload only 5 Photo)</Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='InteriorPhotos' hidden />
                          </Button>
                        </Box>                        
                      </Grid>
                      <Grid item md={9}>
                      {intImages.length > 0 &&
                          intImages.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={element.path}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
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
                        </Grid>
                      </Grid>
                  </Box>

                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Add Engine Photos (Upload only 5 Photo)</Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='EnginePhotos' hidden />
                          </Button>
                        </Box>                        
                      </Grid>
                      <Grid item md={9}>
                      {engineImages.length > 0 &&
                          engineImages.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={element.path}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}

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
                        
                        </Grid>
                      </Grid>
                  </Box>

                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Add Tyre Photos (Upload only 5 Photo)</Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='TyresPhotos' hidden />
                          </Button>
                        </Box>                        
                      </Grid>
                      <Grid item md={9}>
                      {tyreImages.length > 0 &&
                          tyreImages.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={element.path}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
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
                        </Grid>
                      </Grid>
                  </Box>

                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Add Dent Photos (Upload only 5 Photo)</Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='DentsPhotos' hidden />
                          </Button>
                        </Box>                        
                      </Grid>
                      <Grid item md={9}>
                      
                      {dentImages.length > 0 &&
                          dentImages.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={element.path}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveImage(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
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
                        </Grid>
                      </Grid>
                  </Box>

                
                  
                </Box>

                <Box sx={{margin:'50px 0 0'}}>
                  <Grid container spacing={4}>
                    
                    
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

export default Update