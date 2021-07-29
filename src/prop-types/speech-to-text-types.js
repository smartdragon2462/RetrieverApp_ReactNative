import { shape, string } from 'prop-types';
import { timelineHitsShape } from './article-prop-types.js';

const timeLineType = shape({
  duration: string,
  hits: timelineHitsShape
});

export default timeLineType;
