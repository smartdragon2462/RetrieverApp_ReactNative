/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { func, bool, string, oneOf } from 'prop-types';
import Feather from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.2,
    borderBottomColor: '#999',
    padding: 10,
    height: 57,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconLeft: {
    flexGrow: 1,
    width: '10%',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  iconRight: {
    flexGrow: 1,
    width: '10%',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 30,
    fontFamily: 'Roboto-Black',
    flexWrap: 'nowrap',
    maxWidth: '80%',
    textAlign: 'center',
    flexGrow: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const Header = ({
  showBackIcon,
  showActionIcon,
  goBackNow,
  title,
  logo,
  openActionSheet,
  theme
}) => {
  return (
    <SafeAreaView>
      <View
        style={[
          styles.container,
          { backgroundColor: theme === 'light' ? '#fff' : '#000' }
        ]}
      >
        {showBackIcon ? (
          <TouchableOpacity style={styles.iconLeft} onPress={() => goBackNow()}>
            <Feather
              name="chevron-left"
              size={30}
              color={theme === 'light' ? '#333' : '#ddd'}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconLeft} />
        )}
        {logo !== null ? (
          <Image
            source={{ uri: `https://web.retriever-info.com${logo}` }}
            style={{
              height: 38,
              width: 200,
              resizeMode: 'contain'
            }}
            resizeMode="contain"
            resizeMethod="resize"
          />
        ) : (
          <Text
            style={[
              styles.title,
              { color: theme === 'light' ? '#333' : '#ddd' }
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
        )}

        {showActionIcon ? (
          <TouchableOpacity
            style={styles.iconRight}
            onPress={() => openActionSheet()}
          >
            <Feather
              name="share"
              size={30}
              color={theme === 'light' ? '#333' : '#ddd'}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconRight} />
        )}
      </View>
    </SafeAreaView>
  );
};

Header.defaultProps = {
  showBackIcon: false,
  showActionIcon: false,
  goBackNow: () => {},
  openActionSheet: () => {},
  logo: null
};

Header.propTypes = {
  showBackIcon: bool,
  showActionIcon: bool,
  goBackNow: func,
  title: string.isRequired,
  openActionSheet: func,
  logo: string,
  theme: oneOf(['light', 'dark']).isRequired
};

export default Header;
