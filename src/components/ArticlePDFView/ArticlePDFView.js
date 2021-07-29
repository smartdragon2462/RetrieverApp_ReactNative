/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { ScrollView, Platform } from 'react-native';
import { shape, number, string, func } from 'prop-types';
import { WebView } from 'react-native-webview';
import ArticleWebViewActionBar from '../ArticleWebViewActionBar/ArticleWebViewActionBar';

const ArticlePDFView = ({ dimensions, pdfUrl, headerHeight, goToTop }) => {
  return (
    <ScrollView
      // nestedScrollEnabled
      // stickyHeaderIndices={[0]}
      style={{
        width: dimensions.width,
        height: dimensions.height - headerHeight,
        flex: 1
      }}
    >
      {Platform.select({
        ios: (
          <WebView
            useWebKit
            // onLoadEnd={onLoadEnd}
            decelerationRate="normal"
            source={{
              uri: pdfUrl
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
                uri: pdfUrl
              }}
              style={{
                width: dimensions.width,
                height: dimensions.height - headerHeight - 20
              }}
              allowsInlineMediaPlayback={false}
              allowsFullscreenVideo={false}
              mediaPlaybackRequiresUserAction
              incognito
              startInLoadingState
            />
          </React.Fragment>
        )
      })}
    </ScrollView>
  );
};

ArticlePDFView.propTypes = {
  dimensions: shape({ height: number, width: number }).isRequired,
  pdfUrl: string.isRequired,
  goToTop: func.isRequired,
  headerHeight: number.isRequired
};

export default ArticlePDFView;
