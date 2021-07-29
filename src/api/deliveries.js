import Axios from 'axios';
import base64 from 'react-native-base64';

const requestDeliverySetup = ({
  os,
  deviceToken,
  profiles,
  active,
  username,
  password
}) =>
  Axios({
    method: 'POST',
    url: 'https://api.retriever-info.com/appserver/delivery',
    data: {
      os,
      deviceToken,
      profiles,
      active
    },
    withCredentials: true,
    headers: {
      Authorization: `Basic ${base64.encode(`${username}:${password}`)}`
    }
  });

const requestDeviceDeliveries = ({ os, deviceToken, username, password }) =>
  Axios({
    method: 'GET',
    url: 'https://api.retriever-info.com/appserver/delivery',
    params: {
      os,
      deviceToken
    },
    withCredentials: true,
    headers: {
      Authorization: `Basic ${base64.encode(`${username}:${password}`)}`
    }
  });

const disableDeviceDeliveries = ({ os, deviceToken, username, password }) =>
  Axios({
    method: 'GET',
    url: 'https://api.retriever-info.com/appserver/delivery/disable',
    params: {
      os,
      deviceToken
    },
    withCredentials: true,
    headers: {
      Authorization: `Basic ${base64.encode(`${username}:${password}`)}`
    }
  });

export {
  requestDeliverySetup,
  requestDeviceDeliveries,
  disableDeviceDeliveries
};
