import profileGroups from './reducers/profiles-reducer.js';
import favorites from './reducers/favorite-reducer.js';
import properties from './reducers/properties.js';
import access from './reducers/access-reducer.js';
import user from './reducers/user-reducer.js';
import deviceInfo from './reducers/deviceInfo-reducer';
import articles from './reducers/article-reducer';
import netInfo from './reducers/netinfo-reducer';
import notifications from './reducers/notifications-reducer';

const appReducers = {
  user,
  access,
  profileGroups,
  favorites,
  properties,
  deviceInfo,
  articles,
  netInfo,
  notifications
};

export default appReducers;
