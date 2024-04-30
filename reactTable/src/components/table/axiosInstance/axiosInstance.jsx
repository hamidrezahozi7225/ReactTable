import axios from 'axios';

export const axiosInstance = axios.create({
  headers: {
    Auth: 'TestOrgAminUser:b23eb6199dde4291901dfa88b1d8c4ffb83232c64d7440b0a36a8a52941c5938',
    'Content-Type': 'application/json',
  },
});
