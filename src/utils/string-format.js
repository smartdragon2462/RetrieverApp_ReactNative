/* eslint-disable prefer-rest-params */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import tail from 'lodash/tail';

export default () => {
  function format(formatStr, arr) {
    const args = Array.isArray(arr) ? arr : tail(arguments);
    let count = 0;
    return formatStr.replace(/\{\s*(\d+)?\s*\}/g, (str, match) => {
      const idx = match ? parseInt(match, 10) : (count += 1);
      return idx < args.length ? args[idx] : str;
    });
  }

  function formatStringContainingBracketsWithReplacementWords(
    formatStr,
    replacements
  ) {
    const _formatRegex = /\{\s*(\d+)?\s*\}/;
    if (replacements !== null && replacements.length > 0) {
      replacements.forEach(replacement => {
        formatStr = formatStr.replace(_formatRegex, replacement);
      });
    }
    return formatStr;
  }

  return {
    format,
    formatStringContainingBracketsWithReplacementWords
  };
};
