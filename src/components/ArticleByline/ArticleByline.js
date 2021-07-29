import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { string, oneOf } from 'prop-types';

const styles = StyleSheet.create({
  byline: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular'
  }
});

const ArticleByline = ({ byline, theme }) => (
  <Text style={[styles.byline, { color: theme === 'light' ? '#666' : '#aaa' }]}>
    Author: {byline}
  </Text>
);

ArticleByline.propTypes = {
  byline: string.isRequired,
  theme: oneOf(['light ', 'dark']).isRequired
};

export default ArticleByline;
