import axios from 'axios'

const axiosFetch = axios.create({
    baseURL: 'http://localhost:5000/v1'
});

export default axiosFetch;