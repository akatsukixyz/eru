import queryString from 'query-string';

export const query = full => queryString.parse(full);
