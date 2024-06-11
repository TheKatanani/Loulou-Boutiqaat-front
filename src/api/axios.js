import axios from "axios";
import {
  API2
} from "../API";
export default axios.create({
  baseURL: API2
})
export const axiosPrivate = axios.create({
  baseURL: API2,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})