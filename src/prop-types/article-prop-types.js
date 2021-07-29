import { arrayOf, shape, string, number, bool, object } from 'prop-types';
import dateTimePropType from './date-time-prop-type.js';

export const urlsShape = shape({
  article: string,
  base: string,
  facsimile: string,
  fulltext: string,
  goscript: string,
  pdf: string,
  preview: string,
  thumbnail: string
});

export const sourceNameShape = shape({
  name: string
});

export const urlShape = shape({
  fulltext: string
});

export const displayRulesShape = shape({
  allowTranslation: bool,
  brandLexisNexis: bool,
  brandLocked: bool,
  code: string,
  framedDefault: bool,
  fullTextSwitch: bool,
  pdfDefault: bool
});

export const sourceShape = shape({
  id: number,
  name: string
});

export const timelineHitsShape = arrayOf(
  shape({
    position: number,
    series: number,
    url: string,
    phrase: string
  })
);

export const timelineShape = shape({
  duration: string,
  end: string,
  start: string,
  sprite: string,
  hits: timelineHitsShape
});

export const articlePagesShape = shape({
  current: number,
  last: number,
  article: arrayOf(number),
  available: arrayOf(number)
});

export const articleShape = shape({
  byline: string,
  cache: bool,
  copyright: string,
  displayRules: displayRulesShape,
  docDate: dateTimePropType,
  docId: string,
  duplicateCount: number,
  duration: string,
  dynteaser: string,
  headline: string,
  intro: string,
  locked: bool,
  mediaType: string,
  pages: articlePagesShape,
  profileData: arrayOf(object),
  source: sourceShape,
  status: string,
  story: string,
  timeline: timelineShape,
  urls: urlsShape,
  wordCount: number
});

export const pulseArticleShape = shape({
  id: string,
  title: string,
  story: string,
  author: object,
  socialmetrics: object,
  shares: number,
  level: number,
  value: number,
  docdate: number,
  socialsource: string,
  profileImg: string
});
