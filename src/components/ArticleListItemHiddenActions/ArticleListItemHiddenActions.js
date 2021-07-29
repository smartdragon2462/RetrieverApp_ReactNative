import React from 'react';
import { View, StyleSheet } from 'react-native';
import { func } from 'prop-types';
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
    width: 160,
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

const ArticleListItemHiddenActions = ({ onPressRightAction }) => (
  <View style={styles.container}>
    <View style={styles.actionContainer}>
      {/* <ToggleIcon
        // eslint-disable-next-line react/jsx-no-bind
        onPressToggleIcon={() => onPressLeftAction('star pressed')}
        active
        activeIconName="star"
        inactiveIconName="star-outline"
      />
      <ToggleIcon
        // eslint-disable-next-line react/jsx-no-bind
        onPressToggleIcon={() => onPressLeftAction('heart pressed')}
        active
        activeIconName="heart"
        inactiveIconName="heart-outline"
      /> */}
    </View>
    <View style={styles.actionContainer}>
      <View style={styles.singleAction}>
        <ToggleIcon
          // eslint-disable-next-line react/jsx-no-bind
          onPressToggleIcon={() => onPressRightAction('open')}
          active
          activeIconName="open-in-new"
          inactiveIconName="open-in-new"
        />
        {/* <Text style={styles.singleActionTitle}>BROWSER</Text> */}
      </View>
      <View style={styles.singleAction}>
        <ToggleIcon
          // eslint-disable-next-line react/jsx-no-bind
          onPressToggleIcon={() => onPressRightAction('share')}
          active
          activeIconName="share"
          inactiveIconName="share-outline"
        />

        {/* <Text style={styles.singleActionTitle}>SHARE</Text> */}
      </View>
    </View>
  </View>
);

ArticleListItemHiddenActions.propTypes = {
  onPressRightAction: func.isRequired
};
export default ArticleListItemHiddenActions;
