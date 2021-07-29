import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Platform
} from 'react-native';
import { bool, string, number } from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    paddingBottom: 20,
    fontFamily: 'Roboto-Regular',
    fontSize: 14
  }
});
const ZeroState = ({ loading, message, deviceHeight, theme }) => (
  <View style={styles.container}>
    {loading ? (
      <View
        style={[styles.loadingContainer, { minHeight: deviceHeight - 100 }]}
      >
        <Text
          style={[
            styles.message,
            { color: theme === 'light' ? '#111' : '#ddd' }
          ]}
        >
          {message}
        </Text>
        {Platform.select({
          ios: (
            <ActivityIndicator
              size="large"
              color={theme === 'light' ? '#111' : '#ddd'}
            />
          ),
          android: <Text>&nbsp;</Text>
        })}
      </View>
    ) : (
      <View
        style={[styles.loadingContainer, { minHeight: deviceHeight - 100 }]}
      >
        <Text
          style={[
            styles.message,
            { color: theme === 'light' ? '#111' : '#ddd' }
          ]}
        >
          {message}
        </Text>
      </View>
    )}
  </View>
);

ZeroState.propTypes = {
  loading: bool.isRequired,
  deviceHeight: number.isRequired,
  message: string.isRequired,
  theme: string.isRequired
};
export default ZeroState;
