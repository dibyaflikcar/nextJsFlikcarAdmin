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


import CircularProgress from '@mui/material/CircularProgress';

import { useRouter } from 'next/navigation';




function Create() {  

  const router = useRouter()

  // Basic Document Part
  const [years, setYears] = useState([]);
  const [carList,setCarList]=useState([]);
  const [inspectorList,setInspectorList]=useState([]);

  const [vehicle, setVehicle]=useState("");
  const [inspector, setInspector]=useState("");
  const [custContactNo, setCustContactNo]=useState("");
  const [cityList, setCityList]=useState([]);
  const [city, setCity]=useState("");
  const [regType, setRegType]=useState("");
  const [regNo, setRegNo]=useState("");
  const [rcAvailability, setRcAvailability]=useState("");
  const [rcCondition, setRcCondition]=useState("");
  const [regDate, setRegistrationDate]=useState(null);
  const [fitnessUpto, setFitnessuptoDate]=useState(null);
  const [tobeScraped, setTobeScraped]=useState(null);
  const [regState, setRegState]=useState(null);
  const [rtoList, setrtoList]=useState([]);
  const [rto, setRto]=useState(null);
  const [ownerSerialNo, setOwnerSerialNo]=useState(null);
  const [brandlist, setBrandlist] = useState([]);
  const [brand, setBrand] = useState(null);
  const [modellist, setModelList] = useState([]);
  const [model, setModel] = useState(null);
  const [variantList, setVariantList] = useState([]);
  const [variant, setVariant] = useState(null);
  const [engineNo, setEngineNo] = useState(null);
  const [chassisNo, setChassisNo] = useState(null);
  const [regOwnerName, setRegOwnerName] = useState(null);
  const [mfgMonth, setMfgMonth] = useState(null);
  const [mfgYear, setMfgYear] = useState(null);
  const [fuelTypelist, setfuelTypelist]=useState([]);
  const [fuelType, setfuelType]=useState(null);
  const [cc, setCC]=useState(null);
  const [hypoDetails, setHypoDetails]=useState(null);
  const [seatList, setseatList]=useState([]);
  const [seat, setSeat]=useState(null);
  const [missmatchRC, setMissmatchRC]=useState(null);
  const [roadTaxValidity, setRoadTaxValidity]=useState(null);
  const [roadTaxValidUpto, setRoadTaxValidUpto]=useState(null);
  const [insurance, setInsurance]=useState(null);
  const [insuranceValidity, setInsuranceValidity]=useState(null);
  const [noClaimBonus, setNoClaimBonus]=useState(null);
  const [missmatchInsurance, setMissmatchInsurance]=useState(null);
  const [duplicateKey, setDuplicateKey]=useState(null);
  const [rtoNoc, setRtoNoc]=useState(null);
  const [rtoNocIssueDate, setRtoNocIssueDate]=useState(null);
  const [commentsOnBasic, setCommentsOnBasic] = useState([]);
  const [rcAvailabilityImages, setRcAvailabilityImages] = useState([]);
  const [chassisImages, setChassisImages] = useState([]);
  const [hypoImages, setHypoImages] = useState([]);
  const [roadTaxValidityImages, setRoadTaxValidityImages] = useState([]);
  const [insuranceImages, setInsuranceImages] = useState([]);
  const [duplicateKeyImages, setDuplicateKeyImages] = useState([]);
  const [rtoNocImages, setRtoNocImages] = useState([]);
  const [isLoader,setLoader]=useState(false);
  const [isLoader2,setLoader2]=useState(false);
  const [isLoader3,setLoader3]=useState(false);
  const [isLoader4,setLoader4]=useState(false);
  const [isLoader5,setLoader5]=useState(false);
  const [isLoader6,setLoader6]=useState(false);
  const [isLoader7,setLoader7]=useState(false);
  const [engine, setEngine]=useState(null);
  const [battery, setBattery]=useState(null);
  const [coolant, setCoolant]=useState(null);
  const [engineOilDipstick, setEngineOilDipstick]=useState(null);
  const [engineOil, setEngineOil]=useState(null);
  const [engineMount, setEngineMount]=useState(null);
  const [engineBlowbyStatus, setEngineBlowbyStatus]=useState(null);
  const [exhaustSmoke, setExhaustSmoke]=useState(null);
  const [radiator, setRadiator]=useState(null);
  const [clutch, setClutch]=useState(null);
  const [gear, setGear]=useState(null);
  const [steering, setSteering]=useState(null);
  const [brake, setBrake]=useState(null);
  const [suspension, setSuspension]=useState(null);
  const [commentsOnEngine, setCommentsOnEngine] = useState([]);
  const [commentsOnTransmission, setCommentsOnTransmission] = useState([]);
  const [fuelLevel, setFuelLevel]=useState(null);
  const [electrical, setElectrical]=useState(null);
  const [rearWiper, setRearWiper]=useState(null);
  const [rearDefogger, setRearDefogger]=useState(null);
  const [powerWindow, setPowerWindow]=useState(null);
  const [rhsFrontPW, setRhsFrontPW]=useState(null);
  const [lhsFrontPW, setLhsFrontPW]=useState(null);
  const [lhsRearPW, setLhsRearPW]=useState(null);
  const [rhsRearPW, setRhsRearPW]=useState(null);
  const [leatherSeats, setLeatherSeats]=useState(null);
  const [fabricSeats, setFabricSeats]=useState(null);
  const [commentsOnInterior, setCommentsOnInterior] = useState([]);
  const [commentsOnElectrical, setCommentsOnElectrical] = useState([]);
  const [bonnet, setBonnet]=useState(null);
  const [upperCrossMember, setUpperCrossMember]=useState(null);
  const [lowerCrossMember, setLowerCrossMember]=useState(null);
  const [radiatorSupport, setRadiatorSupport]=useState(null);
  const [headlightSupport, setHeadlightSupport]=useState(null);
  const [lhsApron, setLhsApron]=useState(null);
  const [rhsApron, setRhsApron]=useState(null);
  const [frontWindshield, setFrontWindshield]=useState(null);
  const [firewall, setFirewall]=useState(null);
  const [cowlTop, setCowlTop]=useState(null);
  const [roof, setRoof]=useState(null);
  const [frontBumper, setFrontBumper]=useState(null);
  const [lhsHeadlamp, setLhsHeadlamp]=useState(null);
  const [rhsHeadlamp, setRhsHeadlamp]=useState(null);
  
  


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
    getCarList();
    getInspectorList();
  
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    const yearsArray = [];
    for (let year = startYear; year <= currentYear; year++) {
      yearsArray.push(year);
    }
    setYears(yearsArray);

  }, []); 

  const getCarList = async () => {
    try {
      const response = await vehicleApi.getAuction();
            // console.log(response.data.data);
      if (response.data.status === 200) {
          setCarList(response.data.data.reverse());
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getInspectorList = async () => {
    try {
      const response = await vehicleApi.getInspectorList();
            // console.log(response.data.data);
      if (response.data.status === 200) {
        setInspectorList(response.data.data.reverse());
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
    
    // Basic Document Part
    if (e.target.name === 'vehicle') {
      setVehicle(e.target.value);
    }
    if (e.target.name === 'inspector') {
      setInspector(e.target.value);
    }
    if (e.target.name === 'custContactNo') {
      setCustContactNo(e.target.value);
    }
    if (e.target.name === 'city') {
      setCity(e.target.value);
    }
    if (e.target.name === 'regType') {
      setRegType(e.target.value);
    }
    if (e.target.name === 'regNo') {
      setRegNo(e.target.value);
    }
    if (e.target.name === 'rcAvailability') {
      setRcAvailability(e.target.value);
    }
    if (e.target.name === 'rcCondition') {
      setRcCondition(e.target.value);
    }
    if (e.target.name === 'tobeScraped') {
      setTobeScraped(e.target.value);
    }
    if (e.target.name === 'regState') {
      setRegState(e.target.value);
    }
    if (e.target.name === 'rto') {
      setRto(e.target.value);
    }
    if (e.target.name === 'ownerSerialNo') {
      setOwnerSerialNo(e.target.value);
    }
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
    if(e.target.name === "engineNo")
    {
      setEngineNo(e.target.value);
    }
    if(e.target.name === "chassisNo")
    {
      setChassisNo(e.target.value);
    }
    if(e.target.name === "regOwnerName")
    {
      setRegOwnerName(e.target.value);
    }
    if(e.target.name === "mfgMonth")
    {
      setMfgMonth(e.target.value);
    }
    if(e.target.name === "mfgYear")
    {
      setMfgYear(e.target.value);
    }
    if (e.target.name === 'fuelType') {
      setfuelType(e.target.value);
    }
    if (e.target.name === 'cc') {
      setCC(e.target.value);
    }
    if (e.target.name === 'hypoDetails') {
      setHypoDetails(e.target.value);
    }
    if (e.target.name === 'seat') {
      setSeat(e.target.value);
    }
    if (e.target.name === 'missmatchRC') {
      setMissmatchRC(e.target.value);
    }
    if (e.target.name === 'roadTaxValidity') {
      setRoadTaxValidity(e.target.value);
    }
    if (e.target.name === 'insurance') {
      setInsurance(e.target.value);
    }
    if (e.target.name === 'noClaimBonus') {
      setNoClaimBonus(e.target.value);
    }
    if (e.target.name === 'missmatchInsurance') {
      setMissmatchInsurance(e.target.value);
    }
    if (e.target.name === 'duplicateKey') {
      setDuplicateKey(e.target.value);
    }
    if (e.target.name === 'rtoNoc') {
      setRtoNoc(e.target.value);
    }
    if (e.target.name === 'commentsOnBasic') {
      if (e.target.checked) {
        setCommentsOnBasic([...commentsOnBasic, e.target.value]);
      } else {
        setCommentsOnBasic(commentsOnBasic.filter((element) => Number(element) !== Number(e.target.value)));
      }
    }
    if (e.target.name === 'rcAvailabilityImages' && e.target.files.length > 0) {
        uploadInspectionImage(e.target.files[0]);
    }
    if (e.target.name === 'chassisImages' && e.target.files.length > 0) {
        uploadInspectionImage2(e.target.files[0]);
    }
    if (e.target.name === 'hypoImages' && e.target.files.length > 0) {
      uploadInspectionImage3(e.target.files[0]);
    }
    if (e.target.name === 'roadTaxValidityImages' && e.target.files.length > 0) {
      uploadInspectionImage4(e.target.files[0]);
    }
    if (e.target.name === 'insuranceImages' && e.target.files.length > 0) {
      uploadInspectionImage5(e.target.files[0]);
    }
    if (e.target.name === 'duplicateKeyImages' && e.target.files.length > 0) {
      uploadInspectionImage6(e.target.files[0]);
    }
    if (e.target.name === 'rtoNocImages' && e.target.files.length > 0) {
      uploadInspectionImage7(e.target.files[0]);
    }
    if (e.target.name === 'engine') {
      setEngine(e.target.value);
    }
    if (e.target.name === 'battery') {
      setBattery(e.target.value);
    }
    if (e.target.name === 'coolant') {
      setCoolant(e.target.value);
    }
    if (e.target.name === 'engineOilDipstick') {
      setEngineOilDipstick(e.target.value);
    }
    if (e.target.name === 'engineOil') {
      setEngineOil(e.target.value);
    }
    if (e.target.name === 'engineMount') {
      setEngineMount(e.target.value);
    }
    if (e.target.name === 'engineBlowbyStatus') {
      setEngineBlowbyStatus(e.target.value);
    }
    if (e.target.name === 'exhaustSmoke') {
      setExhaustSmoke(e.target.value);
    }
    if (e.target.name === 'radiator') {
      setRadiator(e.target.value);
    }
    if (e.target.name === 'clutch') {
      setClutch(e.target.value);
    }
    if (e.target.name === 'gear') {
      setGear(e.target.value);
    }
    if (e.target.name === 'steering') {
      setSteering(e.target.value);
    }
    if (e.target.name === 'brake') {
      setBrake(e.target.value);
    }
    if (e.target.name === 'suspension') {
      setSuspension(e.target.value);
    }
    if (e.target.name === 'commentsOnEngine') {
      if (e.target.checked) {
        setCommentsOnEngine([...commentsOnEngine, e.target.value]);
      } else {
        setCommentsOnEngine(commentsOnEngine.filter((element) => Number(element) !== Number(e.target.value)));
      }
    }
    if (e.target.name === 'commentsOnTransmission') {
      if (e.target.checked) {
        setCommentsOnTransmission([...commentsOnTransmission, e.target.value]);
      } else {
        setCommentsOnTransmission(commentsOnTransmission.filter((element) => Number(element) !== Number(e.target.value)));
      }
    }
    if (e.target.name === 'fuelLevel') {
      setFuelLevel(e.target.value);
    }
    if (e.target.name === 'electrical') {
      setElectrical(e.target.value);
    }
    if (e.target.name === 'rearWiper') {
      setRearWiper(e.target.value);
    }
    if (e.target.name === 'rearDefogger') {
      setRearDefogger(e.target.value);
    }
    if (e.target.name === 'powerWindow') {
      setPowerWindow(e.target.value);
    }
    if (e.target.name === 'rhsFrontPW') {
      setRhsFrontPW(e.target.value);
    }
    if (e.target.name === 'lhsFrontPW') {
      setLhsFrontPW(e.target.value);
    }
    if (e.target.name === 'lhsRearPW') {
      setLhsRearPW(e.target.value);
    }
    if (e.target.name === 'rhsRearPW') {
      setRhsRearPW(e.target.value);
    }
    if (e.target.name === 'leatherSeats') {
      setLeatherSeats(e.target.value);
    }
    if (e.target.name === 'fabricSeats') {
      setFabricSeats(e.target.value);
    }
    if (e.target.name === 'commentsOnInterior') {
      if (e.target.checked) {
        setCommentsOnInterior([...commentsOnInterior, e.target.value]);
      } else {
        setCommentsOnInterior(commentsOnInterior.filter((element) => Number(element) !== Number(e.target.value)));
      }
    }
    if (e.target.name === 'commentsOnElectrical') {
      if (e.target.checked) {
        setCommentsOnElectrical([...commentsOnElectrical, e.target.value]);
      } else {
        setCommentsOnElectrical(commentsOnElectrical.filter((element) => Number(element) !== Number(e.target.value)));
      }
    }
    if (e.target.name === 'bonnet') {
      setBonnet(e.target.value);
    }
    if (e.target.name === 'upperCrossMember') {
      setUpperCrossMember(e.target.value);
    }
    if (e.target.name === 'lowerCrossMember') {
      setLowerCrossMember(e.target.value);
    }
    if (e.target.name === 'radiatorSupport') {
      setRadiatorSupport(e.target.value);
    }
    if (e.target.name === 'headlightSupport') {
      setHeadlightSupport(e.target.value);
    }
    if (e.target.name === 'lhsApron') {
      setLhsApron(e.target.value);
    }
    if (e.target.name === 'rhsApron') {
      setRhsApron(e.target.value);
    }
    if (e.target.name === 'frontWindshield') {
      setFrontWindshield(e.target.value);
    }
    if (e.target.name === 'firewall') {
      setFirewall(e.target.value);
    }
    if (e.target.name === 'cowlTop') {
      setCowlTop(e.target.value);
    }
    if (e.target.name === 'roof') {
      setRoof(e.target.value);
    }
    if (e.target.name === 'frontBumper') {
      setFrontBumper(e.target.value);
    }
    if (e.target.name === 'lhsHeadlamp') {
      setLhsHeadlamp(e.target.value);
    }
    if (e.target.name === 'rhsHeadlamp') {
      setRhsHeadlamp(e.target.value);
    }
    
    
    

  }

  

  const handleRegistrationDate = (newDate) => {
    setRegistrationDate(newDate);
  };
  const handleFitnessuptoDate = (newDate) => {
    setFitnessuptoDate(newDate);
  };
  const handleRoadTaxValid = (newDate) => {
    setRoadTaxValidUpto(newDate);
  };
  const handleInsuranceValidity = (newDate) => {
    setInsuranceValidity(newDate);
  };
  const handleRtoNocIssueDate = (newDate) => {
    setRtoNocIssueDate(newDate);
  };
  
  
  const uploadInspectionImage= async (data)=>{
    const formData = new FormData();
      formData.append('file', data);
      setLoader(true);
    const response = await vehicleApi.uploadInspectionImage(formData);
    if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
      // console.log(response.data.data);
      setLoader(false);
      setRcAvailabilityImages([...rcAvailabilityImages, response.data.data.path]);
    }
    else
    {
      setLoader(false);
    }
  }
  const uploadInspectionImage2= async (data)=>{
    const formData = new FormData();
      formData.append('file', data);
      setLoader2(true);
    const response = await vehicleApi.uploadInspectionImage(formData);
    if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
      // console.log(response.data.data);
      setLoader2(false);
      setChassisImages([...chassisImages, response.data.data.path]);
    }
    else
    {
      setLoader2(false);
    }
  }

  const uploadInspectionImage3= async (data)=>{
    const formData = new FormData();
      formData.append('file', data);
      setLoader3(true);
    const response = await vehicleApi.uploadInspectionImage(formData);
    if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
      // console.log(response.data.data);
      setLoader3(false);
      setHypoImages([...hypoImages, response.data.data.path]);
    }
    else
    {
      setLoader3(false);
    }
  }

  const uploadInspectionImage4= async (data)=>{
    const formData = new FormData();
      formData.append('file', data);
      setLoader4(true);
    const response = await vehicleApi.uploadInspectionImage(formData);
    if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
      // console.log(response.data.data);
      setLoader4(false);
      setRoadTaxValidityImages([...roadTaxValidityImages, response.data.data.path]);
    }
    else
    {
      setLoader4(false);
    }
  }

  const uploadInspectionImage5= async (data)=>{
    const formData = new FormData();
      formData.append('file', data);
      setLoader5(true);
    const response = await vehicleApi.uploadInspectionImage(formData);
    if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
      // console.log(response.data.data);
      setLoader5(false);
      setInsuranceImages([...insuranceImages, response.data.data.path]);
    }
    else
    {
      setLoader5(false);
    }
  }

  const uploadInspectionImage6= async (data)=>{
    const formData = new FormData();
      formData.append('file', data);
      setLoader6(true);
    const response = await vehicleApi.uploadInspectionImage(formData);
    if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
      // console.log(response.data.data);
      setLoader6(false);
      setDuplicateKeyImages([...duplicateKeyImages, response.data.data.path]);
    }
    else
    {
      setLoader6(false);
    }
  }

  const uploadInspectionImage7= async (data)=>{
    const formData = new FormData();
      formData.append('file', data);
      setLoader7(true);
    const response = await vehicleApi.uploadInspectionImage(formData);
    if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
      // console.log(response.data.data);
      setLoader7(false);
      setRtoNocImages([...rtoNocImages, response.data.data.path]);
    }
    else
    {
      setLoader7(false);
    }
  }


  

  


  const handleRemovercAvailabilityImages =async (ImageName)=>{
    setRcAvailabilityImages(prevArray => prevArray.filter(item => item !== ImageName));
  }
  const handleRemoveChassisImages =async (ImageName)=>{
    setChassisImages(prevArray => prevArray.filter(item => item !== ImageName));
  }
  const handleRemoveHypoImages =async (ImageName)=>{
    setHypoImages(prevArray => prevArray.filter(item => item !== ImageName));
  }
  const handleRemoveRoadTaxValidityImages =async (ImageName)=>{
    setRoadTaxValidityImages(prevArray => prevArray.filter(item => item !== ImageName));
  }
  const handleRemoveInsuranceImages =async (ImageName)=>{
    setInsuranceImages(prevArray => prevArray.filter(item => item !== ImageName));
  }
  const handleRemoveDuplicateKeyImages =async (ImageName)=>{
    setDuplicateKeyImages(prevArray => prevArray.filter(item => item !== ImageName));
  }
  const handleRemoveRtoNocImages =async (ImageName)=>{
    setRtoNocImages(prevArray => prevArray.filter(item => item !== ImageName));
  }
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 


    // const formData={allCarVideo,auctionStartTime,auctionEndTime,thumbImage,allCarImage,brand,model,variant,regYear,bodyType,fuelType,transmission,ownerType,color,rto,city,kmsDriven,carPrice,oneClickBuyPrice,description,seat,mileage,engine,maxPower,maxTorque,noc,mfgYear,inspectionReport,insuranceValidity,roadTaxValidity,inspectionScore,comforts,safety,interior,exterior,entertainment};

    
    const response = await vehicleApi.addAuctionVehicle(formData);
    // console.log(response);
    if (response.status === 200 && response.data.status === 200 && response.data.success === true) {
    //   // console.log("ok");
      // setPopupopen(true);
      confirm("Car added successfully");
      router.push("/dashboard/auctionvehicle");

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
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Vehicle*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={vehicle}
                          label="Select Vehicle*"
                          onChange={handleInput}
                          name='vehicle'
                          required
                        >
                          {carList.length > 0 && carList.map((data,key) => (
                            <MenuItem key={key} value={data.id}>{data.carDetails.brand} {data.carDetails.model} {data.carDetails.variant} {data.carDetails.registrationYear} {data.carDetails.color}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Inspector*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={inspector}
                          label="Select Inspector*"
                          onChange={handleInput}
                          name='inspector'
                          required
                        >
                          {inspectorList.length > 0 && inspectorList.map((data,key) => (
                            <MenuItem key={key} value={data.id}>{data.email} ({data.name ? data.name : 'NA'})</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="Customer Contact No" onChange={handleInput} name='custContactNo' value={custContactNo} type="text" required variant="outlined" fullWidth/>
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
                          value={regType}
                          label="Select Registration Type*"
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
                      <TextField id="outlined-basic" label="Registration No" onChange={handleInput} name='regNo' value={regNo} type="text" variant="outlined" required fullWidth/>
                      </Box>
                  </Grid> 
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">RC Availability*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={rcAvailability}
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
                          value={rcCondition}
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
                              <DatePicker label="Registration Date" name='regDate' onChange={handleRegistrationDate} sx={{width:'100%'}} required/>
                            </DemoContainer>
                          </LocalizationProvider>
                        </Box>
                  </Grid>
                  <Grid item md={3}>
                        <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_date} ${"tm_dashboard_rightbar_form_date_gb"} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                          <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['DatePicker']}>
                              <DatePicker label="Fitness Upto" name='fitnessUpto' onChange={handleFitnessuptoDate} sx={{width:'100%'}} required/>
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
                          label="To be Scraped*"
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
                          label="Select RTO*"
                          onChange={handleInput}
                          name='rto'
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
                          label="Select Hypothecation *"
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
                              <DatePicker label="Road Tax Valid Upto" name="roadTaxValidUpto" onChange={handleRoadTaxValid}  sx={{width:'100%'}} required/>
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
                              <DatePicker label="Insurance Validity"  name="insuranceValidity" onChange={handleInsuranceValidity} sx={{width:'100%'}} required/>
                            </DemoContainer>
                          </LocalizationProvider>
                        </Box>
                    </Grid>
                    <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">No Claim Bonus *</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
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
                              <DatePicker label="RTO Noc Issue Date" name="rtoNocIssueDate" onChange={handleRtoNocIssueDate}  sx={{width:'100%'}} required/>
                            </DemoContainer>
                          </LocalizationProvider>
                        </Box>
                    </Grid>
                  <Grid item md={12}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      
                        <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox}>
                          <Box className={dashboardStyles.tm_dashboard_img_upl_title}>
                            <Typography variant='h4'>Comments On Basic</Typography>
                          </Box>
                        <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox_all}></Box>
                          <Grid container spacing={0}>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="CNG/LPG Plate not Available" name='commentsOnBasic' onChange={handleInput} />} label="CNG/LPG Plate not Available" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="CNG/LPG Removed" name='commentsOnBasic' onChange={handleInput} />} label="CNG/LPG Removed" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Vin Plate Missing" name='commentsOnBasic' onChange={handleInput} />} label="Vin Plate Missing" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="CNG/LPG Cylinder test certificate not Available" name='commentsOnBasic' onChange={handleInput} />} label="CNG/LPG Cylinder test certificate not Available" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="RC Fitness Expired" name='commentsOnBasic' onChange={handleInput} />} label="RC Fitness Expired" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Car Converted from Commercial to private" name='commentsOnBasic' onChange={handleInput} />} label="Car Converted from Commercial to private" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Migrated from Other State" name='commentsOnBasic' onChange={handleInput} />} label="Migrated from Other State" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Remote Key Damaged / Not Available" name='commentsOnBasic' onChange={handleInput} />} label="Remote Key Damaged / Not Available" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Chassis Number Rusted" name='commentsOnBasic' onChange={handleInput} />} label="Chassis Number Rusted" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Chassis Number Not Traceable" name='commentsOnBasic' onChange={handleInput} />} label="Chassis Number Not Traceable" />
                                </Grid>
                                
                          </Grid>
                        </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Box className={`${dashboardStyles.tm_dashboard_img_upl} ${"tm_dashboard_img_upl_gb"}`}>
                  <Box className={dashboardStyles.tm_dashboard_img_upl_title}>
                    <Typography variant='h4'>Upload images</Typography>
                  </Box>
                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>RC Availablity Images </Typography>
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
                       <Grid item md={9}>
                         {rcAvailabilityImages.length > 0 &&
                          rcAvailabilityImages.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={element}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemovercAvailabilityImages(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
                          {isLoader?(<CircularProgress />):(<></>)}
                        </Grid>
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
                      <Grid item md={9}>
                        {chassisImages.length > 0 &&
                          chassisImages.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box>
                                  <Image
                                    src={element}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveChassisImages(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
                          {isLoader2?(<CircularProgress />):(<></>)}
                        </Grid>
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
                      <Grid item md={9}>
                        {hypoImages.length > 0 &&
                          hypoImages.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={element}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveHypoImages(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
                          {isLoader3?(<CircularProgress />):(<></>)}
                        </Grid>
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
                      <Grid item md={9}>
                        {roadTaxValidityImages.length > 0 &&
                          roadTaxValidityImages.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={element}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveRoadTaxValidityImages(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
                          {isLoader4?(<CircularProgress />):(<></>)}
                        </Grid>
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
                      <Grid item md={9}>
                        {insuranceImages.length > 0 &&
                          insuranceImages.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={element}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveInsuranceImages(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
                          {isLoader5?(<CircularProgress />):(<></>)}
                        </Grid>
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
                      <Grid item md={9}>
                        {duplicateKeyImages.length > 0 &&
                          duplicateKeyImages.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={element}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveDuplicateKeyImages(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
                          {isLoader6?(<CircularProgress />):(<></>)}
                        </Grid>
                        
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
                      <Grid item md={9}>
                        {rtoNocImages.length > 0 &&
                          rtoNocImages.map((element, index) => {
                            return (
                              <Box key={index} className={`${dashboardStyles.tm_dashboard_img_upl_panel_img} ${"tm_dashboard_img_upl_panel_img_gb"}`}>
                                <Box >
                                  <Image
                                    src={element}
                                    alt='Uploaded Image'
                                    height='300'
                                    width='300'
                                  />
                                  <Button onClick={() => handleRemoveRtoNocImages(element)}><CloseIcon/> </Button>
                                </Box>
                              </Box>
                            );
                          })}
                          {isLoader7?(<CircularProgress />):(<></>)}
                        </Grid>
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
                        <InputLabel id="demo-simple-select-label">Exhaust Smoke*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Exhaust Smoke*"
                          onChange={handleInput}
                          name='exhaustSmoke'
                          required
                        >
                            <MenuItem value="Okay">Okay</MenuItem>
                            <MenuItem value="Black">Black</MenuItem>
                            <MenuItem value="Blue">Blue</MenuItem>
                            <MenuItem value="White">White</MenuItem>

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
                        <InputLabel id="demo-simple-select-label">Clutch*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
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
                  <Grid item md={12}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      
                        <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox}>
                          <Box className={dashboardStyles.tm_dashboard_img_upl_title}>
                            <Typography variant='h4'>Comments On Engine</Typography>
                          </Box>
                        <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox_all}></Box>
                          <Grid container spacing={0}>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Not Converting to CNG / LPG" name='commentsOnEngine' onChange={handleInput} />} label="Not Converting to CNG / LPG" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="RPM Not increasing" name='commentsOnEngine' onChange={handleInput} />} label="RPM Not increasing" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Car not working on Petrol" name='commentsOnEngine' onChange={handleInput} />} label="Car not working on Petrol" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Turbo Charger Noise" name='commentsOnEngine' onChange={handleInput} />} label="Turbo Charger Noise" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Turbo Charger Not Working" name='commentsOnEngine' onChange={handleInput} />} label="Turbo Charger Not Working" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Fan Belt Noise" name='commentsOnEngine' onChange={handleInput} />} label="Fan Belt Noise" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Alternator Bearing Noise" name='commentsOnEngine' onChange={handleInput} />} label="Alternator Bearing Noise" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Minor Noise" name='commentsOnEngine' onChange={handleInput} />} label="Minor Noise" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Major Noise" name='commentsOnEngine' onChange={handleInput} />} label="Major Noise" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Critical Noise" name='commentsOnEngine' onChange={handleInput} />} label="Critical Noise" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Oil Coming from Exhaust Tail Pipe" name='commentsOnEngine' onChange={handleInput} />} label="Oil Coming from Exhaust Tail Pipe" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Leakege From Injector" name='commentsOnEngine' onChange={handleInput} />} label="Leakege From Injector" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Car is in Working Condition but Towing Suggested to Avoid Damage to Engine" name='commentsOnEngine' onChange={handleInput} />} label="Car is in Working Condition but Towing Suggested to Avoid Damage to Engine" />
                                </Grid>
                                
                          </Grid>
                        </Box>
                    </Box>
                  </Grid>
                  <Grid item md={12}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      
                        <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox}>
                          <Box className={dashboardStyles.tm_dashboard_img_upl_title}>
                            <Typography variant='h4'>Comments On Transmission</Typography>
                          </Box>
                        <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox_all}></Box>
                          <Grid container spacing={0}>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Car is in Working Condition but Towing Suggested to Avoid Damage to Clutch" name='commentsOnTransmission' onChange={handleInput} />} label="Car is in Working Condition but Towing Suggested to Avoid Damage to Clutch" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Car is in Working Condition but Towing Suggested to Avoid Damage to Gear" name='commentsOnTransmission' onChange={handleInput} />} label="Car is in Working Condition but Towing Suggested to Avoid Damage to Gear" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Towing Required" name='commentsOnTransmission' onChange={handleInput} />} label="Towing Required" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Gear box Oil Leakage" name='commentsOnTransmission' onChange={handleInput} />} label="Gear box Oil Leakage" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Abnormal Noise coming from Gear Box" name='commentsOnTransmission' onChange={handleInput} />} label="Abnormal Noise coming from Gear Box" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="All Weel Drive (AWD)" name='commentsOnTransmission' onChange={handleInput} />} label="All Weel Drive (AWD)" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Four Wheel Drive (4X4)" name='commentsOnTransmission' onChange={handleInput} />} label="Four Wheel Drive (4X4)" />
                                </Grid>
                               
                                
                          </Grid>
                        </Box>
                    </Box>
                  </Grid>
                  
                </Grid>
                <Box className={`${dashboardStyles.tm_dashboard_img_upl} ${"tm_dashboard_img_upl_gb"}`}>
                  {/* <Box className={dashboardStyles.tm_dashboard_img_upl_title}>
                    <Typography variant='h4'>Upload images</Typography>
                  </Box> */}
                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Engine & Transmission Images </Typography>
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
                          label="Fuel Level*"
                          onChange={handleInput}
                          name='fuelLevel'
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
                          label="Electrical*"
                          onChange={handleInput}
                          name='electrical'
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
                        <InputLabel id="demo-simple-select-label">RHS Front(Power Window)*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
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
                        <InputLabel id="demo-simple-select-label">Leather Seats</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
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
                  <Grid item md={12}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      
                        <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox}>
                          <Box className={dashboardStyles.tm_dashboard_img_upl_title}>
                            <Typography variant='h4'>Comments On Interior</Typography>
                          </Box>
                        <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox_all}></Box>
                          <Grid container spacing={0}>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Door Trim Torn" name='commentsOnInterior' onChange={handleInput} />} label="Door Trim Torn" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="AC Vent Damaged" name='commentsOnInterior' onChange={handleInput} />} label="AC Vent Damaged" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="AC Knob Damaged / Not Working" name='commentsOnInterior' onChange={handleInput} />} label="AC Knob Damaged / Not Working" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Cabin Floor Rusted" name='commentsOnInterior' onChange={handleInput} />} label="Cabin Floor Rusted" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Roof Lining Loose / Replaced" name='commentsOnInterior' onChange={handleInput} />} label="Roof Lining Loose / Replaced" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Roof lining Damaged" name='commentsOnInterior' onChange={handleInput} />} label="Roof lining Damaged" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Gear Box Cover Damaged" name='commentsOnInterior' onChange={handleInput} />} label="Gear Box Cover Damaged" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Dashboard Broken" name='commentsOnInterior' onChange={handleInput} />} label="Dashboard Broken" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Dashboard Scratched" name='commentsOnInterior' onChange={handleInput} />} label="Dashboard Scratched" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Electrical Seat Adjusment Not Working" name='commentsOnInterior' onChange={handleInput} />} label="Electrical Seat Adjusment Not Working" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Driver Seat Broken or Sliding Not Working" name='commentsOnInterior' onChange={handleInput} />} label="Driver Seat Broken or Sliding Not Working" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Push Button Start Stop Available" name='commentsOnInterior' onChange={handleInput} />} label="Push Button Start Stop Available" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Knee Airbags Available" name='commentsOnInterior' onChange={handleInput} />} label="Knee Airbags Available" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Seat Airbags Available" name='commentsOnInterior' onChange={handleInput} />} label="Seat Airbags Available" />
                                </Grid>
                                
                          </Grid>
                        </Box>
                    </Box>
                  </Grid>
                  <Grid item md={12}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      
                        <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox}>
                          <Box className={dashboardStyles.tm_dashboard_img_upl_title}>
                            <Typography variant='h4'>Comments On Electricals</Typography>
                          </Box>
                        <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox_all}></Box>
                          <Grid container spacing={0}>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Odometer Tampered" name='commentsOnElectrical' onChange={handleInput} />} label="Odometer Tampered" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Navigation Chip Not Available" name='commentsOnElectrical' onChange={handleInput} />} label="Navigation Chip Not Available" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Base Tube / Woofer Retained By the Customer" name='commentsOnElectrical' onChange={handleInput} />} label="Base Tube / Woofer Retained By the Customer" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Music system Retained By the Customer" name='commentsOnElectrical' onChange={handleInput} />} label="Music system Retained By the Customer" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Amplifier Retained By the Customer" name='commentsOnElectrical' onChange={handleInput} />} label="Amplifier Retained By the Customer" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Horn Not Working" name='commentsOnElectrical' onChange={handleInput} />} label="Horn Not Working" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Power Window Master Switch Not Working" name='commentsOnElectrical' onChange={handleInput} />} label="Power Window Master Switch Not Working" />
                                </Grid>
                                
                                
                          </Grid>
                        </Box>
                    </Box>
                  </Grid>
                  
                </Grid>
                <Box className={`${dashboardStyles.tm_dashboard_img_upl} ${"tm_dashboard_img_upl_gb"}`}>
                  
                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Electrical & Interior Images </Typography>
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
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">RHS Quarter Panel*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsQuarterPanel}
                          label="RHS Quarter Panel*"
                          onChange={handleInput}
                          name='rhsQuarterPanel'
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
                           <MenuItem value="Cracked">Cracked</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">RHS Rear Alloy*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsRearAlloy}
                          label="RHS Rear Alloy*"
                          onChange={handleInput}
                          name='rhsRearAlloy'
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
                        <InputLabel id="demo-simple-select-label">RHS Rear Tyre*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsRearTyre}
                          label="RHS Rear Tyre*"
                          onChange={handleInput}
                          name='rhsRearTyre'
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
                        <InputLabel id="demo-simple-select-label">Rhs C Pillar*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsCPillar}
                          label="Rhs C Pillar*"
                          onChange={handleInput}
                          name='rhsCPillar'
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
                        <InputLabel id="demo-simple-select-label">Rhs Rear Door*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsRearDoor}
                          label="Rhs Rear Door*"
                          onChange={handleInput}
                          name='rhsRearDoor'
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
                        <InputLabel id="demo-simple-select-label">Rhs B Pillar*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsBPillar}
                          label="Rhs B Pillar*"
                          onChange={handleInput}
                          name='rhsBPillar'
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
                        <InputLabel id="demo-simple-select-label">Rhs Front Door*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsFrontDoor}
                          label="Rhs Front Door*"
                          onChange={handleInput}
                          name='rhsFrontDoor'
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
                        <InputLabel id="demo-simple-select-label">Rhs A Pillar*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsAPillar}
                          label="Rhs A Pillar*"
                          onChange={handleInput}
                          name='rhsAPillar'
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
                        <InputLabel id="demo-simple-select-label">Rhs Running Board*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsRunningBoard}
                          label="Rhs Running Board"
                          onChange={handleInput}
                          name='rhsRunningBoard'
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
                        <InputLabel id="demo-simple-select-label">RHS Front Alloy*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsFrontAlloy}
                          label="RHS Front Alloy*"
                          onChange={handleInput}
                          name='rhsFrontAlloy'
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
                        <InputLabel id="demo-simple-select-label">RHS Front Tyre*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsFrontTyre}
                          label="RHS Front Tyre*"
                          onChange={handleInput}
                          name='rhsFrontTyre'
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
                        <InputLabel id="demo-simple-select-label">Rhs Orvm*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsOrvm}
                          label="Rhs Orvm*"
                          onChange={handleInput}
                          name='rhsOrvm'
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
                        <InputLabel id="demo-simple-select-label">Rhs Fender*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsFender}
                          label="Rhs Fender*"
                          onChange={handleInput}
                          name='rhsFender'
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
                  
                  <Grid item md={12}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      
                        <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox}>
                          <Box className={dashboardStyles.tm_dashboard_img_upl_title}>
                            <Typography variant='h4'>Comments On Exterior</Typography>
                          </Box>
                        <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox_all}></Box>
                          <Grid container spacing={0}>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Customized Vehicle or Body Modified" name='commentsOnExterior' onChange={handleInput} />} label="Customized Vehicle or Body Modified" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Body Shell Replaced" name='commentsOnExterior' onChange={handleInput} />} label="Body Shell Replaced" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Roof Top Canvas" name='commentsOnExterior' onChange={handleInput} />} label="Roof Top Canvas" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Water Logged Vehicle" name='commentsOnExterior' onChange={handleInput} />} label="Water Logged Vehicle" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Chassis Extension Repaired" name='commentsOnExterior' onChange={handleInput} />} label="Chassis Extension Repaired" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Strut Mounting Area Damaged" name='commentsOnExterior' onChange={handleInput} />} label="Strut Mounting Area Damaged" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Roof Colour Changed / Vinyl wrapped" name='commentsOnExterior' onChange={handleInput} />} label="Roof Colour Changed / Vinyl wrapped" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Vehicle Color Changed" name='commentsOnExterior' onChange={handleInput} />} label="Vehicle Color Changed" />
                                </Grid>
                                
                          </Grid>
                        </Box>
                    </Box>
                  </Grid>

                </Grid>
                <Box className={`${dashboardStyles.tm_dashboard_img_upl} ${"tm_dashboard_img_upl_gb"}`}>
                  
                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Exterior Images </Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='exteriorImages' hidden />
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
                    <Typography variant='h6'>Safety Details</Typography>
                </Box>
                <Grid container spacing={4}>
                  <Grid item md={3}>
                      <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <TextField id="outlined-basic" label="Number of Airbags" onChange={handleInput} name='noOfAirbags' type="number" required variant="outlined" fullWidth/>
                      </Box>
                  </Grid> 
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">ABS*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={abs}
                          label="ABS*"
                          onChange={handleInput}
                          name='abs'
                          required
                        >
                          <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                          <MenuItem value="Warning Light Glowing">Warning Light Glowing</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Driver Side Airbags*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={driverSideAB}
                          label="Driver Side Airbags*"
                          onChange={handleInput}
                          name='driverSideAB'
                          required
                        >
                          <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                          <MenuItem value="Deployed">Deployed</MenuItem>
                          <MenuItem value="Removed">Removed</MenuItem>
                          <MenuItem value="Airbag Warning Light Glowing">Airbag Warning Light Glowing</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Co-Driver Side Airbags*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={codriverSideAB}
                          label="Co-Driver Side Airbags*"
                          onChange={handleInput}
                          name='codriverSideAB'
                          required
                        >
                          <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                          <MenuItem value="Deployed">Deployed</MenuItem>
                          <MenuItem value="Removed">Removed</MenuItem>
                          <MenuItem value="Airbag Warning Light Glowing">Airbag Warning Light Glowing</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lhs A Pillar Airbags*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsAPillarAB}
                          label="Lhs A Pillar Airbags*"
                          onChange={handleInput}
                          name='lhsAPillarAB'
                          required
                        >
                          <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                          <MenuItem value="Deployed">Deployed</MenuItem>
                          <MenuItem value="Removed">Removed</MenuItem>
                          <MenuItem value="Airbag Warning Light Glowing">Airbag Warning Light Glowing</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lhs B Pillar Airbags*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsBPillarAB}
                          label="Lhs B Pillar Airbags*"
                          onChange={handleInput}
                          name='lhsBPillarAB'
                          required
                        >
                          <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                          <MenuItem value="Deployed">Deployed</MenuItem>
                          <MenuItem value="Removed">Removed</MenuItem>
                          <MenuItem value="Airbag Warning Light Glowing">Airbag Warning Light Glowing</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Lhs C Pillar Airbags*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={lhsCPillarAB}
                          label="Lhs C Pillar Airbags*"
                          onChange={handleInput}
                          name='lhsCPillarAB'
                          required
                        >
                          <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                          <MenuItem value="Deployed">Deployed</MenuItem>
                          <MenuItem value="Removed">Removed</MenuItem>
                          <MenuItem value="Airbag Warning Light Glowing">Airbag Warning Light Glowing</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Rhs A Pillar Airbags*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsAPillarAB}
                          label="Rhs A Pillar Airbags*"
                          onChange={handleInput}
                          name='rhsAPillarAB'
                          required
                        >
                          <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                          <MenuItem value="Deployed">Deployed</MenuItem>
                          <MenuItem value="Removed">Removed</MenuItem>
                          <MenuItem value="Airbag Warning Light Glowing">Airbag Warning Light Glowing</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Rhs B Pillar Airbags*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsBPillarAB}
                          label="Rhs B Pillar Airbags*"
                          onChange={handleInput}
                          name='rhsBPillarAB'
                          required
                        >
                          <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                          <MenuItem value="Deployed">Deployed</MenuItem>
                          <MenuItem value="Removed">Removed</MenuItem>
                          <MenuItem value="Airbag Warning Light Glowing">Airbag Warning Light Glowing</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Rhs C Pillar Airbags*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={rhsCPillarAB}
                          label="Rhs C Pillar Airbags*"
                          onChange={handleInput}
                          name='rhsCPillarAB'
                          required
                        >
                          <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                          <MenuItem value="Deployed">Deployed</MenuItem>
                          <MenuItem value="Removed">Removed</MenuItem>
                          <MenuItem value="Airbag Warning Light Glowing">Airbag Warning Light Glowing</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Reverse Parking Camera*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={reverseParkingCamera}
                          label="Reverse Parking Camera*"
                          onChange={handleInput}
                          name='reverseParkingCamera'
                          required
                        >
                          <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                          <MenuItem value="Hazy">Hazy</MenuItem>
                          <MenuItem value="Damaged / Not working">Damaged / Not working</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                </Grid>
                <Box className={`${dashboardStyles.tm_dashboard_img_upl} ${"tm_dashboard_img_upl_gb"}`}>
                  
                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Safety Images </Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='safetyImages' hidden />
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
                    <Typography variant='h6'>Comfort & Conveniance</Typography>
                </Box>
                <Grid container spacing={4}>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Manual AC*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={manualAC}
                          label="Manual AC*"
                          onChange={handleInput}
                          name='manualAC'
                          required
                        >
                          <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                          <MenuItem value="Ineffective">Ineffective</MenuItem>
                          <MenuItem value="Not Working">Not Working</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Climate Control AC*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={climateAC}
                          label="Climate Control AC*"
                          onChange={handleInput}
                          name='climateAC'
                          required
                        >
                          <MenuItem value="Okay">Okay</MenuItem>
                          <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                          <MenuItem value="Ineffective">Ineffective</MenuItem>
                          <MenuItem value="Not Working">Not Working</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Music System*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={musicSystem}
                          label="Music System*"
                          onChange={handleInput}
                          name='musicSystem'
                          required
                        >
                          <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                          <MenuItem value="Available">Available</MenuItem>
                          <MenuItem value="Not working">Not working</MenuItem>
                          <MenuItem value="Speaker Not Working">Speaker Not Working</MenuItem>
                          <MenuItem value="Front Fascia missing">Front Fascia missing</MenuItem>
                          <MenuItem value="Touchpad Not Working">Touchpad Not Working</MenuItem>
                          <MenuItem value="Data Cable Panel Missing">Data Cable Panel Missing</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Stereo*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={stereo}
                          label="Stereo*"
                          onChange={handleInput}
                          name='stereo'
                          required
                        >
                          <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                          <MenuItem value="Normal Stereo">Normal Stereo</MenuItem>
                          <MenuItem value="Touch Stereo">Touch Stereo</MenuItem>
                          <MenuItem value="Display Damaged / Broken">Display Damaged / Broken</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Inbuilt Speaker*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={inbuiltSpeaker}
                          label="Inbuilt Speaker*"
                          onChange={handleInput}
                          name='inbuiltSpeaker'
                          required
                        >
                          <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                          <MenuItem value="Available">Available</MenuItem>
                          <MenuItem value="Not Working">Not Working</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">External Speaker*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={externalSpeaker}
                          label="External Speaker*"
                          onChange={handleInput}
                          name='externalSpeaker'
                          required
                        >
                          <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                          <MenuItem value="Available">Available</MenuItem>
                          <MenuItem value="Not Working">Not Working</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Stearing Mounted Audio Control*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={stearingMountedAudio}
                          label="Stearing Mounted Audio Control*"
                          onChange={handleInput}
                          name='stearingMountedAudio'
                          required
                        >
                          <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                          <MenuItem value="Available">Available</MenuItem>
                          <MenuItem value="Not Working">Not Working</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Sunroof*</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={sunroof}
                          label="Sunroof*"
                          onChange={handleInput}
                          name='sunroof'
                          required
                        >
                          <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                          <MenuItem value="Available">Available</MenuItem>
                          <MenuItem value="Not Working">Not Working</MenuItem>
                          <MenuItem value="Damaged">Damaged</MenuItem>
                          <MenuItem value="Noisy">Noisy</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={12}>
                    <Box className={`${dashboardStyles.tm_dashboard_rightbar_form_panel} ${"tm_dashboard_rightbar_form_panel_gb"}`}>
                      
                        <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox}>
                          <Box className={dashboardStyles.tm_dashboard_img_upl_title}>
                            <Typography variant='h4'>Additional Comments</Typography>
                          </Box>
                        <Box className={dashboardStyles.tm_dashboard_rightbar_form_checkbox_all}></Box>
                          <Grid container spacing={0}>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Electrical Wiring Damaged" name='additionalComments' onChange={handleInput} />} label="Electrical Wiring Damaged" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Starter Motor / Solanoid Malfunction" name='additionalComments' onChange={handleInput} />} label="Starter Motor / Solanoid Malfunction" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Battery Not Available" name='additionalComments' onChange={handleInput} />} label="Battery Not Available" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Front Drive Axle Noise" name='additionalComments' onChange={handleInput} />} label="Front Drive Axle Noise" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Car Pulling on One Side" name='additionalComments' onChange={handleInput} />} label="Car Pulling on One Side" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Silencer Assembly Damaged" name='additionalComments' onChange={handleInput} />} label="Silencer Assembly Damaged" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Noise from Silencer Assembly" name='additionalComments' onChange={handleInput} />} label="Noise from Silencer Assembly" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Hand Brake not Working" name='additionalComments' onChange={handleInput} />} label="Hand Brake not Working" />
                                </Grid>
                                <Grid item md={6}>
                                  <FormControlLabel control={<Checkbox value="Jack & Toolkit not available" name='additionalComments' onChange={handleInput} />} label="Jack & Toolkit not available" />
                                </Grid>
                          </Grid>
                        </Box>
                    </Box>
                  </Grid>


                </Grid>
                <Box className={`${dashboardStyles.tm_dashboard_img_upl} ${"tm_dashboard_img_upl_gb"}`}>
                  
                  <Box className={dashboardStyles.tm_dashboard_img_upl_panel}>
                    <Box className={dashboardStyles.tm_dashboard_img_upl_panel_title}>
                      <Typography variant='h6'>Comfort & Conveniance Images </Typography>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item md={3}> 
                        <Box className={`${dashboardStyles.tm_dashboard_img_upl_panel_title} ${"tm_dashboard_img_upl_panel_title_gb"}`}>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={handleInput} name='comfortImages' hidden />
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
       
      </Box>
    </>
  )
}

export default Create