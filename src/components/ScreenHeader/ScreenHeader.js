import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { string, oneOf } from 'prop-types';

const darkLogo = require('../../../assets/retriever_dark.png');
const lightLogo = require('../../../assets/retriever_white.png');

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    paddingRight: 10,
    height: 50,
    resizeMode: 'contain',
    width: 150
  },
  title: {
    fontSize: 20,
    color: '#111',
    fontFamily: 'Roboto-Black',
    flexWrap: 'wrap'
  },
  subTitle: {
    fontSize: 18,
    color: '#999',
    fontFamily: 'Roboto-Regular',
    flexWrap: 'wrap'
  }
});

const ScreenHeader = ({ titleTop, titleBottom, theme }) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === 'light' ? '#fff' : '#000' }
      ]}
    >
      <View>
        <Image
          style={styles.logo}
          // eslint-disable-next-line global-require
          source={theme === 'light' ? darkLogo : lightLogo}
        />
      </View>
      <View>
        <Text
          style={[
            styles.subTitle,
            { color: theme === 'light' ? '#999' : '#999' }
          ]}
        >
          {titleTop}
        </Text>
        <Text
          style={[styles.title, { color: theme === 'light' ? '#111' : '#ddd' }]}
        >
          {titleBottom}
        </Text>
      </View>
    </View>
  );
};

ScreenHeader.propTypes = {
  titleTop: string.isRequired,
  titleBottom: string.isRequired,
  theme: oneOf(['light', 'dark']).isRequired
};
export default ScreenHeader;
