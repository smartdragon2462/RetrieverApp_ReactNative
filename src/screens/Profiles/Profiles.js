/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { SafeAreaView, Dimensions, Alert, View } from 'react-native';
import { arrayOf, object, number, func, shape, string } from 'prop-types';
import { SectionList, ThemeContext } from 'react-navigation';
import { connect } from 'react-redux';
import Moment from 'moment';
import * as Keychain from 'react-native-keychain';
import Heap from '@heap/react-native-heap';
import Fuse from 'fuse.js';
import {
  toggleAllProfiles,
  toggleGroup,
  toggleProfile,
  selectOneProfileById,
  toggleFavoriteProfile,
  favoriteProfiles,
  notificationProfiles,
  toggleNotificationProfile
} from '../../store/actions/profile-actions';
import setAccess from '../../store/actions/access-action.js';
import setProperties from '../../store/actions/properties-action.js';
import setProfileGroup from '../../store/actions/profile-group-action.js';
import UserShape from '../../prop-types/user-prop-types';
import getCountryCode from '../../utils/countryCode.js';
import ProfileSelection from '../../utils/ProfileSelection.js';
import ListFilterMenu from '../../components/ListFilterMenu/ListFilterMenu';
import {
  getMonitorProfiles,
  removeFavoriteProfileRequest,
  addFavoriteProfileRequest,
  getFavoriteProfiles
} from '../../api/profiles.js';
import {
  requestDeliverySetup,
  requestDeviceDeliveries
} from '../../api/deliveries';
import { getAllFavoriteProfiles } from '../../utils/profile-tools';
import AnimatedView from '../../components/AnimatedView/AnimatedView';
import ProfileListItem from '../../components/ProfileListItem/ProfileListItem';
import ProfileListSectionheader from '../../components/ProfileListSectionHeader/ProfileListSectionHeader';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import ZeroState from '../../components/ZeroState/ZeroState.js';

const mapStateToProps = state => ({
  profileGroups: state.profileGroups,
  favorites: state.favorites,
  notifications: state.notifications,
  disabled: state.profileGroups.length === 0,
  location: state.location,
  properties: state.properties,
  access: state.access,
  user: state.user,
  deviceInfo: state.deviceInfo
});

const mapDispatchToProps = dispatch => ({
  setUserAccess: access => {
    dispatch(setAccess(access));
  },
  setInitialProperties: access => {
    dispatch(setProperties(access));
  },
  selectProfile(ids) {
    dispatch(toggleProfile(ids));
  },
  selectGroup(id) {
    dispatch(toggleGroup(id));
  },
  selectAll() {
    dispatch(toggleAllProfiles());
  },
  selectOneProfileById(id) {
    dispatch(selectOneProfileById(id));
  },
  setInitialProfiles: initialProfiles => {
    const profileSelected = new ProfileSelection(initialProfiles.profileGroups);
    if (profileSelected.ids.length === 0) {
      profileSelected.addAll();
    }
    const getSelectedProfiles = profileSelected.get();
    dispatch(setProfileGroup(getSelectedProfiles));
  },
  setFavoriteProfiles(ids) {
    dispatch(favoriteProfiles(ids));
  },
  toggleFavorite(id) {
    dispatch(toggleFavoriteProfile(id));
  },
  setNotificationProfiles(payload) {
    dispatch(notificationProfiles(payload));
  },
  toggleNotification(id) {
    dispatch(toggleNotificationProfile(id));
  }
});

class Profiles extends React.Component {
  constructor(props) {
    super(props);
    const { height, width } = Dimensions.get('window');
    this.state = {
      loading: false,
      dimensions: { height, width },
      searchTerm: ''
    };
    this.onPressProfile = this.onPressProfile.bind(this);
    this.onPressProfileFavoriteToggle = this.onPressProfileFavoriteToggle.bind(
      this
    );
    this.onPressProfileNotificationToggle = this.onPressProfileNotificationToggle.bind(
      this
    );
  }

  componentDidMount() {
    Heap.track('viewed-profiles-screen', {});
    Dimensions.addEventListener('change', () => {
      const { height, width } = Dimensions.get('window');
      this.setState({
        dimensions: { height, width }
      });
    });
    this.getAllOfProfiles();
    this.getDelivery();
  }

  componentDidUpdate(newProps) {
    const { user } = newProps;
    const { navigation } = this.props;
    if (!user.userName) {
      navigation.navigate('login');
    }
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  onPressProfile = profile => {
    const { navigation } = this.props;
    navigation.navigate('articleList', { profile });
  };

  onPressProfileFavoriteToggle(profile) {
    const { user, toggleFavorite } = this.props;
    if (profile.isFavorite) {
      removeFavoriteProfileRequest({
        emailToken: user.emailLogin.token,
        profileId: profile.id
      })
        .then(() => toggleFavorite(profile.id))
        .catch(err => console.error(err.response));
    } else {
      addFavoriteProfileRequest({
        emailToken: user.emailLogin.token,
        profileId: profile.id
      })
        .then(() => toggleFavorite(profile.id))
        .catch(err => console.error(err));
    }
  }

  onPressProfileNotificationToggle(profile) {
    const { toggleNotification, notifications } = this.props;
    const newNotifications = notifications.includes(profile.id)
      ? notifications.filter(id => id !== profile.id)
      : notifications.concat(profile.id);
    Keychain.getInternetCredentials('Retriever')
      .then(credentials => {
        if (credentials.password) {
          const {
            deviceInfo: { deviceId, systemName }
            // profileGroups
          } = this.props;
          requestDeliverySetup({
            os: systemName,
            deviceToken: deviceId,
            profiles: newNotifications,
            active: true,
            username: credentials.username,
            password: credentials.password
          })
            // eslint-disable-next-line no-unused-vars
            .then(response => {
              toggleNotification(profile.id);
            })
            .catch(error => console.error('notification error', error));
        }
      })
      .catch(error => console.error('no user', error));
  }

  getAllOfProfiles() {
    const {
      setUserAccess,
      setInitialProfiles,
      setInitialProperties,
      setFavoriteProfiles,
      user
    } = this.props;
    this.setState({ loading: true });
    const requests = [getMonitorProfiles()];
    if (user.emailLogin && user.emailLogin.token) {
      requests.push(getFavoriteProfiles({ emailToken: user.emailLogin.token }));
    }
    Promise.all(requests)
      .then(([profilesPromise, favoriteProfilesPromise]) => {
        setInitialProperties(user);
        setUserAccess(user.access);
        Moment.locale(getCountryCode((user.language = 'EN')));
        setInitialProfiles(profilesPromise.data);
        if (user.emailLogin && user.emailLogin.token) {
          setFavoriteProfiles(favoriteProfilesPromise.data);
        }
        this.setState({ loading: false });
      })
      .catch(error => {
        console.error('error getting profiles', error);
        this.setState({ loading: false });
        Alert.alert(
          'Houston, we have a problem.',
          'Could not get profiles. Try again soon.'
        );
      });
  }

  getDelivery() {
    const {
      deviceInfo: { deviceId, systemName },
      setNotificationProfiles
    } = this.props;

    Keychain.getInternetCredentials('Retriever')
      .then(credentials => {
        if (credentials.password) {
          requestDeviceDeliveries({
            os: systemName,
            deviceToken: deviceId,
            username: credentials.username,
            password: credentials.password
          })
            .then(response => {
              if (response.data && response.data.profiles) {
                setNotificationProfiles(response.data.profiles);
              }
            })
            .catch(error => console.error('notification error', error));
        }
      })
      .catch(error => console.error('no user', error));
  }

  handleChangeSearchTerm = searchTerm => {
    this.setState({
      searchTerm
    });
  };

  renderListHeader = () => {
    const { searchTerm } = this.state;
    const theme = ThemeContext._currentValue;
    return (
      <View>
        <ScreenHeader titleTop="SELECT A" titleBottom="PROFILE" theme={theme} />
        <ListFilterMenu
          searchTerm={searchTerm}
          handleChangeSearchTerm={this.handleChangeSearchTerm}
          theme={theme}
        />
      </View>
    );
  };

  render() {
    const { profileGroups, favorites, notifications, user } = this.props;
    const { loading, dimensions, searchTerm } = this.state;
    const theme = ThemeContext._currentValue;
    let zeroState;
    if (loading === true) {
      zeroState = (
        <ZeroState
          loading
          message="Getting Profiles"
          deviceHeight={dimensions.height}
          theme={theme}
        />
      );
    } else {
      zeroState = (
        <ZeroState
          loading={false}
          message="Could not get profiles. Pull down to try again."
          deviceHeight={dimensions.height}
          theme={theme}
        />
      );
    }

    const listOfProfiles = [];
    const fuseOptions = {
      shouldSort: true,
      threshold: 0.3,
      keys: ['name']
    };
    const fuse = new Fuse([], fuseOptions);
    const isEmailUser = user.emailLogin && !!user.emailLogin.token;
    if (isEmailUser) {
      let favoritesList = getAllFavoriteProfiles(profileGroups, favorites);
      if (searchTerm) {
        fuse.setCollection(favoritesList);
        favoritesList = fuse.search(searchTerm);
      }
      if (favoritesList.length > 0) {
        listOfProfiles.push({
          title: 'Favorites',
          data: favoritesList
        });
      }
    }
    if (profileGroups[0] && profileGroups[0].profiles) {
      profileGroups.forEach(group => {
        let { profiles } = group;
        if (searchTerm) {
          fuse.setCollection(profiles);
          profiles = fuse.search(searchTerm);
        }
        if (profiles.length) {
          listOfProfiles.push({
            ...group,
            title: group.id === -1 ? 'Ungrouped' : group.name,
            data: profiles
          });
        }
      });
    }

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme === 'light' ? '#fff' : '#000'
        }}
      >
        {this.renderListHeader()}
        <SectionList
          initialNumToRender={20}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled
          progressViewOffset={50}
          onRefresh={() => this.getAllOfProfiles()}
          refreshing={loading}
          ListEmptyComponent={zeroState}
          sectionStyle={{ borderBottomWidth: 0.2, borderBottomColor: '#999' }}
          sections={listOfProfiles}
          keyExtractor={item => item.id}
          renderSectionHeader={({ section }) =>
            section.title ? (
              <ProfileListSectionheader profileGroup={section} theme={theme} />
            ) : null
          }
          renderItem={({ item, index }) => (
            <AnimatedView index={index}>
              <ProfileListItem
                key={item.id}
                theme={theme}
                isEmailUser={user.emailLogin && user.emailLogin.token}
                onPressProfileItem={() => this.onPressProfile(item)}
                onPressProfileFavoriteToggle={this.onPressProfileFavoriteToggle}
                onPressProfileNotificationToggle={
                  this.onPressProfileNotificationToggle
                }
                profile={{
                  ...item,
                  isFavorite: favorites.includes(item.id),
                  isNotification: notifications.includes(item.id)
                }}
              />
            </AnimatedView>
          )}
        />
      </SafeAreaView>
    );
  }
}

Profiles.contextType = ThemeContext;

Profiles.propTypes = {
  profileGroups: arrayOf(object).isRequired,
  favorites: arrayOf(number).isRequired,
  notifications: arrayOf(number).isRequired,
  setUserAccess: func.isRequired,
  setInitialProfiles: func.isRequired,
  setInitialProperties: func.isRequired,
  setFavoriteProfiles: func.isRequired,
  toggleFavorite: func.isRequired,
  toggleNotification: func.isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired,
  user: UserShape.isRequired,
  deviceInfo: shape({
    deviceId: string,
    systemName: string
  }).isRequired,
  setNotificationProfiles: func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
