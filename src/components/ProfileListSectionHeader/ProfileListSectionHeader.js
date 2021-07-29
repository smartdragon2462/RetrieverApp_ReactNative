/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { oneOf, bool, object } from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.2,
    borderBottomColor: '#999',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    paddingRight: 10
  },
  title: {
    fontSize: 30,
    color: '#111',
    fontFamily: 'Roboto-Black',
    flexWrap: 'wrap'
  }
});

const ProfileListSectionHeader = ({ profileGroup, showChevron, theme }) => {
  return (
    <SafeAreaView>
      <View
        style={[
          styles.container,
          { backgroundColor: theme === 'light' ? '#fff' : '#000' }
        ]}
      >
        <Text
          style={[styles.title, { color: theme === 'light' ? '#333' : '#ddd' }]}
          numberOfLines={1}
        >
          {profileGroup.title}
        </Text>
        {showChevron && (
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color={theme === 'light' ? '#333' : '#ddd'}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

ProfileListSectionHeader.defaultProps = {
  showChevron: false
};

ProfileListSectionHeader.propTypes = {
  profileGroup: object.isRequired,
  showChevron: bool,
  theme: oneOf(['light', 'dark']).isRequired
};

export default ProfileListSectionHeader;
