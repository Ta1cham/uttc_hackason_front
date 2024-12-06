import axios from 'axios';

const apiClient = axios.create({
    //baseURL: 'http://localhost:8000',
    baseURL: 'https://uttc-hackason-be-334929830987.us-central1.run.app',
});

export default apiClient;