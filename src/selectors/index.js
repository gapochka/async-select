import { createSelector } from 'reselect';

// eslint-disable-next-line import/prefer-default-export
export const getValue = createSelector(
  state => state,
  ({ value, label }) => ({ value, label })
);
