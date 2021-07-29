/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  PanResponder,
  Alert,
  Linking,
  Share
} from 'react-native';
import { connect } from 'react-redux';
import { ThemeContext } from 'react-navigation';
import Heap from '@heap/react-native-heap';
import { shape, func, arrayOf, bool } from 'prop-types';
import SwipeRecognizer from 'react-native-swipe-recognizer';
import { hasNotch } from 'react-native-device-info';
import ActionSheet from 'react-native-actionsheet';
import ArticleTextView from '../../components/ArticleTextView/ArticleTextView';
import Header from '../../components/Header/Header';
import UserShape from '../../prop-types/user-prop-types';
import { articleShape } from '../../prop-types/article-prop-types';
import { getSingleArticle } from '../../api/doccy';
import {
  saveArticle as saveArticleAction,
  removeArticle as removeArticleAction
} from '../../store/actions/article-action';
import ArticleWebView from '../../components/ArticleWebView/ArticleWebView';
import ArticlePDFView from '../../components/ArticlePDFView/ArticlePDFView';

const swipeRecognizer = new SwipeRecognizer({
  minimumSwipeDistance: 10,
  minimumSwipeSpeed: 0.01
});

const mapStateToProps = state => ({
  user: state.user,
  articles: state.articles,
  netInfo: state.netInfo
});

const mapDispatchToProps = dispatch => ({
  saveArticle(article) {
    dispatch(saveArticleAction(article));
  },
  removeArticle(id) {
    dispatch(removeArticleAction(id));
  }
});
class Article extends React.Component {
  constructor(props) {
    super(props);
    const { height, width } = Dimensions.get('window');
    this.state = {
      article: props.navigation.state.params,
      dimensions: { height, width },
      loading: false,
      headerHeight: 57
    };

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) => {
        const touchThreshold = 20;
        const { dx, dy } = gestureState;
        return Math.abs(dx) > touchThreshold || Math.abs(dy) > touchThreshold;
      },
      onPanResponderRelease: (e, gestureState) => {
        if (swipeRecognizer.isRightSwipe(gestureState)) {
          // console.log("right swipe recognized!");
          this.handleGoBack();
        }
        if (swipeRecognizer.isLeftSwipe(gestureState)) {
          const { showWebView } = this.state;
          this.setState({ showWebView: !showWebView });
        }
      }
    });

    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleOpenActionSheet = this.handleOpenActionSheet.bind(this);
    this.handleActionSheetAction = this.handleActionSheetAction.bind(this);
    this.scrollToOriginal = this.scrollToOriginal.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  async componentDidMount() {
    let headerHeight = 57;

    if (hasNotch()) {
      headerHeight = 57 + 44;
    } else {
      headerHeight = 57 + 20;
    }
    this.setState({ headerHeight });

    Dimensions.addEventListener('change', () => {
      const { height, width } = Dimensions.get('window');
      this.setState({ dimensions: { height, width } });
    });

    const { netInfo } = this.props;
    const { article } = this.state;
    if (!netInfo.isConnected) {
      const { articles } = this.props;
      const findItem = articles.find(({ docId }) => article.docId === docId);
      if (findItem) {
        this.setState({ article: findItem, loading: false });
      }
      return;
    }

    this.getArticle(article.docId, article.profiles);
    Heap.track('viewed-article-screen', { docId: article.docId });
  }

  componentDidUpdate(prevProps) {
    const { navigation } = this.props;
    const { docId, profiles } = navigation.state.params;
    const {
      docId: prevDocId,
      profiles: prevProfiles
    } = prevProps.navigation.state.params;
    if (docId !== prevDocId || profiles !== prevProfiles) {
      this.getArticle(docId, profiles);
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  setScrollViewRef = element => {
    this.scrollViewRef = element;
  };

  getArticle(docId, profiles) {
    const { user } = this.props;
    const profileIDs =
      typeof profiles === 'string' ? JSON.parse(profiles) : profiles;
    this.setState({ loading: true }, () => {
      getSingleArticle({
        docId,
        profiles: profileIDs[0],
        sessionId: user.sessionId
      })
        .then(articleListResponse => {
          this.setState(
            {
              article: articleListResponse.data,
              loading: false
            },
            () => {
              const { article } = this.state;
              if (
                article.displayRules &&
                (article.displayRules.pdfDefault ||
                  article.displayRules.framedDefault) &&
                article.urlsV2 &&
                (article.urlsV2.web || article.urlsV2.fullPdf)
              ) {
                this.scrollToOriginal();
              }
            }
          );
        })
        .catch(error => {
          console.error('getArticle', error);
          Alert.alert(
            'Houston, we have a problem.',
            'Could not get article. try again later.'
          );
          this.setState({ loading: false });
        });
    });
  }

  handleGoBack() {
    const { navigation } = this.props;
    navigation.goBack(null);
  }

  handleOpenActionSheet() {
    this.ActionSheet.show();
  }

  handleActionSheetAction(index) {
    const { article } = this.state;
    if (index === 2) {
      Alert.alert(
        'Sharing is restricted',
        'All articles are protected by the copyright Act. Articles may not be distributed outside the organization without the approval of Retriever or the individual publisher.',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {
            text: 'Agree',
            onPress: () => {
              Share.share(
                {
                  message: article.urlsV2.goscript,
                  title: `${article.profileData[0].profile.name}: ${article.headline}`
                },
                {
                  // Android only:
                  dialogTitle: 'Share article',
                  // iOS only:
                  excludedActivityTypes: [
                    // 'com.apple.UIKit.activity.PostToTwitter'
                  ]
                }
              );
            }
          }
        ],
        { cancelable: false }
      );
    }
    if (index === 3) {
      Linking.openURL(article.urlsV2.goscript);
    }
    if (index === 1) {
      const { saveArticle, removeArticle, articles } = this.props;
      if (articles.map(({ docId }) => docId).includes(article.docId)) {
        removeArticle(article.docId);
      } else {
        saveArticle(article);
      }
    }
    if (index === 4) {
      this.scrollToOriginal();
    }
  }

  scrollToOriginal() {
    const { dimensions, headerHeight } = this.state;
    this.scrollViewRef.scrollTo({
      x: 0,
      y: dimensions.height - headerHeight,
      animated: true
    });
  }

  scrollToTop() {
    this.scrollViewRef.scrollTo({
      x: 0,
      y: 0,
      animated: true
    });
  }

  render() {
    const { article, loading, dimensions, headerHeight } = this.state;
    const { articles, netInfo, user } = this.props;
    const theme = ThemeContext._currentValue;
    const isSaved = articles.map(({ docId }) => docId).includes(article.docId);
    console.log(article);
    let doccyPDF;
    if (article.urlsV2 && article.urlsV2.fullPdf && user.sessionId) {
      doccyPDF = `https://app.retriever-info.com/pdf/viewer.html?file=${encodeURIComponent(
        `${article.urlsV2.fullPdf}&sessionId=${user.sessionId}`
      )}#page=${article.displayRules.fullPdfArticlePage}`;
    }

    let shareSheetOptions;
    if (
      article.urlsV2 &&
      (article.urlsV2.fullPdf || article.urlsV2.web) &&
      netInfo.isConnected
    ) {
      // include view original/share/open in browser
      shareSheetOptions = [
        'Cancel',
        isSaved ? 'Unbookmark' : 'Bookmark',
        'Share',
        'Open in Browser',
        'View Original'
      ];
    } else {
      shareSheetOptions = [
        'Cancel',
        isSaved ? 'Unbookmark' : 'Bookmark',
        'Share',
        'Open in Browser'
      ];
    }

    return (
      <SafeAreaView
        style={{
          backgroundColor: theme === 'light' ? '#fff' : '#000'
        }}
      >
        <StatusBar networkActivityIndicatorVisible barStyle="dark-content" />
        {article.source && article.source.name && (
          <Header
            theme={theme}
            title={article.source.name}
            logo={article.source.logo}
            goBackNow={this.handleGoBack}
            showBackIcon
            showActionIcon
            openActionSheet={this.handleOpenActionSheet}
          />
        )}

        <ScrollView
          style={{
            width: dimensions.width,
            height: dimensions.height - headerHeight
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...this._panResponder.panHandlers}
          pagingEnabled
          // nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          ref={this.setScrollViewRef}
          bounces={false}
        >
          <ArticleTextView
            article={article}
            theme={theme}
            loading={loading}
            dimensions={dimensions}
            headerHeight={headerHeight}
            viewOriginal={this.scrollToOriginal}
            canViewOriginal={netInfo.isConnected}
          />

          {article.urlsV2 && article.urlsV2.web && netInfo.isConnected && (
            <ArticleWebView
              dimensions={dimensions}
              article={article}
              headerHeight={headerHeight}
              goToTop={this.scrollToTop}
            />
          )}

          {article.displayRules &&
            article.displayRules.allowPdf &&
            article.urlsV2 &&
            article.urlsV2.fullPdf &&
            netInfo.isConnected && (
              <ArticlePDFView
                dimensions={dimensions}
                pdfUrl={doccyPDF}
                headerHeight={headerHeight}
                goToTop={this.scrollToTop}
              />
            )}
        </ScrollView>

        <ActionSheet
          // eslint-disable-next-line no-return-assign
          ref={o => (this.ActionSheet = o)}
          options={shareSheetOptions}
          cancelButtonIndex={0}
          onPress={index => this.handleActionSheetAction(index)}
        />
      </SafeAreaView>
    );
  }
}

Article.propTypes = {
  user: UserShape.isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired,
  saveArticle: func.isRequired,
  removeArticle: func.isRequired,
  articles: arrayOf(articleShape).isRequired,
  netInfo: shape({
    isConnected: bool.isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
