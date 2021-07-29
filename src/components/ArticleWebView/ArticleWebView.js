/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { ScrollView, Platform } from 'react-native';
import { shape, number, func } from 'prop-types';
import { WebView } from 'react-native-webview';
import { articleShape } from '../../prop-types/article-prop-types';
import ArticleWebViewActionBar from '../ArticleWebViewActionBar/ArticleWebViewActionBar';

const ArticleWebview = ({ dimensions, headerHeight, article, goToTop }) => {
  return (
    <ScrollView
      style={{
        width: dimensions.width,
        height: dimensions.height - headerHeight
      }}
    >
      {Platform.select({
        ios: (
          <WebView
            useWebKit
            // onLoadEnd={onLoadEnd}
            decelerationRate="normal"
            source={{
              uri: article.urlsV2.web
            }}
            style={{
              width: dimensions.width,
              height: dimensions.height - headerHeight
            }}
            allowsInlineMediaPlayback={false}
            allowsFullscreenVideo={false}
            mediaPlaybackRequiresUserAction
            incognito
            startInLoadingState
          />
        ),
        android: (
          <React.Fragment>
            <ArticleWebViewActionBar
              goToTop={goToTop}
              dimensions={dimensions}
            />
            <WebView
              useWebKit
              // onLoadEnd={onLoadEnd}
              decelerationRate="normal"
              source={{
                uri: article.urlsV2.web
              }}
              style={{
                width: dimensions.width,
                height: dimensions.height - headerHeight - 20
              }}
              allowsInlineMediaPlayback={false}
              allowsFullscreenVideo={false}
              mediaPlaybackRequiresUserAction
              // incognito //android can't use incognito because it removes global cookies as well
              startInLoadingState
            />
          </React.Fragment>
        )
      })}
    </ScrollView>
  );
};

ArticleWebview.propTypes = {
  dimensions: shape({ height: number, width: number }).isRequired,
  article: articleShape.isRequired,
  headerHeight: number.isRequired,
  goToTop: func.isRequired
};

export default ArticleWebview;
