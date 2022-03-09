import HttpRequest from '@/libs/axios'
import config from '@/config'
const { baseURL } = config 
const baseUrl = process.env.NODE_ENV == "dev" ?  baseURL.dev : (process.env.NODE_ENV == "test" ? baseURL.test : baseURL.prod)
console.log(baseUrl)
const axios = new HttpRequest(baseUrl)
export default axios
