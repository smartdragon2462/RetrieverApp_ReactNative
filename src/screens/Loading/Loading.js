import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import { connect } from 'react-redux';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import UserShape from '../../prop-types/user-prop-types';

const mapStateToProps = state => ({
  user: state.user
});
class Loading extends Component {
  componentDidMount() {
    const { navigation, user } = this.props;
    navigation.navigate(user.userName ? 'main' : 'auth');
  }

  render() {
    return (
      <View>
        <ActivityIndicator size="large" color="#111" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

Loading.propTypes = {
  user: UserShape.isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};

export default connect(mapStateToProps)(Loading);
