import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { string } from 'prop-types';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 300,
    height: 50,
    margin: 10,
    resizeMode: 'contain'
  }
});
const ArticleSourceLogo = ({ logo }) => (
  <View style={styles.container}>
    {logo && (
      <Image
        source={{ uri: logo }}
        style={styles.image}
        resizeMode="contain"
        resizeMethod="resize"
      />
    )}
  </View>
);

ArticleSourceLogo.propTypes = {
  logo: string.isRequired
};

export default ArticleSourceLogo;
