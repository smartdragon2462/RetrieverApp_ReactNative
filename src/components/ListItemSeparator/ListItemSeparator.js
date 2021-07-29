import React from 'react';
import { StyleSheet, View } from 'react-native';
import { oneOf } from 'prop-types';

const styles = StyleSheet.create({
  separator: {
    height: 0.5,
    width: '100%',
    alignSelf: 'center'
  }
});

const ListItemSeparator = ({ theme }) => (
  <View
    style={[
      styles.separator,
      { backgroundColor: theme === 'light' ? '#999' : '#666' }
    ]}
  />
);

ListItemSeparator.propTypes = {
  theme: oneOf(['light', 'dark']).isRequired
};

export default ListItemSeparator;
