import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { func, shape, number } from 'prop-types';

const styles = StyleSheet.create({
  container: {
    height: 20,
    display: 'flex',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  text: {
    display: 'flex',
    color: '#111',
    fontSize: 12,
    fontFamily: 'Roboto-RegularItalic',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  }
});

const ArticleWebViewActionBar = ({ goToTop, dimensions }) => (
  <TouchableOpacity
    style={[styles.container, { width: dimensions.width }]}
    onPress={goToTop}
  >
    <Text style={styles.text}>Go Up To Text</Text>
  </TouchableOpacity>
);

ArticleWebViewActionBar.propTypes = {
  goToTop: func.isRequired,
  dimensions: shape({ height: number, width: number }).isRequired
};

export default ArticleWebViewActionBar;
