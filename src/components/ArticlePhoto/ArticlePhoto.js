import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { string } from 'prop-types';

const styles = StyleSheet.create({
  container: {
    // margin: 10,
    // borderRadius: 10,
    overflow: 'hidden'
  },
  photo: {
    height: 260,
    width: '100%',
    resizeMode: 'cover'
  }
});
const ArticlePhoto = ({ photoUrl }) => (
  <View style={styles.container}>
    <Image style={styles.photo} source={{ uri: photoUrl }} />
  </View>
);

ArticlePhoto.propTypes = {
  photoUrl: string.isRequired
};

export default ArticlePhoto;
