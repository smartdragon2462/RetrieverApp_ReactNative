import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { string, oneOf } from 'prop-types';
import Feather from 'react-native-vector-icons/Feather';
import UserShape from '../../prop-types/user-prop-types';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderBottomWidth: 0.2,
    borderBottomColor: '#999'
  },
  icon: {
    padding: 10
  },
  username: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    flexWrap: 'wrap',
    maxWidth: deviceWidth * 0.9
  },
  subTitle: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Roboto-Regular',
    flexWrap: 'wrap',
    maxWidth: deviceWidth * 0.9
  }
});

const UserListItem = ({
  user,
  appVersion,
  theme,
  systemName,
  systemVersion
}) => (
  <View style={styles.container}>
    <View style={styles.icon}>
      <Feather
        name="user"
        size={40}
        color={theme === 'light' ? '#333' : '#ddd'}
      />
    </View>
    <View>
      <Text
        style={[
          styles.username,
          { color: theme === 'light' ? '#333' : '#ddd' }
        ]}
      >
        {user.userName}
      </Text>
      {user.emailLogin && (
        <Text style={styles.subTitle}>{user.emailLogin.email}</Text>
      )}
      <Text style={styles.subTitle}>{user.accountname}</Text>
      <Text style={styles.subTitle}>
        device: {systemName}/{systemVersion}
      </Text>
      <Text style={styles.subTitle}>app: {appVersion}</Text>
    </View>
  </View>
);

UserListItem.propTypes = {
  user: UserShape.isRequired,
  appVersion: string.isRequired,
  systemVersion: string.isRequired,
  systemName: string.isRequired,
  theme: oneOf(['light', 'dark']).isRequired
};

export default UserListItem;
