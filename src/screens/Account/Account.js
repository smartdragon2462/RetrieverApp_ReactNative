/* eslint-disable no-underscore-dangle */
import React from 'react';
import { func, shape, string } from 'prop-types';
import {
  ScrollView,
  SafeAreaView,
  Alert,
  Linking,
  TouchableOpacity
} from 'react-native';
import Mailer from 'react-native-mail';
import Heap from '@heap/react-native-heap';
import { connect } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import { ThemeContext } from 'react-navigation';
import * as Keychain from 'react-native-keychain';
import {
  getReadableVersion,
  getSystemName,
  getSystemVersion
} from 'react-native-device-info';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import { logoutUser } from '../../store/actions/user-action';
import UserListItem from '../../components/UserListItem/UserListItem';
import ListItem from '../../components/ListItem/ListItem.js';
import UserShape from '../../prop-types/user-prop-types';
import Button from '../../components/Button/Button';
import { disableDeviceDeliveries } from '../../api/deliveries';

const mapStateToProps = state => ({
  user: state.user,
  deviceInfo: state.deviceInfo,
  notifications: state.notifications
});

const mapDispatchToProps = dispatch => () => ({
  logoutUserHandler() {
    dispatch(logoutUser(true));
  }
});

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      appVersion: '0',
      systemName: 'device',
      systemVersion: '0'
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleGoToPortal = this.handleGoToPortal.bind(this);
    this.handleGoToNotifications = this.handleGoToNotifications.bind(this);
    this.handleGoToSavedArticles = this.handleGoToSavedArticles.bind(this);
    this.handleGiveFeedback = this.handleGiveFeedback.bind(this);
  }

  static getDerivedStateFromProps(props) {
    const { user } = props;
    const { navigation } = props;
    if (!user.userName) {
      navigation.navigate('login');
    }

    return null;
  }

  componentDidMount() {
    this.setState({
      appVersion: getReadableVersion(),
      systemName: getSystemName(),
      systemVersion: getSystemVersion()
    });

    Heap.track('viewed-account-screen', {});
  }

  handleLogout() {
    const { logoutUserHandler } = this.props;
    Alert.alert(
      'Are you sure?',
      'Confirm you want to logout',
      [
        {
          text: 'Cancel',
          onPress: () => console.error('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            Keychain.getInternetCredentials('Retriever').then(credentials => {
              const {
                deviceInfo: { deviceId, systemName }
              } = this.props;
              if (credentials.password) {
                disableDeviceDeliveries({
                  os: systemName,
                  deviceToken: deviceId,
                  username: credentials.username,
                  password: credentials.password
                })
                  .then(() => {
                    PushNotification.unregister();
                    logoutUserHandler();
                  })
                  .catch(error => {
                    console.log('notification error', error);
                    PushNotification.unregister();
                    logoutUserHandler();
                  });
              }
            });
          }
        }
      ],
      { cancelable: false }
    );
  }

  // eslint-disable-next-line class-methods-use-this
  handleGiveFeedback() {
    const { systemName, appVersion, systemVersion, user } = this.state;
    Mailer.mail(
      {
        subject: `Retriever App Feedback //device: ${systemName}/${systemVersion} app: ${appVersion} account: ${user.account}`,
        recipients: ['beta@retriever.no'],
        isHTML: true
      },
      error => {
        console.error(error);
      }
    );
  }

  // eslint-disable-next-line class-methods-use-this
  handleGoToPortal() {
    Keychain.getInternetCredentials('Retriever').then(credentials => {
      Linking.openURL(
        `https://app.retriever-info.com/login?username=${credentials.username}&password=${credentials.password}`
      ).catch(err => console.error('An error occurred', err));
    });
  }

  handleGoToNotifications() {
    const { navigation } = this.props;
    navigation.navigate('notifications');
  }

  handleGoToSavedArticles() {
    const { navigation } = this.props;
    navigation.navigate('savedArticles');
  }

  render() {
    const { user, systemName, appVersion, systemVersion } = this.state;
    const theme = ThemeContext._currentValue;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme === 'light' ? '#fff' : '#000'
        }}
      >
        <ScrollView>
          <ScreenHeader titleTop="YOUR" titleBottom="SETTINGS" theme={theme} />
          <UserListItem
            user={user}
            systemName={systemName}
            systemVersion={systemVersion}
            appVersion={appVersion}
            theme={theme}
          />
          <ListItem
            leftIconName="log-out"
            title="LOGOUT"
            color="#a81916"
            handleOnPress={this.handleLogout}
          />
          <ListItem
            leftIconName="bell"
            title="NOTIFICATIONS"
            color={theme === 'light' ? '#333' : '#ddd'}
            handleOnPress={this.handleGoToNotifications}
          />
          <ListItem
            leftIconName="bookmark"
            title="BOOKMARKED ARTICLES"
            color={theme === 'light' ? '#333' : '#ddd'}
            handleOnPress={this.handleGoToSavedArticles}
          />
          <ListItem
            leftIconName="mail"
            title="GIVE US FEEDBACK"
            color={theme === 'light' ? '#333' : '#ddd'}
            handleOnPress={this.handleGiveFeedback}
          />
          <TouchableOpacity
            style={{
              // marginTop: 180,
              display: 'flex',
              padding: 20,
              justifyContent: 'center'
            }}
          >
            <Button
              title="GO TO PORTAL"
              type="primary"
              onPress={this.handleGoToPortal}
            />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

Account.contextType = ThemeContext;

Account.propTypes = {
  user: UserShape.isRequired,
  logoutUserHandler: func.isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired,
  deviceInfo: shape({
    deviceId: string,
    systemName: string
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
