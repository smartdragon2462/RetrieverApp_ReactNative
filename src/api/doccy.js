import Axios from 'axios';

const getListOfArticles = ({ profiles, from, to, sessionId }) =>
  Axios({
    method: 'GET',
    timeout: 20000,
    url: `https://ws.retriever-info.com/doccy/result/documents?profiles=${profiles}&from=${from}&to=${to}&sources=&languages=&mediatypes=&page=1&size=100&sessionId=${sessionId}&viewDuplicates=false`
  });

const postToGetListOfArticles = ({ profiles, from, to, sessionId }) =>
  Axios({
    method: 'POST',
    timeout: 20000,
    url: `https://ws.retriever-info.com/doccy/result/documents/search?sessionId=${sessionId}`,
    data: {
      profiles,
      from,
      to,
      viewDuplicates: 'false',
      page: 1,
      size: 100
    }
  });

const getListOfTopProfileArticles = ({ profiles, from, to, sessionId }) =>
  Axios({
    method: 'POST',
    timeout: 20000,
    url: `https://ws.retriever-info.com/doccy/result/documents/search?sessionId=${sessionId}`,
    data: {
      profiles,
      page: 1,
      size: 100,
      viewDuplicates: 'false',
      fixedProfileSize: 5,
      to,
      from
    }
  });

const getSingleArticle = ({ docId, profiles, sessionId }) =>
  Axios({
    method: 'GET',
    timeout: 20000,
    url: `https://ws.retriever-info.com/doccy/result/documents/${docId}?q=&profiles=${profiles}&sessionId=${sessionId}`
  });

const getSingleArticlePDF = ({ docId, page, profiles, sessionId }) =>
  Axios({
    method: 'GET',
    timeout: 20000,
    url: `https://ws.retriever-info.com/doccy/result/documents/${docId}/pdf?page=${page}&profiles=${profiles}&sessionId=${sessionId}`
  });

export {
  getListOfArticles,
  postToGetListOfArticles,
  getListOfTopProfileArticles,
  getSingleArticle,
  getSingleArticlePDF
};
