import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { shape, func } from 'prop-types';

class NotificationContent extends React.PureComponent {
  render() {
    const { navigation } = this.props;
    // const docId = navigation.getParam('docId', '');
    // const profiles = navigation.getParam('profiles', '');
    const notification = navigation.getParam('notification', '');
    return (
      <SafeAreaView
        style={{
          flex: 1
        }}
      >
        {/* <Text>docId: {docId}</Text>
        <Text>profiles: {profiles}</Text> */}
        <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12 }}>
          {JSON.stringify(notification)}
        </Text>
      </SafeAreaView>
    );
  }
}

NotificationContent.propTypes = {
  navigation: shape({
    getParam: func.isRequired
  }).isRequired
};

export default NotificationContent;
