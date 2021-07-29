import React from 'react';
import { func, shape } from 'prop-types';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// eslint-disable-next-line import/no-unresolved
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import Heap from '@heap/react-native-heap';

import BaseAuth from './screens/BaseAuth/BaseAuth';
import Login from './screens/Login/Login';
import Loading from './screens/Loading/Loading';
import News from './screens/News/News';
import Profiles from './screens/Profiles/Profiles';
import Article from './screens/Article/Article';
import ArticleList from './screens/ArticleList/ArticleList';

import Account from './screens/Account/Account';
import Preferences from './screens/Preferences/Preferences';
import Notifications from './screens/Notifications/Notifications';
import SavedArticles from './screens/SavedArticles/SavedArticles';

import TabBarIcon from './components/TabBarIcon/TabBarIcon';
import NotificationContent from './screens/NotificationContent/NotificationContent';
import NavigationService from './utils/navigation-service';

const AuthNavigator = createStackNavigator(
  {
    base: BaseAuth,
    login: Login
  },
  {
    initialRouteName: 'base',
    headerMode: 'none',
    mode: 'modal',
    transparentCard: true,
    cardStyle: {
      backgroundColor: 'rgba(255,255,255,1)'
    }
  }
);

export const AuthScreens = ({ navigation }) => (
  <AuthNavigator
    navigation={navigation} // eslint-disable-next-line react/jsx-no-bind
    ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }}
  />
);

AuthScreens.router = AuthNavigator.router;

const AccountStack = createStackNavigator(
  {
    account: Account,
    editPreference: Preferences,
    notifications: Notifications,
    // notificationContent: NotificationContent,
    notificationContent: {
      screen: NotificationContent,
      path: 'notification/:notification'
    },
    savedArticles: SavedArticles,
    article: {
      screen: Article,
      navigationOptions: {
        gestureEnabled: true,
        gestureResponseDistance: { horizontal: 25 }
      }
    }
  },
  {
    initialRouteName: 'account',
    headerMode: 'none'
  }
);

AccountStack.navigationOptions = ({ navigation }) => {
  const { state } = navigation;
  let tabBarVisible = true;

  const { routeName } = state.routes[state.index];

  if (routeName === 'article') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const NewsStack = createStackNavigator(
  {
    news: News,
    article: {
      screen: Article,
      navigationOptions: {
        gestureEnabled: true,
        gestureResponseDistance: { horizontal: 25 }
      }
    }
  },
  {
    initialRouteName: 'news',
    headerMode: 'none'
    // mode: 'modal'
  }
);

NewsStack.navigationOptions = ({ navigation }) => {
  const { state } = navigation;
  let tabBarVisible = true;

  const { routeName } = state.routes[state.index];

  if (routeName === 'article') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const ProfilesStack = createStackNavigator(
  {
    profiles: Profiles,
    articleList: ArticleList,
    article: {
      screen: Article,
      navigationOptions: {
        gestureEnabled: true,
        gestureResponseDistance: { horizontal: 25 }
      },
      path: 'article/:docId/:profiles'
    }
  },
  {
    initialRouteName: 'profiles',
    headerMode: 'none'
    // mode: 'modal'
  }
);

ProfilesStack.navigationOptions = ({ navigation }) => {
  const { state } = navigation;
  let tabBarVisible = true;

  const { routeName } = state.routes[state.index];

  if (routeName === 'article') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const MainNavigator = createBottomTabNavigator(
  {
    News: {
      screen: NewsStack,
      navigationOptions: () => ({
        title: 'News',
        // eslint-disable-next-line react/display-name, react/prop-types
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarIcon
            name={focused ? 'star' : 'star-outline'}
            size={28}
            color={tintColor}
          />
        )
      })
    },
    Profiles: {
      screen: ProfilesStack,
      navigationOptions: () => ({
        title: 'Profiles',
        // eslint-disable-next-line react/display-name, react/prop-types
        tabBarIcon: ({ focused, tintColor }) => {
          return (
            <TabBarIcon
              name={focused ? 'subtitles' : 'subtitles-outline'}
              size={28}
              color={tintColor}
            />
          );
        }
      })
    },
    Account: {
      screen: AccountStack,
      navigationOptions: () => ({
        title: 'Settings',
        // eslint-disable-next-line react/display-name, react/prop-types
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarIcon
            name={focused ? 'settings' : 'settings-outline'}
            size={28}
            color={tintColor}
          />
        )
      })
    }
  },
  {
    initialRouteName: 'News',
    paths: [{ News: 'news' }, { Profiles: 'profiles' }, { Account: 'account' }],
    tabBarOptions: {
      activeTintColor: { light: '#000', dark: '#fff' },
      inactiveTintColor: { light: '#797989', dark: '#aaa' },
      style: {
        borderTopWidth: 0
      },
      labelStyle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12
      }
    }
  }
);

const appNavigator = createSwitchNavigator(
  {
    loading: Loading,
    auth: AuthNavigator,
    main: { screen: MainNavigator, path: '' }
  },
  {
    initialRouteName: 'loading'
  }
);

AuthScreens.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};

const AppContainer = Heap.withReactNavigationAutotrack(
  createAppContainer(appNavigator)
);

const Navigator = () => {
  const theme = useColorScheme();
  console.log('app theme', theme);
  return (
    <AppearanceProvider>
      <AppContainer
        theme={theme}
        // eslint-disable-next-line react/jsx-no-bind
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </AppearanceProvider>
  );
};

export default Navigator;
