import React from 'react';
import { View } from 'react-native';
import { string, number } from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TabBarIcon = ({ name, size, color }) => {
  return (
    <View style={{ paddingTop: 4 }}>
      <MaterialCommunityIcons name={name} size={size} color={color} />
    </View>
  );
};

TabBarIcon.propTypes = {
  name: string.isRequired,
  size: number.isRequired,
  color: string.isRequired
};

export default TabBarIcon;
