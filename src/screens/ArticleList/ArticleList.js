/* eslint-disable no-underscore-dangle */
import React from 'react';
import { SafeAreaView, Alert, Dimensions } from 'react-native';
import { FlatList, ThemeContext } from 'react-navigation';
import { connect } from 'react-redux';
import Heap from '@heap/react-native-heap';
import { func, shape } from 'prop-types';
import Moment from 'moment';
import ArticleListItem from '../../components/ArticleListItem/ArticleListItem';
import AnimatedView from '../../components/AnimatedView/AnimatedView';
import Header from '../../components/Header/Header';
import ListItemSeparator from '../../components/ListItemSeparator/ListItemSeparator.js';
import { getListOfArticles } from '../../api/doccy';
import ZeroState from '../../components/ZeroState/ZeroState.js';
import UserShape from '../../prop-types/user-prop-types';

const mapStateToProps = state => ({
  user: state.user
});

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    const { height, width } = Dimensions.get('window');

    this.state = {
      articleList: [],
      loading: false,
      dimensions: { height, width }
    };
    this.onPressListItem = this.onPressListItem.bind(this);
  }

  componentDidMount() {
    Dimensions.addEventListener('change', () => {
      const { height, width } = Dimensions.get('window');
      this.setState({
        dimensions: { height, width }
      });
    });
    this.getArticles();
    Heap.track('viewed-article-list-screen', {});
  }

  componentDidUpdate(newProps) {
    const { user } = newProps;
    const { navigation } = this.props;
    if (!user.userName) {
      navigation.navigate('login');
    }
    console.log('componentDidUpdate', newProps);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  getArticles() {
    const { navigation, user } = this.props;
    const to = Moment().format('YYYY-MM-DD');
    const from = Moment()
      .subtract(300, 'days')
      .format('YYYY-MM-DD');
    this.setState({ loading: true });
    getListOfArticles({
      profiles: navigation.state.params.profile.id,
      from,
      to,
      sessionId: user.sessionId
    })
      .then(articleListResponse => {
        // console.log(articleListResponse.data.documents);
        this.setState({
          articleList: articleListResponse.data.documents,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState(
          {
            loading: false
          },
          () => Alert.alert('Feil', 'Could not get articles. Try again soon.')
        );
      });
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
    const theme = ThemeContext._currentValue;
    return (
      <AnimatedView index={item.index}>
        <ArticleListItem
          item={item}
          dimensions={dimensions}
          // eslint-disable-next-line react/jsx-no-bind
          onPressItem={article => this.onPressListItem(article)}
          theme={theme}
        />
      </AnimatedView>
    );
  };

  render() {
    const { articleList, loading, dimensions } = this.state;
    const { navigation } = this.props;
    const theme = ThemeContext._currentValue;

    let zeroState;
    if (loading === true) {
      zeroState = (
        <ZeroState
          loading
          message="Getting Articles"
          deviceHeight={dimensions.height}
          theme={theme}
        />
      );
    } else {
      zeroState = (
        <ZeroState
          loading={false}
          deviceHeight={dimensions.height}
          message="Could not get articles. Pull down to try again."
          theme={theme}
        />
      );
    }

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
              title={navigation.state.params.profile.name}
              theme={theme}
            />
          }
          data={articleList}
          keyExtractor={this.listItemKeyExtractor}
          renderItem={this.renderListItem}
          progressViewOffset={50}
          stickySectionHeadersEnabled
          // eslint-disable-next-line react/jsx-no-bind
          ItemSeparatorComponent={() => <ListItemSeparator theme={theme} />}
          stickyHeaderIndices={[0]}
          // eslint-disable-next-line react/jsx-no-bind
          onRefresh={() => this.getArticles()}
          refreshing={loading}
          ListEmptyComponent={zeroState}
        />
      </SafeAreaView>
    );
  }
}

ArticleList.contextType = ThemeContext;

ArticleList.propTypes = {
  user: UserShape.isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};

export default connect(mapStateToProps)(ArticleList);
