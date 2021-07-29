import { shape, string, number } from 'prop-types';

export const motdInitShape = shape({
  message_DA: string,
  message_EN: string,
  message_FI: string,
  message_NO: string,
  message_SV: string,
  id: number,
  modified: string.isRequired
});
// new Date(temp1.modified).getTime()
export const motdShape = shape({
  key: string,
  text: string,
  priority: number,
  timestamp: string
});
