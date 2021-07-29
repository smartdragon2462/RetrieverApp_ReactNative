import React, { Component } from 'react';
import { View } from 'react-native';
import { func, shape } from 'prop-types';

class BaseAuth extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    navigation.navigate('login');
  }

  render() {
    return <View />;
  }
}

BaseAuth.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};

export default BaseAuth;
