import { UPDATE_CONNECTION_STATUS } from '../../constants/ActionTypes';

const initialState = {
  isConnected: true
};

const netInfo = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CONNECTION_STATUS:
      return {
        ...state,
        isConnected: action.isConnected
      };
    default:
      return state;
  }
};

export default netInfo;
