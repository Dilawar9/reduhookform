import axios from "axios";


const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_SERVER_URL,
    timeout: 5000,
  });

  httpClient.interceptors.request.use(
    (config) => {
      // Get the token from local storage or wherever it is stored
      const token = localStorage.getItem('accessToken');
      
      // If a token exists, add it to the request headers
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


  // Add a response interceptor
  // httpClient.interceptors.response.use(function (response) {
  //   // Any status code that lie within the range of 2xx cause this function to trigger
  //   // Do something with response data
  //   console.log("return response")
  //   return response;
  // }, function (error) {
  //   // Any status codes that falls outside the range of 2xx cause this function to trigger
  //   // Do something with response error
  //   window.location.href = "/login"
  //   return Promise.reject(error);
  // });

  export default httpClient;