import {
  TOGGLE_ALL_PROFILES,
  TOGGLE_GROUP,
  TOGGLE_PROFILE,
  SELECT_PROFILES_BY_ID,
  SELECT_ONE_PROFILE_BY_ID,
  SET_FAVORITES,
  TOGGLE_FAVORITE_PROFILE,
  SET_NOTIFICATION_PROFILES,
  TOGGLE_NOTIFICATION_PROFILE
} from '../../constants/profile-constants.js';

export const toggleProfile = id => ({
  type: TOGGLE_PROFILE,
  id
});

export const toggleGroup = id => ({
  type: TOGGLE_GROUP,
  id
});

export const toggleAllProfiles = () => ({
  type: TOGGLE_ALL_PROFILES
});

export const selectProfilesById = id => ({
  type: SELECT_PROFILES_BY_ID,
  id
});

export const selectOneProfileById = id => ({
  type: SELECT_ONE_PROFILE_BY_ID,
  id
});

export const favoriteProfiles = ids => ({
  type: SET_FAVORITES,
  ids
});

export const toggleFavoriteProfile = id => ({
  type: TOGGLE_FAVORITE_PROFILE,
  id
});

export const notificationProfiles = ids => ({
  type: SET_NOTIFICATION_PROFILES,
  ids
});

export const toggleNotificationProfile = id => ({
  type: TOGGLE_NOTIFICATION_PROFILE,
  id
});

export const copyToProfile = id => ({
  type: 'COPY_TO_PROFILE',
  id
});
