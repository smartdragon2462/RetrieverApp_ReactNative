import axios from 'axios';
import queryString from 'query-string';
import {
  URL_EMAIL_LOGIN,
  URL_APP_LOGIN
} from '../constants/api-url-contants.js';

// need to hit special endpoint in order to get json response back
const loginUserWithPassword = (username, password) =>
  axios({
    method: 'POST',
    timeout: 5000,
    url: URL_APP_LOGIN,
    data: queryString.stringify({
      j_username: username,
      j_password: password
    }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    withCredentials: true
  });

const requestPasswordResetEmail = email =>
  axios({
    url: `${URL_EMAIL_LOGIN}/searchResetAndSend`,
    method: 'POST',
    timeout: 5000,
    data: { email }
  });

const createNewPassword = (newpassword, token) =>
  axios({
    url: `${URL_EMAIL_LOGIN}/password`,
    method: 'POST',
    timeout: 5000,
    data: {
      newpassword,
      token
    }
  });
export { loginUserWithPassword, requestPasswordResetEmail, createNewPassword };
