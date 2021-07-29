import {
  TOGGLE_PROFILE,
  TOGGLE_GROUP,
  TOGGLE_ALL_PROFILES,
  SELECT_PROFILES_BY_ID
} from '../../constants/profile-constants.js';

import {
  toggleProfile,
  toggleGroup,
  toggleAllProfiles,
  selectProfilesById
} from './profile-actions.js';

describe('profileGroups actions', () => {
  it('should toggle a profile', () => {
    const id = [1094888];
    const expectedAction = {
      type: TOGGLE_PROFILE,
      id
    };
    expect(toggleProfile(id)).toEqual(expectedAction);
  });

  it('should toggle a group', () => {
    const id = [1094888];
    const expectedAction = {
      type: TOGGLE_GROUP,
      id
    };
    expect(toggleGroup(id)).toEqual(expectedAction);
  });

  it('should select profiles based on ids', () => {
    const id = [1094888, 1105485];
    const expectedAction = {
      type: SELECT_PROFILES_BY_ID,
      id
    };
    expect(selectProfilesById(id)).toEqual(expectedAction);
  });

  it('should create an action to select all profiles', () => {
    const expectedAction = {
      type: TOGGLE_ALL_PROFILES
    };
    expect(toggleAllProfiles()).toEqual(expectedAction);
  });
});
