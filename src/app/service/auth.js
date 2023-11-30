import axios from "axios";

const AUTHAPI = axios.create({
    baseURL: process.env.apiUrl,
    // baseURL: "http://localhost:8000/api",
  });
  
  AUTHAPI.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = localStorage.getItem("token");
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  });

  
  
  const authapi = {};

  authapi.loginUser = async (data) => {
    try {
      const res = AUTHAPI.post('/admin/login', data);
      return res;
    } catch (error) {
      return error.response;
    }
  };

//   authapi.addUser = async (data) => {
//     try {
//       const res = AUTHAPI.post('/user/add-user', data);
//       return res;
//     } catch (error) {
//       return error.response;
//     }
//   };

//   authapi.loginUser = async (data) => {
//     try {
//       const res = AUTHAPI.post('/user/login-user', data);
//       return res;
//     } catch (error) {
//       return error.response;
//     }
//   };

//   authapi.getUser = async () => {
//     try {
//       const tokenStr = localStorage.getItem('token');
//       const headers = {
//         'Authorization': 'Bearer '+tokenStr
//       }
//       const res = AUTHAPI.get('/user/get-user',{headers});
//       return res;
//     } catch (error) {
//       return error.response;
//     }
//   };

//   authapi.uploadFile = async (data) => {
//     try {
//       const tokenStr = localStorage.getItem('token');
//       const headers = {
//         'Authorization': 'Bearer '+tokenStr
//       }
//       const res = AUTHAPI.post('/user/upload',{headers,data});
//       return res;
//     } catch (error) {
//       return error.response;
//     }
//   };

//   authapi.getcategoryProduct = async (id) => {
//     try {
//       const res = API.get('/products/category/'+id);
//       return res;
//     } catch (error) {
//       return error.response;
//     }
//   };

  

  


  export { authapi };