import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { string } from 'prop-types';

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 6,
    paddingRight: 6,
    backgroundColor: '#deebf2',
    borderWidth: 1,
    borderColor: '#9cc4d8',
    borderRadius: 10
  },
  text: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'Roboto-Regular'
  }
});

const Chip = ({ text }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

Chip.propTypes = {
  text: string.isRequired
};

export default Chip;
