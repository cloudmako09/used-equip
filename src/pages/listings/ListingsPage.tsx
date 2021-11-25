import React from "react";
import { Helmet } from "react-helmet";
import ListingHeader from "./sections/ListingHeader";
import {
  setBodyClass,
  getSearchFiltersFromUrl,
  outputEnFr,
} from "../common/HelperFunctions";
import * as Types from "../common/Types";
import * as Constants from "../common/Constants";
import { setUpPaging, getBodyClassNames } from "./functions/listingFunctions";
import Pagination from "react-js-pagination";
import getAllProductsFromCategory from "./functions/getAllProductsFromCategory";
import getFilteredSearchResults from "./functions/getFilteredSearchResults";
import CTASection from "../common/Sections/CTASection";
import {
  getNewUrlFromFilters,
  getMetaTitle,
  getSeoContentByCatCode,
  getListingPageUrl,
} from "../common/SEO/SeoFunctions";
import { withRouter } from "react-router-dom";
import SeoTextBottom from "./sections/SeoTextBottom";
import "../../css/listingcss.scss";
import "rc-slider/assets/index.css";
import FiltersTop from "./sections/FiltersTop";
import FiltersSide from "./sections/FiltersSide";
import _ from "lodash";
const SearchResultListings = React.lazy(
  () => import("./sections/SearchResultListings")
);

type Props_Listings = {
  lang: string;
  catCodeFromUrl: string;
  currentCatClass;
  handleUpdateCatClass;
  jsonDataGroups;
  urlParams: string[];
  history?; //from withRouter
};
type State_Listings = {
  searchFilters: Types.searchFilters; //object of user selected search filters
  famData; //contains all products in current category, not affected by search filters
  searchResults; //contains search filtered list of products, what user sees
  paging: Types.pagingState; //paging state, altered when user changes page
  filtersOpenMobile: boolean; //advanced filter dropdown, hidden by default on mobile
  isUserTyping: boolean;
};

class ListingsPage extends React.PureComponent<Props_Listings, State_Listings> {
  constructor(props) {
    super(props);
    console.log("Construct ListingsPage ", props);
    window.scrollTo(0, 0);

    const defaultSearchFilters = getSearchFiltersFromUrl(
      props.currentCatClass,
      props.catCodeFromUrl,
      props.urlParams
    );

    let famData;
    let searchResults;
    if (this.props.jsonDataGroups) {
      famData = getAllProductsFromCategory(
        defaultSearchFilters,
        this.props.jsonDataGroups
      );

      if (famData.length > 0) {
        searchResults = getFilteredSearchResults(defaultSearchFilters, famData);
      }
    }
    const initialState: State_Listings = {
      searchResults: searchResults,
      searchFilters: defaultSearchFilters,
      famData: famData,
      filtersOpenMobile: false,
      paging: setUpPaging(1, searchResults ? searchResults.length : 0),
      isUserTyping: false,
    };
    console.log("ListingsPage setting state in constructor", initialState);
    //set initial state
    this.state = initialState;

    //console.log("Setting canonical url "+getCanonicalUrlListingPg(this.props.lang, props.catCodeFromUrl) );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.jsonDataGroups && this.props !== prevProps) {
      console.log("ListingsPage componentDidUpdate()", this.props, prevProps);
      let searchFilters = this.state.searchFilters;
      let currentPage = 1;
      if (prevProps.urlParams !== this.props.urlParams) {
        searchFilters = getSearchFiltersFromUrl(
          this.props.currentCatClass,
          this.props.catCodeFromUrl,
          this.props.urlParams
        );
      }
      if (typeof this.props.urlParams[Constants.PARAMS.PAGE] !== "undefined") {
        currentPage = this.props.urlParams[Constants.PARAMS.PAGE];
      }
      if (
        !_.isEqual(searchFilters, this.state.searchFilters) ||
        currentPage !== this.state.paging.curPage ||
        this.props.jsonDataGroups !== prevProps.jsonDataGroups
      ) {
        //SOMETHING HAS CHANGED, UPDATE STATE
        const famData = getAllProductsFromCategory(
          searchFilters,
          this.props.jsonDataGroups
        );
        const searchResults = getFilteredSearchResults(searchFilters, famData);
        const newState: State_Listings = {
          ...this.state,
          searchFilters: searchFilters,
          famData: famData,
          searchResults: searchResults,
          paging: setUpPaging(currentPage, searchResults.length),
        };
        console.log(
          "ListingsPage setting new state from componentDidUpdate:",
          newState,
          prevState
        );
        this.setState(newState);
      }
    }

    if (
      !this.state.isUserTyping &&
      prevState.isUserTyping &&
      prevState.searchFilters === this.state.searchFilters
    ) {
      console.log(
        "Done typing, update url now",
        this.state.searchFilters.keyword
      );
      this.pushUpdatedUrl(this.state.searchFilters, this.state.paging.curPage);
    }
  }

  getMetaDescTag = (catCode: string) => {
    const seoText: Types.types_seoData = getSeoContentByCatCode(catCode);
    const metaText =
      this.props.lang === "fr" ? seoText.FR.Meta : seoText.EN.Meta;
    return metaText;
  };
  getMetaTitleTag = (catCode: string | null) => {
    let categoryName = this.getCategoryDisplayName(catCode);
    if (Constants.isEnvironmentBFERENTAL) {
      let categoryName = "Rental Fleet Sell-Off";
      return getMetaTitle(
        categoryName,
        this.props.lang,
        this.state.searchFilters
      );
    } else {
      return getMetaTitle(
        categoryName,
        this.props.lang,
        this.state.searchFilters
      );
    }
  };
  getCategoryDisplayName = (catCode: string | null) => {
    const seoText: Types.types_seoData = getSeoContentByCatCode(catCode);
    const categoryName =
      this.props.lang === "fr" ? seoText.FR.Name : seoText.EN.Name;
    return categoryName;
  };
  getCtaImageSrc = (catCode: string | null) => {
    const seoText: Types.types_seoData = getSeoContentByCatCode(catCode);
    return seoText.CtaImage;
  };

  handleSearchFilterChange = (updatedSearchFilters: Types.searchFilters) => {
    console.log("handleSearchFilterChange()", updatedSearchFilters);

    let setPageTo = this.state.paging.curPage;
    if (updatedSearchFilters.category !== this.state.searchFilters.category) {
      //category has been changed
      setPageTo = 1;
    }

    const famData = getAllProductsFromCategory(
      updatedSearchFilters,
      this.props.jsonDataGroups
    );
    console.log("Search filter change, famData now:", famData);
    const searchResults = getFilteredSearchResults(
      updatedSearchFilters,
      famData
    );
    console.log("Search filter change, searchResults now:", searchResults);
    if (
      updatedSearchFilters.keyword !== this.state.searchFilters.keyword ||
      updatedSearchFilters.yearMax !== this.state.searchFilters.yearMax ||
      updatedSearchFilters.yearMin !== this.state.searchFilters.yearMin ||
      updatedSearchFilters.hoursMax !== this.state.searchFilters.hoursMax ||
      updatedSearchFilters.maxPrice !== this.state.searchFilters.maxPrice
    ) {
      //typed inputs only - adds delay before updating URL
      this.setUserIsTyping();
    } else {
      //update URL right away
      this.pushUpdatedUrl(updatedSearchFilters, setPageTo);
    }

    const newState = {
      ...this.state,
      famData: famData,
      searchResults: searchResults,
      searchFilters: updatedSearchFilters,
      paging: setUpPaging(setPageTo, searchResults.length),
      isUserTyping: true,
    };

    console.log("Search filter change, newState now:", newState);

    this.setState(newState);
  };

  pushUpdatedUrl(updatedSearchFilters: Types.searchFilters, setPageTo: number) {
    const newUrl = getNewUrlFromFilters(
      this.props.lang,
      updatedSearchFilters,
      setPageTo
    );
    const history = this.props.history;

    const newMetaTitle = this.getMetaTitleTag(updatedSearchFilters.category);
    document.title = newMetaTitle; //need to update before history push for GTM
    console.log("Pushing newUrl", newUrl);
    history.push(newUrl);
  }

  //typing timer for updating url after X seconds
  typingTimer;
  setUserIsTyping = () => {
    const urlUpdateDelay = 2000; //ms
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(this.doneTyping, urlUpdateDelay);
  };
  doneTyping = () => {
    if (this.state.isUserTyping) {
      this.setState({ ...this.state, isUserTyping: false });
    }
  };

  handlePageChange = (setToPage) => {
    this.pushUpdatedUrl(this.state.searchFilters, setToPage);
    this.setState({
      ...this.state,
      paging: setUpPaging(setToPage, this.state.searchResults.length),
    });
  };

  handleClearSearchFilters = () => {
    const resetSearchFilters: Types.searchFilters = {
      ...this.state.searchFilters,
      category: null,
      make: null,
      maxPrice: null,
      keyword: "",
      province: null,
      yearMin: null,
      yearMax: null,
      hoursMax: null,
      city: null,
      certifiedOnly: false,
    };
    console.log("Clear filters now", resetSearchFilters);
    this.handleSearchFilterChange(resetSearchFilters);
  };

  toggleFiltersOpenMobile = () => {
    this.setState({
      ...this.state,
      filtersOpenMobile: !this.state.filtersOpenMobile,
    });
  };

  getCanonicalUrl = () => {
    let canonicalUrl =
      Constants.DOMAINBASE +
      getListingPageUrl(
        this.props.lang,
        this.state.searchFilters.category,
        false
      );
    if (
      this.props.currentCatClass === Constants.CLASS_POWER &&
      this.props.catCodeFromUrl !== Constants.URLPOWER_SLUG
    ) {
      canonicalUrl +=
        "?class=" +
        outputEnFr(
          Constants.URLPOWER_EN,
          Constants.URLPOWER_FR,
          this.props.lang
        );
    }
    return canonicalUrl;
  };

  render() {
    setBodyClass(getBodyClassNames(this.state.searchFilters));
    return (
      <>
        <Helmet>
          <meta
            name="description"
            content={this.getMetaDescTag(this.props.catCodeFromUrl)}
          />
          <title>{this.getMetaTitleTag(this.props.catCodeFromUrl)}</title>
          <link rel="canonical" href={this.getCanonicalUrl()} />
          {this.state.searchFilters.viewFaves ? (
            <meta name="robots" content="noindex, nofollow" />
          ) : null}
        </Helmet>
        {/* {this.state.searchFilters.viewDeals ? (
          <a href="#form">
            <img
              style={{ width: "100%", marginBottom: "10px" }}
              src={
                this.props.lang === "fr"
                  ? getImage("dealspage/Banner_used_FR.jpg")
                  : getImage("dealspage/Banner_used_EN.jpg")
              }
              alt=""
            />
          </a>
        ) : (
          <></>
        )} */}
        <ListingHeader
          lang={this.props.lang}
          currentCatClass={this.state.searchFilters.categoryClass}
          //seoData={getSeoContentByCatCode(this.state.searchFilters.category)}
          category={this.state.searchFilters.category}
        />
        {/* <Suspense fallback={<></>}> */}
        <div id="mainListingSection" className="container">
          <div className="nav-families-left col-xs-12 col-sm-12 col-md-3 col-md-offset-0 col-lg-2 col-lg-offset-0">
            <FiltersSide
              lang={this.props.lang}
              filters={this.state.searchFilters}
              famData={this.state.famData}
              searchResults={this.state.searchResults}
              jsonDataGroups={this.props.jsonDataGroups}
              handleUpdateCatClass={this.props.handleUpdateCatClass}
              onSearchFilterChange={this.handleSearchFilterChange}
              onClearFilters={this.handleClearSearchFilters}
              filtersOpenMobile={this.state.filtersOpenMobile}
              toggleFiltersOpenMobile={this.toggleFiltersOpenMobile}
            />
          </div>
          <div
            id="mainContent"
            className="col-xs-12 col-sm-12 col-md-9 col-lg-10"
            style={
              this.state.searchFilters.viewDeals ||
              this.state.searchFilters.viewFaves
                ? { width: "100%", padding: "0 0 30px 0" }
                : {}
            }
          >
            <FiltersTop
              lang={this.props.lang}
              filters={this.state.searchFilters}
              pagingState={this.state.paging}
              onPageChange={this.handlePageChange}
              onSearchFilterChange={this.handleSearchFilterChange}
            />

            <div className="search-results-cont" id="src-he">
              <div className="results-hdr">
                <div className="listing-details-right nopad">
                  <div className="list-cont">
                    <div className="list-cont-outer" id="mosaic">
                      <div className="list-cont-inner row">
                        {/* <Suspense
                          fallback={
                            <div
                              id="loading-graphic"
                              style={{ marginTop: "50px" }}
                            >
                              <img
                                src={Constants.IMAGES.LOADING_GIF}
                                alt="Loading"
                              />
                            </div>
                          }
                        > */}
                        <SearchResultListings
                          lang={this.props.lang}
                          results={this.state.searchResults}
                          pagingState={this.state.paging}
                          onClearFilters={this.handleClearSearchFilters}
                          filters={this.state.searchFilters}
                          famDataCount={
                            this.state.famData
                              ? this.state.famData.length
                              : null
                          }
                        />
                        {/* </Suspense> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="list-pages-lower" className="col-xs-12">
              <div
                className="list-pages light-theme simple-pagination"
                style={
                  this.state.paging.numPages <= 1 ? { display: "none" } : {}
                }
              >
                <Pagination
                  activePage={this.state.paging.curPage}
                  itemsCountPerPage={Constants.ITEMSPERPAGE}
                  totalItemsCount={this.state.paging.totalItems}
                  pageRangeDisplayed={3}
                  onChange={(e) => this.handlePageChange(e)}
                  hideFirstLastPages={true}
                  innerClass="ul-pagination"
                  previousLabel="test"
                />
              </div>
            </div>
          </div>
        </div>
        {/* </Suspense> */}
        <SeoTextBottom
          lang={this.props.lang}
          category={this.state.searchFilters.category}
        />
        <CTASection
          lang={this.props.lang}
          curCategory={this.state.searchFilters.category}
          categoryClass={this.props.currentCatClass}
          viewDeals={this.state.searchFilters.viewDeals || false}
          ctaImage={this.getCtaImageSrc(this.state.searchFilters.category)}
          ctaImageAltText={this.getMetaTitleTag(this.props.catCodeFromUrl)}
        />
      </>
    );
  }
}
export default withRouter(ListingsPage);
