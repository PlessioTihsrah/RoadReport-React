import axios from 'axios';

export default axios.create({
    baseURL : "",
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})