import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-81278.firebaseio.com/'
});

export default instance;
