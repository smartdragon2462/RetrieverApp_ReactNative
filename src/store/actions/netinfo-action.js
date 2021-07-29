import { UPDATE_CONNECTION_STATUS } from '../../constants/ActionTypes';

const updateConnectionStatus = isConnected => ({
  type: UPDATE_CONNECTION_STATUS,
  isConnected
});

export default updateConnectionStatus;
