import axios from 'axios'

const axiosInstance = axios.create({
    
    // timeout:  5000,
    baseURL: 'http://localhost/wp-vue/cms'

})

export default axiosInstance