import React from 'react';
import { View, StyleSheet } from 'react-native';
import { func, bool, shape } from 'prop-types';
import ToggleIcon from '../ToggleIcon/ToggleIcon';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actionContainer: {
    width: 100,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  singleAction: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  singleActionTitle: {
    color: '#ff9f53',
    textAlign: 'center'
  }
});

const ProfileListItemHiddenActions = ({
  onPressProfileFavoriteToggle,
  onPressProfileNotificationToggle,
  profile,
  isEmailUser
}) => (
  <View style={styles.container}>
    <View style={styles.actionContainer}>
      {isEmailUser && (
        <View style={styles.singleAction}>
          <ToggleIcon
            // eslint-disable-next-line react/jsx-no-bind
            onPressToggleIcon={() => onPressProfileFavoriteToggle(profile)}
            active={profile.isFavorite || false}
            activeIconName="star"
            inactiveIconName="star-outline"
          />
        </View>
      )}
      <View style={styles.singleAction}>
        <ToggleIcon
          // eslint-disable-next-line react/jsx-no-bind
          onPressToggleIcon={() => onPressProfileNotificationToggle(profile)}
          active={profile.isNotification || false}
          activeIconName="bell"
          inactiveIconName="bell-outline"
        />
      </View>
    </View>
  </View>
);

ProfileListItemHiddenActions.propTypes = {
  onPressProfileFavoriteToggle: func.isRequired,
  onPressProfileNotificationToggle: func.isRequired,
  profile: shape({
    isFavorite: bool.isRequired,
    isNotification: bool.isRequired
  }).isRequired,
  isEmailUser: bool.isRequired
};
export default ProfileListItemHiddenActions;
