import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { func, oneOf } from 'prop-types';
import ArticleMetadata from '../ArticleMetadata/ArticleMetadata';
import ArticleTitle from '../ArticleTitle/ArticleTitle';
import { articleShape } from '../../prop-types/article-prop-types';

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10
  },
  mediumContainer: {
    // backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10
  },
  textContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'column',
    alignItems: 'stretch',
    alignContent: 'space-between',
    justifyContent: 'space-between'
  }
});

const ArticleListItem = ({ item, onPressItem, theme }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      // eslint-disable-next-line react/jsx-no-bind
      onPress={() => onPressItem(item.item)}
      activeOpacity={1}
    >
      <View style={styles.textContainer}>
        <ArticleTitle title={item.item.headline} theme={theme} />
        <ArticleMetadata article={item.item} theme={theme} />
      </View>
    </TouchableOpacity>
  );
};

ArticleListItem.propTypes = {
  item: articleShape.isRequired,
  onPressItem: func.isRequired,
  theme: oneOf(['light', 'dark']).isRequired
};

export default ArticleListItem;
