import { Config } from '../config';
import { Auth } from 'aws-amplify';
import axios from 'axios';
const ApiClient = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 3000
});

ApiClient.interceptors.request.use(function (config) {
  return Auth.currentSession()
    .then((session) => {
      config.headers.Authorization = session.idToken.jwtToken;
      return Promise.resolve(config);
    })
    .catch((error) => {
      return Promise.resolve(config);
    });
}, function (error) {
  return Promise.reject(error);
});


export default ApiClient;
