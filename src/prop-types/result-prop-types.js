import {
  arrayOf,
  shape,
  string,
  number,
  array,
  bool,
  object
} from 'prop-types';

export const resultProfiles = shape({
  impact: number,
  profile: shape({
    id: number,
    name: string
  }),
  weight: string
});

export const resultsItemShape = shape({
  displayRules: shape({
    allowTranslation: bool,
    brandLexisNexis: bool,
    brandLocked: bool,
    fullTextSwitch: bool
  }),
  docDate: string,
  docId: string,
  duplicateCount: number,
  dynteaser: string,
  headline: string,
  intro: string,
  mediatype: string,
  profileData: arrayOf(resultProfiles),
  selected: bool,
  isUpdating: bool,
  source: shape({
    id: number,
    logo: string,
    name: string,
    url: string
  }),
  status: string,
  urls: shape({
    base: string,
    facsimile: string,
    fulltext: string,
    internalFulltext: bool
  }),
  wordCount: number
});

export const duplicateResultsShape = shape({
  isSearching: bool,
  results: shape({
    aggregations: object,
    documents: arrayOf(resultsItemShape),
    searchAfter: array,
    selected: number,
    total: number
  })
});

export const accessShape = shape({
  analysisArchiveAccessible: bool,
  deleteMonitorResultsAccessible: bool,
  manualSchedulingAccessible: bool,
  monitorCopyAndMove: bool,
  monitorEditArticle: bool,
  monitorImpact: bool,
  monitorManualAddArticleAccessible: bool,
  monitorPrivateFeedAccessible: bool,
  monitorSearchInResults: bool,
  publishUnPublish: bool,
  saveDocSelection: bool,
  selectionManipulation: bool
});

export const flattenViewSelectedShape = bool;
