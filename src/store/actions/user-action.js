import axios from 'axios';
import Heap from '@heap/react-native-heap';
import * as Keychain from 'react-native-keychain';

import {
  SET_USER,
  RESET_STATE_TO_INITIAL
} from '../../constants/user-constants.js';
import { URL_LOGOUT } from '../../constants/api-url-contants.js';

const setUser = user => {
  return {
    type: SET_USER,
    user
  };
};

export const clearEntireState = () => ({
  type: RESET_STATE_TO_INITIAL
});

const logoutUser = global => dispatch => {
  Heap.resetIdentity();
  if (global) {
    axios
      .get(URL_LOGOUT, {
        withCredentials: true
      })
      .then(() => {
        Keychain.resetInternetCredentials('Retriever');
        dispatch(clearEntireState());
      })
      .catch(() => {
        Keychain.resetInternetCredentials('Retriever');
        dispatch(clearEntireState());
      });
  } else {
    dispatch(clearEntireState());
  }
};

export { setUser, logoutUser };
