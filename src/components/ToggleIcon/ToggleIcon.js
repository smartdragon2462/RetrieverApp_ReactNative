import React from 'react';
import { TouchableOpacity } from 'react-native';
import { func, bool, string } from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ToggleIcon = ({
  onPressToggleIcon,
  active,
  activeIconName,
  inactiveIconName
}) => (
  <TouchableOpacity
    onPress={onPressToggleIcon}
    hitSlop={{ top: 4, left: 4, bottom: 4, right: 4 }}
    style={{ paddingLeft: 0, paddingRight: 4 }}
  >
    {active ? (
      <MaterialCommunityIcons name={activeIconName} size={30} color="#ff9f53" />
    ) : (
      <MaterialCommunityIcons
        name={inactiveIconName}
        size={30}
        color="#797989"
      />
    )}
  </TouchableOpacity>
);

ToggleIcon.propTypes = {
  onPressToggleIcon: func.isRequired,
  active: bool.isRequired,
  activeIconName: string.isRequired,
  inactiveIconName: string.isRequired
};

export default ToggleIcon;
