/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  SafeAreaView,
  Alert,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Heap from '@heap/react-native-heap';
import { NavigationEvents, SectionList, ThemeContext } from 'react-navigation';
import { shape, func, arrayOf, object, number } from 'prop-types';
import Moment from 'moment';
import { groupBy } from 'lodash';
import { allSelectedProfilesIds } from '../../utils/profile-tools.js';
import { getMonitorProfiles, getFavoriteProfiles } from '../../api/profiles.js';
import {
  toggleAllProfiles,
  toggleGroup,
  toggleProfile,
  selectOneProfileById,
  favoriteProfiles
} from '../../store/actions/profile-actions';
import setProfileGroup from '../../store/actions/profile-group-action.js';
import ProfileSelection from '../../utils/ProfileSelection.js';
import setAccess from '../../store/actions/access-action.js';
import setProperties from '../../store/actions/properties-action.js';
import getCountryCode from '../../utils/countryCode.js';
import ListItemSeparator from '../../components/ListItemSeparator/ListItemSeparator.js';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import ZeroState from '../../components/ZeroState/ZeroState.js';
import AnimatedView from '../../components/AnimatedView/AnimatedView';
import UserShape from '../../prop-types/user-prop-types';
import { getListOfTopProfileArticles } from '../../api/doccy';
import ArticleListItem from '../../components/ArticleListItem/ArticleListItem';
import ProfileListSectionHeader from '../../components/ProfileListSectionHeader/ProfileListSectionHeader.js';

const mapStateToProps = state => ({
  profileGroups: state.profileGroups,
  favorites: state.favorites,
  disabled: state.profileGroups.length === 0,
  location: state.location,
  properties: state.properties,
  access: state.access,
  user: state.user
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
  }
});
class News extends React.Component {
  constructor(props) {
    super(props);
    const { height, width } = Dimensions.get('window');
    this.state = {
      articleList: [],
      loading: false,
      dimensions: { height, width }
    };
    this.onPressListItem = this.onPressListItem.bind(this);
    this.onPressListSectionHeader = this.onPressListSectionHeader.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    Heap.identify(user.account.toString());
    Heap.addUserProperties({
      invoicePlace: user.invoicePlace,
      isWhiteListedIpAddress: user.isWhiteListedIpAddress,
      accountRole: user.accountRole,
      customer: user.customer
    });
    Heap.track('viewed-news-screen', {});
    console.log(user);
    Dimensions.addEventListener('change', this.handleDimensionChange);
    this.getAllOfProfiles();
  }

  static getDerivedStateFromProps(props) {
    const { user } = props;
    const { navigation } = props;
    if (!user.userName) {
      navigation.navigate('login');
    }

    return null;
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleDimensionChange);
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
    console.log(user, requests);

    Promise.all(requests)
      .then(([profilesPromise, favoriteProfilesPromise]) => {
        console.log(
          'promise for getting profiles',
          profilesPromise,
          favoriteProfilesPromise
        );
        setInitialProperties(user);
        setUserAccess(user.access);
        Moment.locale(getCountryCode((user.language = 'EN')));
        setInitialProfiles(profilesPromise.data);
        if (user.emailLogin && user.emailLogin.token) {
          setFavoriteProfiles(favoriteProfilesPromise.data);
        }
        this.getArticles();
        this.mounted = true;
      })
      .catch(error => {
        console.log('getAllOfProfiles error in News', JSON.stringify(error));
        this.setState({
          loading: false
        });
      });
  }

  getArticles = () => {
    const { user, profileGroups, favorites } = this.props;
    this.setState({ loading: true });
    const to = Moment().format('YYYY-MM-DD');
    const from = Moment()
      .subtract(30, 'days')
      .format('YYYY-MM-DD');
    getListOfTopProfileArticles({
      profiles:
        favorites.length > 0
          ? favorites
          : allSelectedProfilesIds(profileGroups),
      from,
      to,
      sessionId: user.sessionId
    })
      .then(res => {
        console.log(res.data.documents);
        const sections = groupBy(
          res.data.documents,
          document => document.profileData[0].profile.id
        );
        const articleList = Object.entries(sections).map(
          ([profileId, articles]) => ({
            id: profileId,
            title: articles[0].profileData[0].profile.name,
            data: articles
          })
        );
        this.setState({
          articleList,
          loading: false
        });
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        this.setState(
          {
            loading: false
          },
          () =>
            Alert.alert(
              'Houston, we have a problem.',
              'Could not get articles. Try again soon.'
            )
        );
      });
  };

  listItemKeyExtractor = item => item.docId;

  onPressListSectionHeader = item => {
    const { navigation } = this.props;
    const profile = { name: item.title, id: item.id };
    navigation.navigate('articleList', { profile });
  };

  onPressListItem = item => {
    const { navigation } = this.props;
    navigation.navigate('article', {
      ...item,
      docId: item.docId,
      profiles: item.profileData.map(({ profile }) => profile.id)
    });
  };

  handleDidFocus = () => {
    if (this.mounted) {
      this.getArticles();
    }
  };

  handleDimensionChange = ({ window }) => {
    const { height, width } = window;
    this.setState({
      dimensions: { height, width }
    });
  };

  renderListItem = item => {
    const { dimensions } = this.state;
    const theme = ThemeContext._currentValue;
    return (
      <AnimatedView index={item.index}>
        <ArticleListItem
          item={item}
          theme={theme}
          dimensions={dimensions}
          // eslint-disable-next-line react/jsx-no-bind
          onPressItem={article => this.onPressListItem(article)}
        />
      </AnimatedView>
    );
  };

  render() {
    const { articleList, loading, dimensions } = this.state;
    console.log('news loading', loading);
    const theme = ThemeContext._currentValue;
    let zeroState;
    if (loading === true) {
      zeroState = (
        <ZeroState
          loading
          message="Getting Articles"
          deviceHeight={dimensions.height}
          theme={theme}
        />
      );
    } else {
      zeroState = (
        <ZeroState
          loading={false}
          deviceHeight={dimensions.height}
          message="Could not get articles. Pull down to try again."
          theme={theme}
        />
      );
    }

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme === 'light' ? '#fff' : '#000'
        }}
      >
        <NavigationEvents onDidFocus={this.handleDidFocus} />
        <SectionList
          initialNumToRender={10}
          // removeClippedSubviews
          showsVerticalScrollIndicator={false}
          // eslint-disable-next-line react/jsx-no-bind
          ItemSeparatorComponent={() => <ListItemSeparator theme={theme} />}
          stickySectionHeadersEnabled
          progressViewOffset={50}
          // eslint-disable-next-line react/jsx-no-bind
          onRefresh={() => this.getArticles()}
          refreshing={loading}
          ListEmptyComponent={zeroState}
          ListHeaderComponent={
            <ScreenHeader
              titleTop="YOUR"
              titleBottom="NEWS FEED"
              theme={theme}
            />
          }
          sectionStyle={{
            borderBottomWidth: 0.2,
            borderBottomColor: '#999'
          }}
          sections={articleList}
          // eslint-disable-next-line react/jsx-no-bind
          keyExtractor={item => item.docId}
          // eslint-disable-next-line react/jsx-no-bind
          renderSectionHeader={({ section }) =>
            section.title ? (
              <TouchableOpacity
                // eslint-disable-next-line react/jsx-no-bind
                onPress={() => this.onPressListSectionHeader(section)}
              >
                <ProfileListSectionHeader
                  theme={theme}
                  profileGroup={section}
                  showChevron
                />
              </TouchableOpacity>
            ) : null
          }
          // eslint-disable-next-line react/jsx-no-bind
          renderItem={this.renderListItem}
        />
      </SafeAreaView>
    );
  }
}

News.contextType = ThemeContext;

News.propTypes = {
  user: UserShape.isRequired,
  profileGroups: arrayOf(object).isRequired,
  favorites: arrayOf(number).isRequired,
  setUserAccess: func.isRequired,
  setInitialProfiles: func.isRequired,
  setInitialProperties: func.isRequired,
  setFavoriteProfiles: func.isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
