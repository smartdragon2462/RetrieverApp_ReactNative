import {
  TOGGLE_PROFILE,
  TOGGLE_GROUP,
  TOGGLE_ALL_PROFILES,
  SELECT_PROFILES_BY_ID,
  SELECT_GROUPS_BY_ID,
  SELECT_ONE_PROFILE_BY_ID
} from '../../constants/profile-constants.js';

const profileGroups = (state = [], action) => {
  switch (action.type) {
    case TOGGLE_PROFILE: {
      return state
        .map(group => ({
          ...group,
          profiles: group.profiles.map(profile => ({
            ...profile,
            selected:
              action.id === profile.id ? !profile.selected : profile.selected
          }))
        }))
        .map(group => ({
          ...group,
          selected: group.profiles.every(profile => profile.selected)
        }));
    }
    case TOGGLE_GROUP: {
      return state.map(group => ({
        ...group,
        selected: action.id === group.id ? !group.selected : group.selected,
        profiles: group.profiles.map(profile => ({
          ...profile,
          selected: action.id === group.id ? !group.selected : profile.selected
        }))
      }));
    }

    case TOGGLE_ALL_PROFILES: {
      const toggle = state.every(group => group.selected);
      return state.map(group => ({
        ...group,
        profiles: group.profiles.map(profile => ({
          ...profile,
          selected: !toggle
        })),
        selected: !toggle
      }));
    }

    case SELECT_PROFILES_BY_ID: {
      return state
        .map(group => ({
          ...group,
          profiles: group.profiles.map(profile => ({
            ...profile,
            selected: action.id.includes(profile.id)
          }))
        }))
        .map(group => ({
          ...group,
          selected: group.profiles.every(profile => profile.selected)
        }));
    }

    case SELECT_ONE_PROFILE_BY_ID: {
      return state
        .map(group => ({
          ...group,
          profiles: group.profiles.map(profile => ({
            ...profile,
            selected: action.id === profile.id
          }))
        }))
        .map(group => ({
          ...group,
          selected: group.profiles.every(profile => profile.selected)
        }));
    }

    case 'COPY_TO_PROFILE': {
      return state.map(group => ({
        ...group,
        profiles: group.profiles.map(profile => ({
          ...profile,
          copyToThis: action.id === profile.id
        }))
      }));
    }

    case SELECT_GROUPS_BY_ID: {
      return state.map(group => {
        const isSelected = action.id.includes(group.id);
        return {
          ...group,
          selected: isSelected,
          profiles: group.profiles.map(profile => ({
            ...profile,
            selected: isSelected
          }))
        };
      });
    }

    case 'SET_PROFILE_GROUP':
      return action.initialProfiles;

    default:
      return state;
  }
};

export default profileGroups;
