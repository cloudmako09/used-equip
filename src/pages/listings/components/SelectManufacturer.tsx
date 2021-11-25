import React from "react";
import * as Types from "../../common/Types";
import { outputEnFr } from "../../common/HelperFunctions";
import { isEnvironmentBFERENTAL } from "../../common/Constants";

type props_SelectManufacturer = {
  lang: string;
  filters: Types.searchFilters;
  onSearchFilterChange;
  onKeyPress?; //only needed for home page
};

const SelectManufacturer = (props: props_SelectManufacturer) => {
  const onSelectboxChange = (e) => {
    const newManufacturer = e.target.value;

    const updatedSearchFilters: Types.searchFilters = {
      ...props.filters,
      make: newManufacturer,
    };

    props.onSearchFilterChange(updatedSearchFilters);
  };

  return (
    <>
      {isEnvironmentBFERENTAL ? (
        ""
      ) : (
        <>
          <label htmlFor="product-make">
            {outputEnFr("Manufacturer:", "Fabricant:", props.lang)}
          </label>
          <select
            id="product-make"
            name="product-make"
            value={props.filters.make || ""}
            onChange={(e) => onSelectboxChange(e)}
            onKeyPress={
              props.onKeyPress
                ? (e) => props.onKeyPress(e)
                : (e) => onSelectboxChange(e)
            }
          >
            <option value="" className="data-fr" data-fr="Rechercher tout">
              {outputEnFr("Search All", "Rechercher tout", props.lang)}
            </option>
            <option value="Caterpillar">Caterpillar</option>
            <option value="other">
              {outputEnFr("Other", "Autre", props.lang)}
            </option>
          </select>
        </>
      )}
    </>
  );
};
SelectManufacturer.whyDidYouRender = true;
export default SelectManufacturer;
