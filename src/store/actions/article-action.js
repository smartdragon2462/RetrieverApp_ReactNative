import {
  SAVE_ARTICLE,
  REMOVE_ARTICLE
} from '../../constants/article-constants';

export const saveArticle = payload => ({
  type: SAVE_ARTICLE,
  payload
});

export const removeArticle = id => ({
  type: REMOVE_ARTICLE,
  id
});
