import { createSelector } from 'reselect';

export const getValue = createSelector(
  state => state,
  ({ value, label }) => ({ value, label })
);
