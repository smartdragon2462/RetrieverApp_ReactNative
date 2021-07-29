import React from 'react';
import { number } from 'prop-types';
import * as Animatable from 'react-native-animatable';

const AnimatedView = props => {
  const { index, ...rest } = props;
  return (
    <Animatable.View
      animation="fadeInDown"
      duration={500}
      delay={index ? (index * 500) / 5 : 0}
      useNativeDriver
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
};

AnimatedView.propTypes = {
  index: number.isRequired
};

export default AnimatedView;
