import axios from 'axios';

export const clientCredentialAxios = axios.create({
    baseURL:axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
});

