import { SET_DEVICE_INFO } from '../../constants/ActionTypes';

const deviceInfo = (state = {}, action) => {
  switch (action.type) {
    case SET_DEVICE_INFO: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default deviceInfo;
