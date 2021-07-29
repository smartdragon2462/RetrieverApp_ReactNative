import React from 'react';
import { StyleSheet } from 'react-native';
import { string } from 'prop-types';
import HTML from 'react-native-render-html';

const styles = StyleSheet.create({
  copyright: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Roboto-Regular'
  }
});

const ArticleCopyright = ({ copyright }) => (
  <HTML html={copyright} baseFontStyle={styles.copyright} />
);

ArticleCopyright.propTypes = {
  copyright: string.isRequired
};

export default ArticleCopyright;
