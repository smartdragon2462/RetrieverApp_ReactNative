import {
  SET_NOTIFICATION_PROFILES,
  TOGGLE_NOTIFICATION_PROFILE
} from '../../constants/profile-constants.js';

const notifications = (state = [], action) => {
  switch (action.type) {
    case SET_NOTIFICATION_PROFILES: {
      return action.ids;
    }
    case TOGGLE_NOTIFICATION_PROFILE: {
      return state.includes(action.id)
        ? state.filter(id => id !== action.id)
        : state.concat(action.id);
    }
    default:
      return state;
  }
};

export default notifications;
