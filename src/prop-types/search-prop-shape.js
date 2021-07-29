import { shape, string, bool, object } from 'prop-types';
import {
  duplicateResultsShape,
  flattenViewSelectedShape
} from './result-prop-types.js';

const searchShape = shape({
  dateRange: object,
  isSearching: bool,
  result: duplicateResultsShape.results,
  searchOptions: shape({
    flattenViewSelected: flattenViewSelectedShape
  }),
  viewOption: string
});

export default searchShape;
