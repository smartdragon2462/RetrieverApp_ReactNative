import PropTypes from 'prop-types';

const UserShape = PropTypes.shape({
  account: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  accountRole: PropTypes.string,
  customer: PropTypes.number,
  homepage: PropTypes.string,
  invoicePlaceName: PropTypes.string,
  isWhiteListedIpAddress: PropTypes.bool,
  language: PropTypes.string,
  sessionId: PropTypes.string,
  userName: PropTypes.string
});

export default UserShape;
