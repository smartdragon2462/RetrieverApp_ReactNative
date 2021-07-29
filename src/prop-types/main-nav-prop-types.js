import { arrayOf, shape, string } from 'prop-types';

const subNavArr = arrayOf(
  shape({
    name: string,
    path: string
  })
);

export default subNavArr;
