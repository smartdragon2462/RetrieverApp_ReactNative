import {
  SAVE_ARTICLE,
  REMOVE_ARTICLE
} from '../../constants/article-constants';

const articles = (state = [], action) => {
  switch (action.type) {
    case SAVE_ARTICLE:
      return state.concat(action.payload);
    case REMOVE_ARTICLE:
      return state.filter(article => article.docId !== action.id);
    default:
      return state;
  }
};

export default articles;
