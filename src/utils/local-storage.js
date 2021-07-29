import AsyncStorage from '@react-native-community/async-storage';

export const loadState = () =>
  AsyncStorage.getItem('retreiverNewsState')
    .then(loadedState => {
      return JSON.parse(loadedState) || {};
    })
    .catch(error => {
      console.log('loadstate error', error);
      return {};
    });

export const saveState = state => {
  return AsyncStorage.setItem('retreiverNewsState', JSON.stringify(state)).then(
    savedState => savedState
  );
};
