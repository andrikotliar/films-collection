import axios from 'axios';

const config = {
  baseUrl: '',
};

export const api = axios.create({
  baseURL: config.baseUrl,
});
