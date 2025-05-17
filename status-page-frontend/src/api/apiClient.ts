import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/v1", // adjust backend URL if different
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;