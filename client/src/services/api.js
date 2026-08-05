import axios from "axios";

console.log(
  "VITE API URL:",
  import.meta.env.VITE_API_URL
);


const API = axios.create({

  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",

});



API.interceptors.request.use((config) => {


  const token =
    localStorage.getItem("token");


  if (token) {

    config.headers.Authorization =
      `Bearer ${token}`;

  }


  console.log(
    "Calling API:",
    config.baseURL + config.url
  );


  return config;


});


export default API;