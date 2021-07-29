import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { oneOf } from 'prop-types';
import Moment from 'moment';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { articleShape } from '../../prop-types/article-prop-types';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  icon: {
    paddingRight: 3
  },
  text: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Roboto-Regular'
  },
  divider: {
    color: '#666',
    paddingLeft: 6,
    paddingRight: 6
  }
});

const ArticleMetadata = ({ article, theme }) => (
  <View style={styles.container}>
    <View style={styles.icon}>
      {article.mediatype === 'web' && (
        <SimpleLineIcons
          name="globe"
          size={16}
          color={theme === 'light' ? '#333' : '#ddd'}
        />
      )}
      {article.mediatype === 'print' && (
        <SimpleLineIcons
          name="doc"
          size={16}
          color={theme === 'light' ? '#333' : '#ddd'}
        />
      )}
      {article.mediatype === 'video' && (
        <FeatherIcons
          name="tv"
          size={16}
          color={theme === 'light' ? '#333' : '#ddd'}
        />
      )}
      {article.mediatype === 'audio' && (
        <MaterialCommunityIcons
          name="radio"
          size={16}
          color={theme === 'light' ? '#333' : '#ddd'}
        />
      )}
    </View>

    <Text style={[styles.text, { color: theme === 'light' ? '#666' : '#ddd' }]}>
      {article.source.name}
    </Text>
    <Text
      style={[styles.divider, { color: theme === 'light' ? '#666' : '#ddd' }]}
    >
      |
    </Text>
    <Text style={[styles.text, { color: theme === 'light' ? '#666' : '#ddd' }]}>
      {Moment(article.docDate).format('lll')}
    </Text>
    <Text
      style={[styles.divider, { color: theme === 'light' ? '#666' : '#ddd' }]}
    >
      |
    </Text>

    <Text style={[styles.text, { color: theme === 'light' ? '#666' : '#ddd' }]}>
      {article.wordCount} words
    </Text>
  </View>
);

ArticleMetadata.propTypes = {
  article: articleShape.isRequired,
  theme: oneOf(['light', 'dark']).isRequired
};

export default ArticleMetadata;
