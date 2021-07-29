/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { oneOf, object, func, bool } from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ToggleIcon from '../ToggleIcon/ToggleIcon';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: '#111',
    fontFamily: 'Roboto-Bold'
  }
});

const ProfileListItem = ({
  profile,
  onPressProfileItem,
  isEmailUser,
  onPressProfileFavoriteToggle,
  onPressProfileNotificationToggle,
  theme
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => onPressProfileItem(profile)}
  >
    <View style={styles.leftContent}>
      {isEmailUser && (
        <React.Fragment>
          <ToggleIcon
            onPressToggleIcon={() => onPressProfileFavoriteToggle(profile)}
            active={profile.isFavorite || false}
            activeIconName="star"
            inactiveIconName="star-outline"
          />
        </React.Fragment>
      )}
      <ToggleIcon
        onPressToggleIcon={() => onPressProfileNotificationToggle(profile)}
        active={profile.isNotification || false}
        activeIconName="bell"
        inactiveIconName="bell-outline"
      />
      <Text
        style={[styles.title, { color: theme === 'light' ? '#111' : '#ddd' }]}
      >
        {profile.name}
      </Text>
    </View>

    <MaterialCommunityIcons
      name="chevron-right"
      size={30}
      color={theme === 'light' ? '#333' : '#ddd'}
    />
  </TouchableOpacity>
);

ProfileListItem.defaultProps = {
  isEmailUser: false
};

ProfileListItem.propTypes = {
  onPressProfileItem: func.isRequired,
  onPressProfileFavoriteToggle: func.isRequired,
  onPressProfileNotificationToggle: func.isRequired,
  profile: object.isRequired,
  isEmailUser: bool,
  theme: oneOf(['light', 'dark']).isRequired
};

export default ProfileListItem;
