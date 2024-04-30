import axios from 'axios';

export const axiosInstance = axios.create({
  headers: {
    Auth: 'TestOrgAminUser:c3019f3c95d24e11b374b9a8cc564d0a0af3ca06e25d4d7ba04dd80bf371b3fc',
    'Content-Type': 'application/json',
  },
});
