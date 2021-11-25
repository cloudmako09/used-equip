import React from "react";
import { outputEnFr } from "../../common/HelperFunctions";
import { searchFilters } from "../../common/Types";

type Props_MainSearch = {
  lang: string;
  filters: searchFilters;
  onSearchFilterChange;
  disabled: boolean;
  handleKeyPressSubmitSearch;
  handleSubmitSearch;
};

const MainSearch = (props: Props_MainSearch) => {
  const onKeywordSearch = (e) => {
    const newKeywords = e.target.value;

    const updatedSearchFilters: searchFilters = {
      ...props.filters,
      keyword: newKeywords,
    };

    props.onSearchFilterChange(updatedSearchFilters);
  };

  return (
    <div id="homesearchwrap" className="row">
      <div
        id="mainsearchinputwrap"
        className="col-xs-12 col-sm-12 col-md-10 col-md-offset-1"
      >
        <label id="main-search">
          <input
            id="home-mainsearch"
            className="product-keyword"
            aria-label="main search"
            name="query"
            type="text"
            value={props.filters.keyword || ""}
            onChange={(e) => onKeywordSearch(e)}
            onKeyPress={(e) => props.handleKeyPressSubmitSearch(e)}
            placeholder={outputEnFr(
              "Search by model, serial number, product family…",
              "Recherche par modèle, numéro de série, famille de produits…",
              props.lang
            )}
          />
        </label>
        <button
          type="submit"
          tabIndex={0}
          className="find-btn hidden-xs"
          title={outputEnFr("Search", "Rechercher", props.lang)}
          disabled={props.disabled}
          onClick={() => props.handleSubmitSearch()}
        >
          <i className="fa fa-search"></i>
        </button>
      </div>
      <div className="hidden-xs hidden-sm col-md-1">&nbsp;</div>
    </div>
  );
};
MainSearch.whyDidYouRender = true;
export default MainSearch;
