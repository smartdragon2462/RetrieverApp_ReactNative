/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  View,
  SafeAreaView,
  Alert,
  Switch,
  Text,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { ThemeContext } from 'react-navigation';
import Heap from '@heap/react-native-heap';
import * as Keychain from 'react-native-keychain';
import { func, shape, arrayOf, number, string } from 'prop-types';
import PushNotification from 'react-native-push-notification';
import { isEqual } from 'lodash';
import Header from '../../components/Header/Header';
import {
  requestDeliverySetup,
  requestDeviceDeliveries
  // disableDeviceDeliveries
} from '../../api/deliveries';
import { setDeviceInfo } from '../../store/actions/deviceInfo-action';
import { notificationProfiles } from '../../store/actions/profile-actions';

const mapStateToProps = state => ({
  user: state.user,
  deviceInfo: state.deviceInfo,
  notifications: state.notifications
});

const mapDispatchToProps = dispatch => ({
  setupDeviceInfo(payload) {
    dispatch(setDeviceInfo(payload));
  },
  setNotificationProfiles(payload) {
    dispatch(notificationProfiles(payload));
  }
});

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationDeliveries: [],
      loading: false,
      notificationsEnabled: false
    };
    this.handleGoBack = this.handleGoBack.bind(this);
    this.setupDelivery = this.setupDelivery.bind(this);
    this.showDebugInfo = this.showDebugInfo.bind(this);
    this.disableDelivery = this.disableDelivery.bind(this);
    this.handleNotificationSwitch = this.handleNotificationSwitch.bind(this);
  }

  componentDidMount() {
    const { deviceInfo } = this.props;
    if (!deviceInfo.deviceId) {
      PushNotification.unregister();
    }
    // if (!isEmpty(deviceInfo)) {
    this.getDelivery();
    // }
    PushNotification.configure({
      onRegister: token => {
        const { setupDeviceInfo } = this.props;
        setupDeviceInfo({ deviceId: token.token, systemName: token.os });
      }
    });
    Heap.track('viewed-notifications-screen', {});
  }

  componentDidUpdate(nextProps) {
    const { deviceInfo, notifications } = this.props;
    if (
      !isEqual(deviceInfo, nextProps.deviceInfo) ||
      !isEqual(notifications, nextProps.notifications)
    ) {
      this.getDelivery();
    }
  }

  getDelivery() {
    const {
      deviceInfo: { deviceId, systemName },
      setNotificationProfiles
    } = this.props;

    this.setState({ loading: true });

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
              console.log(response);
              this.setState({
                notificationDeliveries: response.data,
                loading: false
              });
              if (response.data && response.data.profiles) {
                this.setState({ notificationsEnabled: response.data.active });
                setNotificationProfiles(response.data.profiles);
              }
            })
            .catch(error => {
              console.log('notification error', error);
              this.setState({ loading: false });
            });
        }
      })
      .catch(error => {
        console.log('no user', error);
        this.setState({ loading: false });
      });
  }

  setupDelivery() {
    const {
      deviceInfo: { deviceId, systemName },
      notifications
    } = this.props;

    this.setState({ loading: true });

    Keychain.getInternetCredentials('Retriever')
      .then(credentials => {
        if (credentials.password) {
          requestDeliverySetup({
            os: systemName,
            deviceToken: deviceId,
            profiles: notifications,
            active: true,
            username: credentials.username,
            password: credentials.password
          })
            .then(response => {
              console.log(response);
              this.setState({
                notificationDeliveries: response.data,
                loading: false,
                notificationsEnabled: response.data.active
              });
              this.sendLocalNotification();
              this.getDelivery();
            })
            .catch(error => {
              console.log('notification error', error);
              this.setState({ loading: false });
            });
        }
      })
      .catch(error => {
        console.log('no user', error);
        this.setState({ loading: false });
      });
  }

  disableDelivery() {
    const {
      deviceInfo: { deviceId, systemName },
      setNotificationProfiles
    } = this.props;
    this.setState({ loading: true });
    Keychain.getInternetCredentials('Retriever')
      .then(credentials => {
        if (credentials.password) {
          requestDeliverySetup({
            os: systemName,
            deviceToken: deviceId,
            profiles: [],
            active: false,
            username: credentials.username,
            password: credentials.password
          })
            .then(response => {
              console.log(response);
              this.setState({
                notificationDeliveries: response.data,
                notificationsEnabled: response.data.active,
                loading: false
              });
              setNotificationProfiles([]);
              this.sendLocalNotification();
              this.getDelivery();
            })
            .catch(error => {
              console.log('notification error', error);
              this.setState({ loading: false });
            });
        }
      })
      .catch(error => {
        console.log('no user', error);
        this.setState({ loading: false });
      });
  }

  sendLocalNotification() {
    const { notifications } = this.props;
    PushNotification.checkPermissions(res => {
      if (res.alert || res.badge || res.sound) {
        Alert.alert(
          'Retriever Settings',
          `Notifications enabled for ${notifications.length} profiles`
        );
        // PushNotification.localNotification({
        //   title: 'Retriever Settings',
        //   message: `Notifications enabled for ${notifications.length} profiles`
        // });
      } else {
        Alert.alert(
          'Retriever Settings',
          `Notifications are disabled. Go to your phones settings to update.`
        );
      }
    });
  }

  showDebugInfo() {
    const { notifications } = this.props;
    const { notificationDeliveries } = this.state;
    Alert.alert(
      JSON.stringify(notifications),
      JSON.stringify(notificationDeliveries)
    );
  }

  handleNotificationSwitch(newSwitchState) {
    this.setState({ notificationsEnabled: newSwitchState });
    if (newSwitchState === true) {
      this.setupDelivery();
    } else {
      this.disableDelivery();
    }
  }

  handleGoBack() {
    const { navigation } = this.props;
    navigation.goBack(null);
  }

  render() {
    const { notificationsEnabled, loading } = this.state;
    const { notifications } = this.props;
    const theme = ThemeContext._currentValue;

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme === 'light' ? '#fff' : '#000'
        }}
      >
        <Header
          title="NOTIFICATIONS"
          goBackNow={this.handleGoBack}
          showBackIcon
          theme={theme}
        />
        <View style={{ padding: 20 }}>
          <Text style={{ color: theme === 'light' ? '#111' : '#ddd' }}>
            To enable notifications, visit the Profiles tab and select the Bell
            icon by each profile you want notifications enabled
          </Text>
        </View>
        {notifications.length > 0 && (
          <View
            style={{
              padding: 20,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ color: theme === 'light' ? '#111' : '#ddd' }}>
              Receive notifications for {notifications.length || 0} profiles
            </Text>
            {loading && (
              <ActivityIndicator
                size="small"
                color={theme === 'light' ? '#111' : '#ddd'}
              />
            )}
            <Switch
              onValueChange={this.handleNotificationSwitch}
              value={notificationsEnabled}
            />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

Notifications.contextType = ThemeContext;

Notifications.propTypes = {
  navigation: shape({
    goBack: func.isRequired
  }).isRequired,
  deviceInfo: shape({
    deviceId: string,
    systemName: string
  }).isRequired,
  setupDeviceInfo: func.isRequired,
  notifications: arrayOf(number).isRequired,
  setNotificationProfiles: func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
