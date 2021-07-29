/* eslint-disable no-underscore-dangle */
import React from 'react';
import { SafeAreaView, Dimensions } from 'react-native';
import { FlatList, ThemeContext } from 'react-navigation';
import { connect } from 'react-redux';
import { func, shape, arrayOf, object } from 'prop-types';
import Heap from '@heap/react-native-heap';
import UserShape from '../../prop-types/user-prop-types';
import ArticleListItem from '../../components/ArticleListItem/ArticleListItem';
import AnimatedView from '../../components/AnimatedView/AnimatedView';
import Header from '../../components/Header/Header';
import ZeroState from '../../components/ZeroState/ZeroState.js';

const mapStateToProps = state => ({
  articles: state.articles,
  user: state.user
});

class SavedArticles extends React.Component {
  constructor(props) {
    super(props);
    const { height, width } = Dimensions.get('window');

    this.state = {
      dimensions: { height, width }
    };
    this.onPressListItem = this.onPressListItem.bind(this);
  }

  componentDidMount() {
    Heap.track('viewed-saved-articles-screen', {});
    Dimensions.addEventListener('change', () => {
      const { height, width } = Dimensions.get('window');
      this.setState({
        dimensions: { height, width }
      });
    });
  }

  static getDerivedStateFromProps(props) {
    const { user } = props;
    const { navigation } = props;
    if (!user.userName) {
      navigation.navigate('login');
    }

    return null;
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  listItemKeyExtractor = item => item.docId;

  onPressGoBack = () => {
    const { navigation } = this.props;

    navigation.goBack(null);
  };

  onPressListItem = item => {
    const { navigation } = this.props;
    navigation.navigate('article', {
      ...item,
      docId: item.docId,
      profiles: item.profileData.map(({ profile }) => profile.id)
    });
  };

  renderListItem = item => {
    const { dimensions } = this.state;
    return (
      <AnimatedView index={item.index}>
        <ArticleListItem
          item={item}
          dimensions={dimensions}
          // eslint-disable-next-line react/jsx-no-bind
          onPressItem={article => this.onPressListItem(article)}
        />
      </AnimatedView>
    );
  };

  render() {
    const { dimensions } = this.state;
    const { articles } = this.props;
    const theme = ThemeContext._currentValue;

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme === 'light' ? '#fff' : '#000'
        }}
      >
        <FlatList
          initialNumToRender={20}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Header
              goBackNow={this.onPressGoBack}
              showBackIcon
              title="Bookmarked"
              theme={theme}
            />
          }
          data={articles}
          keyExtractor={this.listItemKeyExtractor}
          renderItem={this.renderListItem}
          progressViewOffset={100}
          stickySectionHeadersEnabled
          ListEmptyComponent={
            <ZeroState
              loading={false}
              deviceHeight={dimensions.height}
              message="No Bookmarked Articles"
              theme={theme}
            />
          }
        />
      </SafeAreaView>
    );
  }
}

SavedArticles.contextType = ThemeContext;

SavedArticles.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired,
  articles: arrayOf(object).isRequired,
  user: UserShape.isRequired
};

export default connect(mapStateToProps)(SavedArticles);
