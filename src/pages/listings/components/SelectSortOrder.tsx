import React from "react";
import * as Constants from "../../common/Constants";
import * as Types from "../../common/Types";
import { outputEnFr, ConverterString } from "../../common/HelperFunctions";

type props_SelectSortOrder = {
  lang: string;
  filters: Types.searchFilters;
  onSearchFilterChange;
};

const SelectSortOrder = (props: props_SelectSortOrder) => {
  const onSortByChange = (e) => {
    const newSortVal = e.target.value;

    const updatedSearchFilters: Types.searchFilters = {
      ...props.filters,
      sortBy: newSortVal,
    };

    props.onSearchFilterChange(updatedSearchFilters);
  };

  return (
    <>
      <div id="list-sorter">
        <label>{outputEnFr("Sort: ", "Trier: ", props.lang)}</label>
        <select
          id="sort-by"
          name="sort-by"
          aria-label="sort by"
          onChange={(e) => onSortByChange(e)}
          value={
            ConverterString(props.filters.sortBy) || Constants.SORT.YEAR_HI
          }
        >
          <option value={Constants.SORT.YEAR_HI}>
            {outputEnFr("Year (New to Old)", "Année (Élevé à Bas)", props.lang)}
          </option>
          <option value={Constants.SORT.YEAR_LO}>
            {outputEnFr("Year (Old to New)", "Année (Bas à Élevé)", props.lang)}
          </option>
          <option value={Constants.SORT.PRICE_LO}>
            {outputEnFr(
              "Price (Low to High)",
              "Prix (Bas à Élevé)",
              props.lang
            )}
          </option>
          <option value={Constants.SORT.PRICE_HI}>
            {outputEnFr(
              "Price (High to Low)",
              "Prix (Élevé à Bas)",
              props.lang
            )}
          </option>
          <option value={Constants.SORT.HOURS_LO}>
            {outputEnFr(
              "Hours (Low to High)",
              "Heures (Bas à Élevé)",
              props.lang
            )}
          </option>
          <option value={Constants.SORT.HOURS_HI}>
            {outputEnFr(
              "Hours (High to Low)",
              "Heures (Élevé à Bas)",
              props.lang
            )}
          </option>
          <option value={Constants.SORT.MODEL_LO}>
            {outputEnFr("Model (A-Z)", "Modèle (A-Z)", props.lang)}
          </option>
          <option value={Constants.SORT.MODEL_HI}>
            {outputEnFr("Model (Z-A)", "Modèle (Z-A)", props.lang)}
          </option>
        </select>
      </div>
    </>
  );
};
SelectSortOrder.whyDidYouRender = true;
export default SelectSortOrder;
