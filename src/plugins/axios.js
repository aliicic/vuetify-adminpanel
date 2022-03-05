import axios from 'axios'

const axiosInstance = axios.create({
    
    // timeout:  5000,
    baseURL: 'https://cmsvue.nebular.ir'

})

export default axiosInstance