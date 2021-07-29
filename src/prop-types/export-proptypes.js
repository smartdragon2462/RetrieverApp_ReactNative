import { arrayOf, bool, objectOf, shape, string } from 'prop-types';

export const checkboxShape = arrayOf(
  shape({
    value: string,
    label: string,
    isSelected: bool
  })
);

export const objectOfStringShape = objectOf(string);
