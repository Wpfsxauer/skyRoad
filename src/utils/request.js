import axios from 'axios'
import { message as antMessage } from "ant-design-vue";
import {baseURL} from '../environment/index'
console.log(baseURL)
const request = axios.create(
  {
    baseURL: baseURL,
    timeout: 1000 * 60
  }
);

const err = (error) => Promise.reject(error);

request.interceptors.request.use((config) => {
  const token = "test";
  if (token) {
    config.headers["token"] = token;
  }
  return config;
}, err);

request.interceptors.response.use((response) => {
  const {
    code, message 
  } = response.data;
  if (code !== 0) antMessage.error(message);
  return response.data;
}, err);

export {
  request
}
