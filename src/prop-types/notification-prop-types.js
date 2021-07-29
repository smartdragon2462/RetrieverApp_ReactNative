import { shape, string, number, oneOfType } from 'prop-types';

const notificationShape = shape({
  message: string.isRequired,
  statusCode: oneOfType([string, number]),
  created: string.isRequired,
  toastConfig: shape({
    type: string.isRequired,
    autoClose: number.isRequired
  })
});

export default notificationShape;
