/* eslint-disable react/destructuring-assignment */
const dateTimePropType = (props, propName, componentName) => {
  if (!props[propName]) {
    return null;
  }

  if (
    !/^([12][0-9]{3})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])$/.test(
      props[propName]
    )
  ) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to` +
        ` \`${componentName}\`. Validation failed. docDate should be in format yyyy-mm-ddThh:MM:ss`
    );
  }

  return null;
};

export default dateTimePropType;
