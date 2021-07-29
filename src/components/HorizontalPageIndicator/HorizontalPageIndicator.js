import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { object, array } from 'prop-types';

const styles = StyleSheet.create({
  dotContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    bottom: 80,
    zIndex: 1000,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: '#595959',
    margin: 8,
    borderRadius: 5
  }
});

const HorizontalScrollIndicator = ({ position, pages }) => (
  <View style={styles.dotContainer}>
    {pages.map((_, index) => {
      const opacity = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0.3, 1, 0.3],
        extrapolate: 'clamp'
      });
      return (
        <Animated.View
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          style={{
            height: 4,
            width: 60,
            backgroundColor: '#595959',
            margin: 8,
            // borderRadius: 5,
            opacity
          }}
        />
      );
    })}
  </View>
);

HorizontalScrollIndicator.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  position: object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pages: array.isRequired
};

export default HorizontalScrollIndicator;
