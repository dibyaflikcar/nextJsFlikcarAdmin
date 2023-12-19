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

  vehicleApi.getCity = async () => {
    try {
      const res = API.get('/global/city');
      return res;
    } catch (error) {
      return error.response;
    }
  };

  vehicleApi.getRto = async () => {
    try {
      const res = API.get('/vehicle/getRto');
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

  vehicleApi.updateAuctionVehicle = async (data) => {
    try {
      const res = API.post('/vehicle/updateAuctionVehicle',data);
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

  vehicleApi.getAuctionDetails = async (data) => {
    try {
      const res = API.post('/vehicle/getAuctionDetails',data);
      return res;
    } catch (error) {
      return error.response;
    }
  };
  vehicleApi.getBidList = async (data) => {
    try {
      const res = API.post('/vehicle/getBidList',data);
      return res;
    } catch (error) {
      return error.response;
    }
  };

  

  vehicleApi.deleteAuctionVehicle = async (data) => {
    try {
      const res = API.post('/vehicle/deleteAuctionVehicle',data);
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

  vehicleApi.uploadAuctionVideo1 = async (data) => {
    try {
      const res = API.post('/vehicle/uploadAuctionVideo1',data);
      return res;
    } catch (error) {
      return error.response;
    }
  };
  vehicleApi.uploadAuctionVideo2 = async (data) => {
    try {
      const res = API.post('/vehicle/uploadAuctionVideo2',data);
      return res;
    } catch (error) {
      return error.response;
    }
  };

  
  
// vehicle enquiry section

vehicleApi.getVehicleEnquiry = async () => {
  try {
    const res = API.get('/vehicle/getVehicleEnquiry');
    return res;
  } catch (error) {
    return error.response;
  }
};

vehicleApi.deleteVehicleEnquiry = async (data) => {
  try {
    const res = API.post('/vehicle/deleteVehicleEnquiry',data);
    return res;
  } catch (error) {
    return error.response;
  }
};


// Brand start here

vehicleApi.getBrand = async () => {
  try {
    const res = API.get('/vehicle/getBrand');
    return res;
  } catch (error) {
    return error.response;
  }
};

vehicleApi.addBrand = async (data) => {
  try {
    const res = API.post('/vehicle/addBrand', data);
    return res;
  } catch (error) {
    return error.response;
  }
};
vehicleApi.updateBrand = async (data) => {
  try {
    const res = API.post('/vehicle/updateBrand', data);
    return res;
  } catch (error) {
    return error.response;
  }
};
vehicleApi.deleteBrand = async (data) => {
  try {
    const res = API.post('/vehicle/deleteBrand',data);
    return res;
  } catch (error) {
    return error.response;
  }
};

//Model start here
vehicleApi.getBrandwithID = async (data) => {
  try {
    const res = API.post('/vehicle/getBrandwithID', data);
    return res;
  } catch (error) {
    return error.response;
  }
};

vehicleApi.addModel = async (data) => {
  try {
    const res = API.post('/vehicle/addModel', data);
    return res;
  } catch (error) {
    return error.response;
  }
};

vehicleApi.updateModel = async (data) => {
  try {
    const res = API.post('/vehicle/updateModel', data);
    return res;
  } catch (error) {
    return error.response;
  }
};

vehicleApi.deleteModel = async (data) => {
  try {
    const res = API.post('/vehicle/deleteModel', data);
    return res;
  } catch (error) {
    return error.response;
  }
};

// Variant start here
vehicleApi.addVariant = async (data) => {
  try {
    const res = API.post('/vehicle/addVariant', data);
    return res;
  } catch (error) {
    return error.response;
  }
};
vehicleApi.deleteVariant = async (data) => {
  try {
    const res = API.post('/vehicle/deleteVariant', data);
    return res;
  } catch (error) {
    return error.response;
  }
};



// user start here
vehicleApi.getUsers = async () => {
  try {
    const res = API.get('/vehicle/getUsers');
    return res;
  } catch (error) {
    return error.response;
  }
};

vehicleApi.getUserbyId = async (data) => {
  try {
    const res = API.post('/vehicle/getUserbyId',data);
    return res;
  } catch (error) {
    return error.response;
  }
};
vehicleApi.updateUserType = async (data) => {
  try {
    const res = API.post('/vehicle/updateUserType',data);
    return res;
  } catch (error) {
    return error.response;
  }
};
vehicleApi.updateUser = async (data) => {
  try {
    const res = API.post('/vehicle/updateUser',data);
    return res;
  } catch (error) {
    return error.response;
  }
};
vehicleApi.deleteUser = async (data) => {
  try {
    const res = API.post('/vehicle/deleteUser',data);
    return res;
  } catch (error) {
    return error.response;
  }
};
vehicleApi.uploadDealerDocumentImage = async (data) => {
  try {
    const res = API.post('/vehicle/uploadDealerDocumentImage',data);
    return res;
  } catch (error) {
    return error.response;
  }
};


// color start here
vehicleApi.getColorList = async () => {
  try {
    const res = API.get('/vehicle/getColorList');
    return res;
  } catch (error) {
    return error.response;
  }
};
vehicleApi.addColor = async (data) => {
  try {
    const res = API.post('/vehicle/addColor',data);
    return res;
  } catch (error) {
    return error.response;
  }
};
vehicleApi.updateColor = async (data) => {
  try {
    const res = API.post('/vehicle/updateColor',data);
    return res;
  } catch (error) {
    return error.response;
  }
};
vehicleApi.deleteColor = async (data) => {
  try {
    const res = API.post('/vehicle/deleteColor',data);
    return res;
  } catch (error) {
    return error.response;
  }
};


// RTO start here
vehicleApi.getRtoList = async () => {
  try {
    const res = API.get('/vehicle/getRtoList');
    return res;
  } catch (error) {
    return error.response;
  }
};
vehicleApi.addRto = async (data) => {
  try {
    const res = API.post('/vehicle/addRto',data);
    return res;
  } catch (error) {
    return error.response;
  }
};
vehicleApi.updateRto = async (data) => {
  try {
    const res = API.post('/vehicle/updateRto',data);
    return res;
  } catch (error) {
    return error.response;
  }
};
vehicleApi.deleteRto = async (data) => {
  try {
    const res = API.post('/vehicle/deleteRto',data);
    return res;
  } catch (error) {
    return error.response;
  }
};


// blog start here
vehicleApi.uploadBlogImage = async (data) => {
  try {
    const res = API.post('/vehicle/uploadBlogImage',data);
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