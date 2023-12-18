import axios from "axios";


const API = axios.create({
    baseURL: process.env.apiUrl,
    // baseURL: "http://localhost:8000/api",
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  API.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = localStorage.getItem("token");
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  });
  
  
  const globalApi = {};



// Blog start here
globalApi.getBlog = async () => {
  try {
    const res = API.get('/global/blog');
    return res;
  } catch (error) {
    return error.response;
  }
};

globalApi.uploadBlogImage = async (data) => {
  // console.log(data);
  try {
    const res = API.post('/global/uploadBlogImage',data);
    return res;
  } catch (error) {
    return error.response;
  }
};

globalApi.addBlog = async (data) => {
  try {
    const res = API.post('/global/addBlog',data);
    return res;
  } catch (error) {
    return error.response;
  }
};
globalApi.getBlogWithId = async (data) => {
  try {
    const res = API.post('/global/getBlogWithId',data);
    return res;
  } catch (error) {
    return error.response;
  }
};

globalApi.updateBlog = async (data) => {
  try {
    const res = API.post('/global/updateBlog',data);
    return res;
  } catch (error) {
    return error.response;
  }
};
globalApi.deleteBlog = async (data) => {
  try {
    const res = API.post('/global/deleteBlog',data);
    return res;
  } catch (error) {
    return error.response;
  }
};


  export { globalApi };