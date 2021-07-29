/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Chip from '../Chip/Chip';
import { articleShape } from '../../prop-types/article-prop-types';

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap' },
  chipWrapper: {
    padding: 4
  }
});

const ArticleEntitiesList = ({ article }) => {
  const entityList = article.entities.map((entity, index) => (
    <View key={index} style={styles.chipWrapper}>
      <Chip text={entity.ent_text} />
    </View>
  ));
  return <View style={styles.container}>{entityList}</View>;
};

ArticleEntitiesList.propTypes = {
  article: articleShape.isRequired
};

export default ArticleEntitiesList;
