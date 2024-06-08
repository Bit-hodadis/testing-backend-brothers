import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Replace with your API base URL
  withCredentials: true, // Include credentials with requests
});

export default axiosInstance;
