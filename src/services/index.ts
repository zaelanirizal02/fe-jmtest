import axios from "axios";

const xriApi = axios.create({
    baseURL: 'http://localhost:8000',
    headers:{
    'Content-Type': 'application/json',

    },
    timeout: 10000,
});

export default xriApi;