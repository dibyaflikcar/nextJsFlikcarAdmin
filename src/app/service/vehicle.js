import axios from "axios";


const API = axios.create({
    baseURL: process.env.apiUrl,
    // baseURL: "http://localhost:8000/api",
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  });
  
  API.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = localStorage.getItem("token");
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  });
  
  
  const vehicleApi = {};

  vehicleApi.getAuction = async () => {
    try {
      const tokenStr = localStorage.getItem('token');
      const headers = {
        'Authorization': 'Bearer '+tokenStr
      }
      const res = API.get('/vehicle/auction',{headers});
      return res;
    } catch (error) {
      return error.response;
    }
  };

  vehicleApi.getMakeModel = async () => {
    try {
      const res = API.get('/vehicle/makeAndModel');
      return res;
    } catch (error) {
      return error.response;
    }
  };

  vehicleApi.getBodytype = async () => {
    try {
      const res = API.get('/vehicle/bodytype');
      return res;
    } catch (error) {
      return error.response;
    }
  };

  vehicleApi.getFueltype = async () => {
    try {
      const res = API.get('/vehicle/fueltype');
      return res;
    } catch (error) {
      return error.response;
    }
  };

  vehicleApi.getOwnertype = async () => {
    try {
      const res = API.get('/vehicle/ownerType');
      return res;
    } catch (error) {
      return error.response;
    }
  };

  vehicleApi.getColor = async () => {
    try {
      const res = API.get('/vehicle/color');
      return res;
    } catch (error) {
      return error.response;
    }
  };

  vehicleApi.getRto = async () => {
    try {
      const res = API.get('/global/city');
      return res;
    } catch (error) {
      return error.response;
    }
  };

  vehicleApi.getSeat = async () => {
    try {
      const res = API.get('/vehicle/seat');
      return res;
    } catch (error) {
      return error.response;
    }
  };

  vehicleApi.getCarFeature = async () => {
    try {
      const res = API.get('/vehicle/carFeature');
      return res;
    } catch (error) {
      return error.response;
    }
  };

  vehicleApi.addAuctionVehicle = async (data) => {
    try {
      const res = API.post('/vehicle/addAuctionVehicle',data);
      return res;
    } catch (error) {
      return error.response;
    }
  };

  vehicleApi.getAuctionCarDetails = async (data) => {
    try {
      const res = API.post('/vehicle/getAuctionCarDetails',data);
      return res;
    } catch (error) {
      return error.response;
    }
  };

  vehicleApi.uploadAuctionImage = async (data) => {
    try {
      const res = API.post('/vehicle/uploadAuctionImage',data);
      return res;
    } catch (error) {
      return error.response;
    }
  };

  vehicleApi.uploadAuctionImage2 = async (data) => {
    try {
      const res = API.post('/vehicle/uploadAuctionImage2',data);
      return res;
    } catch (error) {
      return error.response;
    }
  };

  vehicleApi.uploadAuctionImage3 = async (data) => {
    try {
      const res = API.post('/vehicle/uploadAuctionImage3',data);
      return res;
    } catch (error) {
      return error.response;
    }
  };

  vehicleApi.uploadAuctionImage4 = async (data) => {
    try {
      const res = API.post('/vehicle/uploadAuctionImage4',data);
      return res;
    } catch (error) {
      return error.response;
    }
  };

  vehicleApi.uploadAuctionImage5 = async (data) => {
    try {
      const res = API.post('/vehicle/uploadAuctionImage5',data);
      return res;
    } catch (error) {
      return error.response;
    }
  };

  vehicleApi.uploadAuctionImage6 = async (data) => {
    try {
      const res = API.post('/vehicle/uploadAuctionImage6',data);
      return res;
    } catch (error) {
      return error.response;
    }
  };

  

  

  
  
  
  

  


  // vehicleApi.getModel = async (brandId) => {
  //   try {
  //     const res = API.get('/vehicle/getModel',{ params: { brandId } });
  //     return res;
  //   } catch (error) {
  //     return error.response;
  //   }
  // };


  

  



  export { vehicleApi };