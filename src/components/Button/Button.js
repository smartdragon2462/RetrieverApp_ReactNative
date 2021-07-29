/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { bool, string, oneOf } from 'prop-types';
import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  normal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 4,
    marginBottom: 10
  },
  text: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular'
  },
  info: {
    color: '#111'
  },
  infoLightText: {
    color: '#fff'
  },
  primary: {
    backgroundColor: 'rgb(135,185,83)'
  },
  infoText: {
    color: '#111'
  },
  primaryText: {
    color: '#fff'
  }
});

const Button = ({ loading, title, type, ...props }) => (
  <TouchableOpacity style={[styles.normal, styles[type]]} {...props}>
    {loading ? (
      <ActivityIndicator
        animating={loading}
        color={styles[`${type}Text`].color}
      />
    ) : (
      <Text style={[styles.text, styles[`${type}Text`]]}>{title}</Text>
    )}
  </TouchableOpacity>
);

Button.defaultProps = {
  loading: false
};

Button.propTypes = {
  loading: bool,
  title: string.isRequired,
  type: oneOf(['info', 'primary', 'infoLight']).isRequired
};

export default Button;
