import axios from "axios";


const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_SERVER_URL,
    timeout: 5000,
    headers: {'Authorization': 'Bearer '+localStorage.getItem("accessToken")}
  });


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