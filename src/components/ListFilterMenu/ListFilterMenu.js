import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { string, func, oneOf } from 'prop-types';

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  searchInput: {
    padding: 10,
    fontSize: 20,
    height: 40,
    borderRadius: 4
  }
});

const ListFilterMenu = ({ searchTerm, handleChangeSearchTerm, theme }) => (
  <View
    style={[
      styles.container,
      { backgroundColor: theme === 'light' ? '#ddd' : '#333' }
    ]}
  >
    <TextInput
      placeholder="Filter Profiles..."
      type="search"
      clearButtonMode="always"
      selectTextOnFocus
      returnKeyType="search"
      autoCapitalize="none"
      autoCompleteType="off"
      placeholderTextColor="#666"
      value={searchTerm}
      onChangeText={handleChangeSearchTerm}
      style={[
        styles.searchInput,
        {
          backgroundColor: theme === 'light' ? '#fff' : '#111',
          color: theme === 'light' ? '#111' : '#fff'
        }
      ]}
    />
  </View>
);

ListFilterMenu.defaultProps = {
  searchTerm: ''
};

ListFilterMenu.propTypes = {
  searchTerm: string,
  handleChangeSearchTerm: func.isRequired,
  theme: oneOf(['light', 'dark']).isRequired
};

export default ListFilterMenu;
