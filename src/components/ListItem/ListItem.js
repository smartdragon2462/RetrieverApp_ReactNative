/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { string, func } from 'prop-types';
import Feather from 'react-native-vector-icons/Feather';

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
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14
  },
  icon: {
    paddingLeft: 15,
    paddingRight: 15
  }
});

const ListItem = ({ leftIconName, title, color, handleOnPress }) => (
  <TouchableOpacity style={styles.container} onPress={() => handleOnPress()}>
    <View style={styles.icon}>
      <Feather name={leftIconName} size={30} color={color} />
    </View>
    <View>
      <Text style={[styles.title, { color }]}>{title}</Text>
    </View>
  </TouchableOpacity>
);

ListItem.propTypes = {
  leftIconName: string.isRequired,
  title: string.isRequired,
  color: string.isRequired,
  handleOnPress: func.isRequired
};
export default ListItem;
