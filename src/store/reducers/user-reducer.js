import { SET_USER } from '../../constants/user-constants.js';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user || null;

    default:
      return state;
  }
};
