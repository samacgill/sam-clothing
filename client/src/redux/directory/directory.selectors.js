import { createSelector } from "reselect";

const selectDirectory = (state) => state.directory;

export const selectDirectoySections = createSelector(
  [selectDirectory],
  (directory) => directory.sections
);
