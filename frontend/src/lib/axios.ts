import axios from "axios";
import { BASE_URL } from "./constants";

export const API = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
});
