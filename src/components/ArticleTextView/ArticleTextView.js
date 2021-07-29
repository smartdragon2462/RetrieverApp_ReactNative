import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { bool, number, func, shape, oneOf } from 'prop-types';
import HTML from 'react-native-render-html';
import ArticleMetadata from '../ArticleMetadata/ArticleMetadata';
import ArticleTitle from '../ArticleTitle/ArticleTitle';
import { articleShape } from '../../prop-types/article-prop-types';
import ArticleCopyright from '../ArticleCopyright/ArticleCopyright';
import ArticleByline from '../ArticleByline/ArticleByline';
import ArticleEntitiesList from '../ArticleEntitiesList/ArticleEntitiesList';
import ArticleReadOriginal from '../ArticleReadOriginal/ArticleReadOriginal';
import ArticleSourceLogo from '../ArticleSourceLogo/ArticleSourceLogo';
import ArticleTimeline from '../ArticleTimeline/ArticleTimeline';
// import ArticlePhoto from '../ArticlePhoto/ArticlePhoto';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100
  },
  text: {
    padding: 10
  },
  metadata: {
    paddingTop: 10,
    paddingBottom: 10
  },
  entities: {
    paddingTop: 6,
    paddingBottom: 6
  },
  byline: {
    paddingTop: 10,
    paddingBottom: 10
  },
  intro: {
    paddingTop: 10,
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    paddingBottom: 10
  },
  story: {
    paddingTop: 10,
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    paddingBottom: 10
  },
  readOriginal: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 50
  }
});

const pStyle = {
  p: {
    paddingBottom: 15
  }
};

const hitWordsStyle = {
  'retriever-hit': {
    borderWidth: 1,
    fontFamily: 'Roboto-Bold',
    borderStyle: 'solid',
    borderColor: '#b4d494',
    color: '#111',
    borderRadius: 2,
    padding: 8,
    backgroundColor: '#e2edd5'
  }
};
const ArticleTextView = ({
  article,
  loading,
  dimensions,
  viewOriginal,
  headerHeight,
  canViewOriginal,
  theme
}) => {
  const openLink = linkUrl => {
    Linking.openURL(linkUrl).catch(err =>
      console.error('An error occurred', err)
    );
  };

  return (
    <ScrollView
      nestedScrollEnabled
      style={{
        width: dimensions.width,
        height: dimensions.height - headerHeight
      }}
    >
      <View
        style={{
          ...styles.container,
          minHeight: dimensions.height - headerHeight
        }}
      >
        {/* {article.urls &&
          article.urls.preview &&
          article.displayRules.showPhoto && (
            <View>
              <ArticlePhoto photoUrl={article.urls.preview} />
            </View>
          )} */}
        {article.displayRules && article.displayRules.brandLexisNexis && (
          <TouchableOpacity
            // eslint-disable-next-line react/jsx-no-bind
            onPress={() => openLink('https://www.lexisnexis.com/')}
          >
            <ArticleSourceLogo logo="https://web.retriever-info.com/static/gfx/3rdParty/LexisNexis/logo_small.png" />
          </TouchableOpacity>
        )}
        {/* {article.displayRules &&
        !article.displayRules.brandLexisNexis &&
        article.source.logo && (
          <ArticleSourceLogo
            logo={`https://web.retriever-info.com${article.source.logo}`}
          />
        )} */}

        <View style={styles.text}>
          {article.headline && (
            <ArticleTitle title={article.headline} theme={theme} />
          )}
          {article.mediatype && (
            <View style={styles.metadata}>
              <ArticleMetadata article={article} theme={theme} />
            </View>
          )}
          {article.entities && (
            <View style={styles.entities}>
              <ArticleEntitiesList article={article} />
            </View>
          )}
          {article.byline && (
            <View style={styles.byline}>
              <ArticleByline byline={article.byline} theme={theme} />
            </View>
          )}
          {article.displayRules &&
            article.displayRules.brandLexisNexis &&
            article.lexisNexis && (
              <TouchableOpacity
                // eslint-disable-next-line react/jsx-no-bind
                onPress={() => openLink(article.lexisNexis.url)}
              >
                <ArticleCopyright
                  copyright={`${article.lexisNexis.copyright} - ${article.lexisNexis.terms}`}
                />
              </TouchableOpacity>
            )}
          {article.intro && (
            <View style={styles.intro}>
              <HTML
                html={article.intro}
                baseFontStyle={{
                  ...styles.intro,
                  ...{ color: theme === 'light' ? '#111' : '#ddd' }
                }}
                classesStyles={hitWordsStyle}
              />
            </View>
          )}
          {article.timeline && article.timeline.hits && (
            <ArticleTimeline timeline={article.timeline} />
          )}
          {article.story && article.story !== '…' && (
            <View style={styles.story}>
              <HTML
                html={article.story || ''}
                baseFontStyle={{
                  ...styles.story,
                  ...{ color: theme === 'light' ? '#111' : '#ddd' }
                }}
                tagsStyles={pStyle}
                classesStyles={hitWordsStyle}
              />
            </View>
          )}
          {loading && (
            <ActivityIndicator
              size="large"
              color={theme === 'light' ? '#111' : '#ddd'}
            />
          )}

          {article.copyright && (
            <ArticleCopyright copyright={article.copyright} />
          )}

          {article.urlsV2 &&
            !loading &&
            (article.urlsV2.web || article.urlsV2.fullPdf) &&
            canViewOriginal && (
              <TouchableOpacity
                style={styles.readOriginal}
                onPress={viewOriginal}
              >
                <ArticleReadOriginal
                  sourceName={article.source.name}
                  theme={theme}
                />
              </TouchableOpacity>
            )}
        </View>
      </View>
    </ScrollView>
  );
};

ArticleTextView.propTypes = {
  dimensions: shape({ height: number, width: number }).isRequired,
  article: articleShape.isRequired,
  loading: bool.isRequired,
  viewOriginal: func.isRequired,
  headerHeight: number.isRequired,
  canViewOriginal: bool.isRequired,
  theme: oneOf(['light', 'dark']).isRequired
};

export default ArticleTextView;
