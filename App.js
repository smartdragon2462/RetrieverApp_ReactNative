import React from 'react';
import { StatusBar, Linking, Platform } from 'react-native';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import PushNotification from 'react-native-push-notification';
// eslint-disable-next-line import/no-unresolved
import { enableScreens } from 'react-native-screens';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import thunk from 'redux-thunk';
import { SENDER_ID } from 'react-native-dotenv';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import axios from 'axios';
import initStore from './src/store/store.js';
import appReducers from './src/store/app-reducer.js';
import { RESET_STATE_TO_INITIAL } from './src/constants/user-constants.js';
import { loadState, saveState } from './src/utils/local-storage';
import AppNavigator from './src/router';
import { uriPrefix } from './src/constants/config';
import NavigationService from './src/utils/navigation-service';
import { logoutUser } from './src/store/actions/user-action.js';

const middleware = [thunk];
let reduxStore;

enableScreens();

const handleNotification = notification => {
  // Alert.alert('handleNotification', JSON.stringify(notification));
  if (Platform.OS === 'ios') {
    // alert(JSON.stringify(notification));
    NavigationService.navigate('article', {
      docId: notification.data.data.docId,
      profiles: notification.data.data.profiles
    });
  } else if (Platform.OS === 'android') {
    Linking.openURL(
      `${uriPrefix}profiles/article/${notification.docId}/${notification.profiles}`
    );
  }
};

PushNotification.configure({
  senderID: SENDER_ID,
  onNotification: notification => {
    // Alert.alert('onNotification', JSON.stringify(notification));
    if (Platform.OS === 'android') {
      if (
        (notification.foreground === false &&
          notification.userInteraction === true) ||
        (notification.foreground === false &&
          !('userInteraction' in notification))
      ) {
        handleNotification(notification);
      }
    } else if (Platform.OS === 'ios') {
      if (notification.data.userHasInteracted) {
        handleNotification(notification);
      }
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    }
  },
  popInitialNotification: true
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeFetched: false
    };
  }

  componentDidMount() {
    loadState().then(persistedState => {
      const intializer = () => {
        return { ...initStore, ...persistedState };
      };

      const combinedReducers = combineReducers({ ...appReducers });

      const rootReducer = (state, action) => {
        let stateHolder = state;
        if (action.type === RESET_STATE_TO_INITIAL) {
          stateHolder = initStore;
        }
        return combinedReducers(stateHolder, action);
      };

      reduxStore = createStore(
        rootReducer,
        intializer(),
        applyMiddleware(...middleware)
      );

      saveState(reduxStore.getState());

      this.unsubscribe = reduxStore.subscribe(() => {
        saveState(reduxStore.getState());
      });
      this.setState({ storeFetched: true }, () => SplashScreen.hide());
    });

    axios.interceptors.response.use(
      res => res,
      err => {
        if (
          err.response &&
          err.response.status &&
          err.response.status === 401
        ) {
          reduxStore.dispatch(logoutUser(true));
        }
        return Promise.reject(err);
      }
    );

    Linking.addEventListener('url', this.handleOpenUrl);
    PushNotification.setApplicationIconBadgeNumber(0);
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();

    Linking.removeEventListener('url', this.handleOpenUrl);
  }

  handleOpenUrl = ({ url }) => {
    console.warn(url);
  };

  render() {
    const { storeFetched } = this.state;
    return (
      <React.Fragment>
        <StatusBar networkActivityIndicatorVisible barStyle="dark-content" />
        {storeFetched === true && (
          <Provider store={reduxStore}>
            <AppNavigator uriPrefix={uriPrefix} />
          </Provider>
        )}
      </React.Fragment>
    );
  }
}

export default App;
