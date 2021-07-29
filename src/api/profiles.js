import Axios from 'axios';
import { URL_FAVORITE_PROFILES } from '../constants/api-url-contants';
import getCoreApiRoot from '../utils/api-root.js';

const profileGroups = {};

const getMonitorProfiles = () =>
  Axios({
    method: 'GET',
    withCredentials: true,
    timeout: 5000,
    url: `${getCoreApiRoot()}/services/profiles/monitor`
  });

const returnProfileGroup = (groupId, onlyVisible) => {
  let promise = profileGroups[groupId];
  if (!promise) {
    promise = Axios.get(
      `${getCoreApiRoot()}/services/profiles/monitor/group` +
        `?groupId=${groupId}&onlyVisible=${onlyVisible}`,
      { withCredentials: true, timeout: 5000 }
    );
    profileGroups[groupId] = promise;
  }
  return promise.then(group => JSON.parse(JSON.stringify(group)));
};

const getFavoriteProfiles = ({ emailToken }) =>
  Axios({
    method: 'GET',
    timeout: 5000,
    url: URL_FAVORITE_PROFILES,
    withCredentials: true,
    headers: {
      Authorization: `Retriever email-login=${emailToken}`
    }
  });

const addFavoriteProfileRequest = ({ emailToken, profileId }) =>
  Axios({
    method: 'POST',
    timeout: 5000,
    url: `${URL_FAVORITE_PROFILES}/add/${profileId}`,
    withCredentials: true,
    headers: {
      Authorization: `Retriever email-login=${emailToken}`
    }
  });

const removeFavoriteProfileRequest = ({ emailToken, profileId }) =>
  Axios({
    method: 'DELETE',
    timeout: 5000,
    url: `${URL_FAVORITE_PROFILES}/remove/${profileId}`,
    withCredentials: true,
    headers: {
      Authorization: `Retriever email-login=${emailToken}`
    }
  });

export {
  getMonitorProfiles,
  returnProfileGroup,
  getFavoriteProfiles,
  addFavoriteProfileRequest,
  removeFavoriteProfileRequest
};
