import React from 'react';
import { View, StyleSheet } from 'react-native';
import { object } from 'prop-types';
import Chip from '../Chip/Chip';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  chipWrapper: {
    padding: 4
  }
});

const ArticleTimeline = ({ timeline }) => {
  const hitList = timeline.hits.map((hit, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <View key={index} style={styles.chipWrapper}>
      <Chip text={`${hit.phrase} ${hit.time}`} />
    </View>
  ));
  return <View style={styles.container}>{hitList}</View>;
};

ArticleTimeline.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  timeline: object.isRequired
};
export default ArticleTimeline;
