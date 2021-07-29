import React from 'react';
import { StyleSheet } from 'react-native';
import { string, oneOf } from 'prop-types';
import HTML from 'react-native-render-html';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold'
  }
});

const hitWordsStyle = {
  'retriever-hit': {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#b4d494',
    color: '#111',
    borderRadius: 2,
    padding: 8,
    backgroundColor: '#e2edd5'
  }
};

const ArticleTitle = ({ title, theme }) => (
  <HTML
    html={title}
    baseFontStyle={{
      ...styles.title,
      ...{ color: theme === 'light' ? '#111' : '#ddd' }
    }}
    classesStyles={hitWordsStyle}
  />
);

ArticleTitle.propTypes = {
  title: string.isRequired,
  theme: oneOf(['light', 'dark']).isRequired
};

export default ArticleTitle;
