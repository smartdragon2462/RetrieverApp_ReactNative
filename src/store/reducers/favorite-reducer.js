import {
  SET_FAVORITES,
  TOGGLE_FAVORITE_PROFILE
} from '../../constants/profile-constants.js';

const favorites = (state = [], action) => {
  switch (action.type) {
    case SET_FAVORITES: {
      return action.ids;
    }

    case TOGGLE_FAVORITE_PROFILE: {
      return state.includes(action.id)
        ? state.filter(id => id !== action.id)
        : state.concat(action.id);
    }

    default:
      return state;
  }
};

export default favorites;
