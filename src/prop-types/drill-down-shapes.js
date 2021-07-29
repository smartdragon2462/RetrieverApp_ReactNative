import { arrayOf, shape, string, number, object } from 'prop-types';

export const docDateShape = arrayOf(
  shape({
    count: number,
    from: string,
    id: string,
    to: string
  })
);

export const languageShape = arrayOf(
  shape({
    aggregations: object,
    count: number,
    id: string,
    label: string
  })
);

export const mediatypeShape = arrayOf(
  shape({
    aggregations: {
      source: [{}]
    },
    count: number,
    id: string,
    label: string
  })
);
export const selectedSourceShape = arrayOf(
  shape({
    count: number,
    id: number,
    label: string,
    mediatype: string
  })
);

export const selectedLanguageShape = arrayOf(
  shape({
    count: number,
    id: string,
    label: string,
    mediatype: string
  })
);

export const dateShape = shape({
  from: string,
  to: string
});
