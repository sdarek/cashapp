import axios from 'axios';
const API_BASE_URL = 'http://192.168.1.102:8080/api'; //TU ADRES SWOJEGO KOMPA

export const ping = async () => {
  const response = await axios.get(`${API_BASE_URL}/ping`);
  return response.data;
};
