import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingBottom: 15
  },
  title: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginBottom: 4,
    color: '#fff'
  },
  required: {
    color: 'red'
  },
  input: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    borderRadius: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff'
  },
  inputSearch: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    borderRadius: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
    color: '#111'
  }
});

const Input = ({ title, type, required, ...props }) => (
  <View style={styles.wrapper}>
    {title && (
      <Text style={styles.title}>
        {title}
        {required && <Text style={styles.required}>*</Text>}
      </Text>
    )}
    {type === 'search' ? (
      <TextInput
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        placeholderTextColor="#666"
        selectionColor="#111"
        style={styles.inputSearch}
      />
    ) : (
      <TextInput
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        placeholderTextColor="#bbb"
        selectionColor="#fff"
        style={styles.input}
      />
    )}
  </View>
);

Input.defaultProps = {
  required: false,
  titleColor: 'white',
  title: null,
  type: ''
};

Input.propTypes = {
  title: PropTypes.string,
  titleColor: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool
};

export default Input;
