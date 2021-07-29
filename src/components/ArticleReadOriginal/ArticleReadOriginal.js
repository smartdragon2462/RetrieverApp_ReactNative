import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { string, oneOf } from 'prop-types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  },
  readOriginal: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    textAlign: 'center'
  },
  sourceName: {
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 20
  },
  arrow: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 20
  }
});

const ArticleReadOriginal = ({ sourceName, theme }) => (
  <View>
    <Text
      style={[
        styles.readOriginal,
        { color: theme === 'light' ? '#111' : '#ddd' }
      ]}
    >
      View Original
    </Text>
    <Text
      style={[
        styles.sourceName,
        { color: theme === 'light' ? '#666' : '#aaa' }
      ]}
    >
      {sourceName}
    </Text>
    <View style={styles.arrow}>
      <SimpleLineIcons
        name="arrow-up"
        size={20}
        color={theme === 'light' ? '#111' : '#ddd'}
      />
    </View>
  </View>
);

ArticleReadOriginal.propTypes = {
  sourceName: string.isRequired,
  theme: oneOf(['light', 'dark']).isRequired
};

export default ArticleReadOriginal;
