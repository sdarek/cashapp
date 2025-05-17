import axios from 'axios';
const API_BASE_URL = 'http://192.168.1.102:8080/api'; //http://<TWOJE_IP>:8080/api

export const ping = async () => {
  const url = `${process.env.EXPO_PUBLIC_API_BASE_URL}/ping`;
  const response = await axios.get(url);
  return response.data;
};
