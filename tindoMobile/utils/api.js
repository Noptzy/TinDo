import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://192.168.100.48:3000/api', 
});