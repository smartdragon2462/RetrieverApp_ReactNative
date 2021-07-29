/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  Linking,
  KeyboardAvoidingView,
  View,
  Alert,
  Dimensions,
  Animated,
  StyleSheet,
  StatusBar,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { ThemeContext } from 'react-navigation';
import Video from 'react-native-video';
import { func, shape } from 'prop-types';
import Heap from '@heap/react-native-heap';
import * as Keychain from 'react-native-keychain';
import Button from '../../components/Button/Button.js';
import Input from '../../components/Input/Input';
import { setUser } from '../../store/actions/user-action';
import { loginUserWithPassword } from '../../api/auth.js';

const LoginVideo = require('../../../assets/login-video.mp4');

const styles = StyleSheet.create({
  container: {},
  logo: {
    width: 300
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  formInputs: {
    width: 300
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  buttonsGroup: {
    paddingTop: 20
  }
});

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  updateUser(user) {
    dispatch(setUser(user));
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    const { height, width } = Dimensions.get('window');
    this.state = {
      isLoading: false,
      fadeVideoAnimation: new Animated.Value(0),
      fadeFormAnimation: new Animated.Value(0),
      dimensions: { height, width }
    };
    this.onVideoFileLoaded = this.onVideoFileLoaded.bind(this);
  }

  componentDidMount() {
    Heap.track('viewed-login-screen', {});
    Dimensions.addEventListener('change', () => {
      const { height, width } = Dimensions.get('window');
      this.setState({
        dimensions: { height, width }
      });
    });
    Keychain.getInternetCredentials('Retriever')
      .then(credentials => {
        if (credentials.password) {
          this.loginUser(credentials.username, credentials.password);
        }
      })
      .catch(error => console.log('no user', error));
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  onPressLogin = () => {
    const { email, password } = this.state;
    if (email && password) {
      this.loginUser(email, password);
    }
  };

  onPressRegister = () => {
    const { navigation } = this.props;
    const { navigate } = navigation;
    navigation.popToTop();
    navigate('register');
  };

  onChangeEmail = value => {
    this.setState({ email: value });
  };

  onChangePassword = value => {
    this.setState({ password: value });
  };

  onVideoFileLoaded() {
    const { fadeVideoAnimation, fadeFormAnimation } = this.state;
    Animated.timing(fadeVideoAnimation, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true
    }).start();
    Animated.timing(fadeFormAnimation, {
      toValue: 1,
      duration: 500,
      delay: 5000,
      useNativeDriver: true
    }).start();
  }

  loginUser(email, password) {
    const { updateUser, navigation } = this.props;
    this.setState({ isLoading: true });
    loginUserWithPassword(email, password)
      .then(response => {
        Keychain.setInternetCredentials('Retriever', email, password);
        this.setState({ isLoading: false });
        if (response.data.userName) {
          updateUser(response.data);
          navigation.navigate('main');
        } else {
          this.setState({ isLoading: false });
          console.log('error');
          const notificationMessage = 'Something went wrong';
          Alert.alert('Houston, we have a problem.', notificationMessage);
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
        console.log('error');
        const notificationMessage = 'Something went wrong';
        Alert.alert('Houston, we have a problem.', notificationMessage);
      });
  }

  render() {
    const {
      email,
      password,
      isLoading,
      fadeVideoAnimation,
      fadeFormAnimation,
      dimensions
    } = this.state;
    const theme = ThemeContext._currentValue;
    return (
      <KeyboardAvoidingView
        style={{
          ...styles.container,
          height: dimensions.height,
          width: dimensions.width,
          backgroundColor: theme === 'light' ? '#fff' : '#000'
        }}
        keyboardVerticalOffset={-200}
        behavior="position"
      >
        <StatusBar hidden />
        <Animated.View style={{ opacity: fadeVideoAnimation }}>
          <Video
            source={LoginVideo}
            style={{
              ...styles.backgroundVideo,
              height: dimensions.height,
              width: dimensions.width
            }}
            rate={1}
            volume={1}
            onLoadStart={this.onVideoFileLoaded}
            muted
            allowsExternalPlayback={false}
            pictureInPicture={false}
            playInBackground={false}
            playWhenInactive={false}
            resizeMode="cover"
            repeat
          />
        </Animated.View>

        <Animated.View
          style={{
            ...styles.form,
            opacity: fadeFormAnimation,
            height: dimensions.height
          }}
        >
          <View>
            <Image
              style={styles.logo}
              resizeMode="contain"
              // eslint-disable-next-line global-require
              source={require('../../../assets/retriever_white.png')}
            />
          </View>
          <View style={styles.formInputs}>
            <Input
              title="Email or Username"
              required
              placeholder="Email or Username"
              keyboardType="email-address"
              autoComplete="email"
              returnKeyType="next"
              value={email}
              onChangeText={this.onChangeEmail}
            />
            <Input
              title="Password"
              required
              placeholder="Password"
              autoComplete="password"
              returnKeyType="send"
              secureTextEntry
              value={password}
              onChangeText={this.onChangePassword}
              onSubmitEditing={this.onPressLogin}
            />
            <View style={styles.buttonsGroup}>
              <Button
                loading={isLoading}
                title="LOG IN"
                accessibilityLabel="LOG IN"
                type="primary"
                onPress={this.onPressLogin}
              />
            </View>
            <View style={styles.buttonsGroup}>
              <Button
                title="FORGOT PASSWORD"
                accessibilityLabel="FORGOT PASSWORD"
                type="infoLight"
                // eslint-disable-next-line react/jsx-no-bind
                onPress={() =>
                  Linking.openURL(
                    'https://app.retriever-info.com/forgot-password'
                  )
                }
              />
              <Button
                title="GO TO WEB PORTAL"
                accessibilityLabel="GO TO WEB PORTAL"
                type="infoLight"
                // eslint-disable-next-line react/jsx-no-bind
                onPress={() =>
                  Linking.openURL('https://app.retriever-info.com/login')
                }
              />
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    );
  }
}

Login.contextType = ThemeContext;

Login.propTypes = {
  updateUser: func.isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
