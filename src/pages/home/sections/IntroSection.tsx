import React from "react";
import { outputEnFr } from "../../common/HelperFunctions";
import AdvancedFilters from "../components/AdvancedFilters";
import MainSearch from "../components/MainSearch";
import * as Types from "../../common/Types";
import * as Constants from "../../common/Constants";
import getFilteredSearchResults from "../../listings/functions/getFilteredSearchResults";
import getAllProductsFromCategory from "../../listings/functions/getAllProductsFromCategory";
import IntroText from "../components/IntroText";
import FoundCountText from "../components/FoundCountText";
import { getListingPageUrl } from "../../common/SEO/SeoFunctions";
import { withRouter } from "react-router-dom";

type Props_IntroSection = {
  lang: string;
  jsonDataGroups;
  history?; //from withRouter
};
type State_IntroSection = {
  filtersOpen: boolean;
  allData;
  searchFilters: Types.searchFilters;
  searchResults;
};

class IntroSection extends React.PureComponent<
  Props_IntroSection,
  State_IntroSection
> {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: null,
      allData: null,
      searchFilters: Constants.searchFiltersEmptyDefault,
      filtersOpen: false,
    };
  }

  componentDidMount() {
    this.initializeSearchResults();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.initializeSearchResults();
    }
  }

  initializeSearchResults = () => {
    if (this.props.jsonDataGroups) {
      const allDataGrouped = getAllProductsFromCategory(
        this.state.searchFilters,
        this.props.jsonDataGroups
      );
      const searchResults = getFilteredSearchResults(
        this.state.searchFilters,
        allDataGrouped
      );
      console.log("initializeSearchResults()");
      this.setState({
        ...this.state,
        allData: allDataGrouped,
        searchResults: searchResults,
      });
    }
  };

  toggleFiltersExpand = () => {
    console.log("toggleFiltersExpand()");
    this.setState({
      ...this.state,
      filtersOpen: !this.state.filtersOpen,
    });
  };

  handleKeyPressSubmitSearch = (e) => {
    if (e.which === 13) {
      //enter button
      this.handleSubmitSearch();
    }
  };

  handleSubmitSearch = () => {
    const listingUrl = getListingPageUrl(
      this.props.lang,
      null,
      true,
      this.state.searchFilters
    );
    this.props.history.push(listingUrl);
  };

  handleSearchFilterChange = (updatedSearchFilters: Types.searchFilters) => {
    const searchResults = getFilteredSearchResults(
      updatedSearchFilters,
      this.state.allData
    );

    this.setState({
      ...this.state,
      searchResults: searchResults,
      searchFilters: updatedSearchFilters,
    });
  };

  render() {
    return (
      <div className="headerbgcolor">
        <div id="home-introsectionwrap">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div id="main"></div>
                <IntroText lang={this.props.lang} />
                <MainSearch
                  lang={this.props.lang}
                  filters={this.state.searchFilters}
                  onSearchFilterChange={this.handleSearchFilterChange}
                  disabled={
                    this.props.jsonDataGroups &&
                    (!this.state.searchResults ||
                      this.state.searchResults.length === 0)
                  }
                  handleKeyPressSubmitSearch={this.handleKeyPressSubmitSearch}
                  handleSubmitSearch={this.handleSubmitSearch}
                />
              </div>
              <div
                id="filtersWrap"
                className="col-xs-12 col-md-10 col-md-offset-1"
              >
                <AdvancedFilters
                  lang={this.props.lang}
                  filters={this.state.searchFilters}
                  open={this.state.filtersOpen}
                  handleKeyPressSubmitSearch={this.handleKeyPressSubmitSearch}
                  onSearchFilterChange={this.handleSearchFilterChange}
                />

                {/*advanced filter button and prod count*/}
                <div className="row">
                  <div className="col-xs-6 col-sm-4 text-left">
                    <p
                      className="morefilterslink"
                      onClick={() => this.toggleFiltersExpand()}
                    >
                      {this.state.filtersOpen ? (
                        <i className="fa fa-minus"></i>
                      ) : (
                        <i className="fa fa-plus"></i>
                      )}
                      &nbsp;&nbsp;
                      <span>
                        {this.state.filtersOpen
                          ? outputEnFr(
                              "Hide advanced filters",
                              "Masquer les filtres de recherches avancés",
                              this.props.lang
                            )
                          : outputEnFr(
                              "Advanced filters",
                              "Filtres de recherche avancés",
                              this.props.lang
                            )}
                      </span>
                    </p>
                  </div>
                  <div className="col-xs-6 col-sm-8 text-right">
                    {/*products found count*/}
                    <FoundCountText
                      lang={this.props.lang}
                      count={
                        this.state.searchResults
                          ? this.state.searchResults.length
                          : -1
                      }
                    />
                  </div>
                </div>
                {/*mobile only button*/}
                <button
                  type="submit"
                  tabIndex={0}
                  onClick={() => this.handleSubmitSearch()}
                  disabled={
                    !this.state.searchResults ||
                    this.state.searchResults.length === 0
                  }
                  className="find-btn visible-xs hidden-sm hidden-md hidden-lg"
                >
                  <i className="fa fa-search"></i> &nbsp;
                  <span>
                    {outputEnFr("Search", "Rechercher", this.props.lang)}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(IntroSection);
