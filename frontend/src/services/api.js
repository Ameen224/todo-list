// frontent/src/services/api.js

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// attach token if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});



// handle expire token
API.interceptors.response.use(
    (res)=>res,
    (err)=>{
        if(err.response?.status === 401){
            localStorage.removeItem('token')

            window.location.href = '/login'
        }
        return Promise.reject(err)
    }

)


export default API;






