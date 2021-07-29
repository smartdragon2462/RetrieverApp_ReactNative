import { SET_DEVICE_INFO } from '../../constants/ActionTypes';

export const setDeviceInfo = payload => ({
  type: SET_DEVICE_INFO,
  payload
});

export default { setDeviceInfo };
