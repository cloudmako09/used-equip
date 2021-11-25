import React from "react";
import * as Types from "../../common/Types";
import { outputEnFr } from "../../common/HelperFunctions";

type props_InputKeywordSearch = {
  lang: string;
  filters: Types.searchFilters;
  onSearchFilterChange;
};

const InputKeywordSearch = (props: props_InputKeywordSearch) => {
  const onKeywordSearch = (e) => {
    const newKeywords = e.target.value;

    const updatedSearchFilters: Types.searchFilters = {
      ...props.filters,
      keyword: newKeywords,
    };

    props.onSearchFilterChange(updatedSearchFilters);
  };

  return (
    <>
      <div className="input-group">
        <span className="input-group-addon">
          <i className="fa fa-search"></i>
        </span>
        <label id="product-keyword">
          <input
            id="product-keyword-desktop"
            className="search product-keyword form-control"
            name="product-keyword"
            type="search"
            arial-label="product keyword search"
            value={props.filters.keyword || ""}
            placeholder={outputEnFr(
              "Filter listings by keyword(s)",
              "Filtrer les résultats par mots-clés",
              props.lang
            )}
            onChange={(e) => onKeywordSearch(e)}
          />
        </label>
      </div>
    </>
  );
};
InputKeywordSearch.whyDidYouRender = true;
export default InputKeywordSearch;
