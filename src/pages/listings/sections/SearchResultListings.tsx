import React from "react";
import ReactPlaceholder from 'react-placeholder';
import {
  saferString,
  badCityCheck,
  formatHours,
  formatPrice,
  handleImageLoadError,
  getProductPhotoSrc,
  outputEnFr, 
} from "../../common/HelperFunctions";
import NoResultsFoundMsg from "../components/NoResultsFoundMsg";
import * as Types from "../../common/Types";
import LazyLoad from "react-lazyload";
import {
  getDetailPageUrlFromSerial,
  slug,
} from "../../common/SEO/SeoFunctions";
import { Link } from "react-router-dom";
import shoppingCart, {
  getCartDataAttribute,
} from "../../../js_vanilla/used-favouriteAddon";
import NoResultsFamEmptyMsg from "../components/NoResultsFamEmptyMsg";
import { isEnvironmentBFE, isEnvironmentBFERENTAL, isEnvironmentBFE_or_BFERENTAL, isEnvironmentJOBSITE, ITEMSPERPAGE, TEXT } from "../../common/Constants";


type Props_SearchResultListings = {
  lang: string;
  results;
  pagingState: Types.pagingState;
  onClearFilters;
  filters: Types.searchFilters;
  famDataCount;
};
export default class SearchResultListings extends React.PureComponent<
  Props_SearchResultListings
> {
  loadListings() {
    let countCurPg = 0;
    return (
      //only iterates through current page
      this.props.results
        .slice(
          this.props.pagingState.startAtItem - 1,
          this.props.pagingState.endAtItem
        )
        .map((curProduct: Types.Type_jsonModelDetails) => {
          countCurPg++;

          var hreflink = getDetailPageUrlFromSerial(
            this.props.lang,
            slug(
              curProduct["product-family-categories"].category["category-code"]
            ),
            isEnvironmentBFE ? curProduct["serial-number"] : curProduct["id"],
            this.props.filters.viewDeals ? false : true,
            this.props.filters,
            this.props.pagingState.curPage
          );

          let linkTitle = "";
          let curPrice =  TEXT(this.props.lang).callForPrice;
          if (curProduct.price != null && Number(curProduct.price.text) > 0) {
            curPrice = formatPrice(
              curProduct.price.text,
              this.props.lang,
              true
            );
          }

          // If current price is equal to USD, make the Canadian price appear instead.
          if (isEnvironmentBFE_or_BFERENTAL) {
            if (curProduct.price != null && curProduct.price?.currency !== "CAD"  && Number(curProduct.price?.text) > 0) {
              curPrice = formatPrice(
                parseInt(curProduct.price?.text!) / 0.74,
                this.props.lang,
                true
              );
            }
          }

          let certifiedBadge, gridFixSmMd, gridFixLg;

          //certified badge
          if (curProduct["certification"] != null) {
            if (
              curProduct["certification"] !== "None" &&
              curProduct["certification"] !== "Aucune"
            ) {
              certifiedBadge = (
                <div className="premium-badge">
                  <span
                    className="glyphicon glyphicon-check"
                    aria-hidden="true"
                  ></span>{" "}
                  {curProduct["certification"]}
                </div>
              );
            }
          }

          //alt tag
          const imgAltTag =
            saferString(curProduct.year, "") +
            " " +
            saferString(curProduct.manufacturer, "") +
            " " +
            saferString(curProduct.model, "");

          //grid fix
          //4 columns on lg layout - grid fix
          if (countCurPg % 4 === 0) {
            gridFixLg = <div className="clearfix  visible-lg-block"></div>; //append to array since could be both
          }
          //3 columns on sm+md layout - grid fix
          if (countCurPg % 3 === 0) {
            gridFixSmMd = (
              <div className="clearfix visible-md-block visible-sm-block"></div>
            ); //append to array since could be both
          }

          //photo
          const machineImage = (
            <img
              className="prod-img-cover"
              src={getProductPhotoSrc(curProduct, 0)}
              onError={(e) => handleImageLoadError(e)}
              alt={imgAltTag}
            />
          );

          let btnClass;
          let btnAriaLabel;

          if (
            typeof shoppingCart !== "undefined" &&
            shoppingCart.isItemInCart(
              curProduct.year,
              curProduct.manufacturer,
              curProduct.model,
              curProduct["serial-number"]
            )
          ) {
            //already in cart
            btnClass = "favestar delete-item";
            btnAriaLabel = outputEnFr(
              "Remove from favourites",
              "Supprimer de la liste des favoris",
              this.props.lang
            );
          } else {
            //not in cart
            btnClass = "favestar add-to-cart";
            btnAriaLabel = outputEnFr(
              "Add to favourites",
              "Ajouter aux favoris",
              this.props.lang
            );
          }

          //star
          const dataName = getCartDataAttribute(
            curProduct.year,
            curProduct.manufacturer,
            curProduct.model,
            curProduct["serial-number"]
          );

          const toggleFaveStar = (
            <button
              className={btnClass}
              data-url={hreflink}
              data-pic={getProductPhotoSrc(curProduct, 0)}
              data-hours={curProduct.hours}
              data-serial={curProduct["serial-number"]}
              data-name={dataName}
              data-price={curPrice}
              aria-label={btnAriaLabel}
            >
              <i className="fa fa-star" aria-hidden="true"></i>
            </button>
          );

          const modelYear = curProduct.year || "";

          return (
            <span
              key={countCurPg + "-" + curProduct["stock-number"]}
              data-count={countCurPg}
            >
              <div className="productwrap col-xs-12 col-sm-4 col-md-4 col-lg-3">
                <Link
                  title={linkTitle}
                  to={hreflink}
                  className="product-wrapper"
                >
                  <div className="product-image">
                    <LazyLoad
                      height={180}
                      offset={100}
                      key={countCurPg + "-" + curProduct["stock-number"]}
                    >
                      {machineImage}
                    </LazyLoad>
                  </div>
                  {certifiedBadge}
                  <div className="product-info-column">
                    <h5 className="product-name">
                      {modelYear + " " + curProduct.manufacturer}
                      <span className="model">{curProduct.model}</span>
                    </h5>
                    <p>
                      {this.props.lang === "en"
                        ? "Location: "
                        : "Emplacement: "}
                      {badCityCheck(curProduct.city)}, {curProduct.state}
                    </p>
                    <p className="hr">
                      {this.props.lang === "en" ? "Hours: " : "Heures: "}{" "}
                      {formatHours(curProduct.hours, this.props.lang)}
                    </p>
                    <p className="stocknum">
                      {curProduct["stock-number"]
                        ? "#" + curProduct["stock-number"]
                        : null}
                    </p>
                  </div>
                  {isEnvironmentBFERENTAL || isEnvironmentJOBSITE ? (
                    <p className={curProduct.availability === 'Yes' ? 'green' : 'red'}>
                      {curProduct.availability === 'Yes' ? this.props.lang === "en" ? "Available" : "Disponible" : this.props.lang === "en" ? "Not Available" : "Pas disponible"}
                      </p>
                  ) : (
                    ""
                  )}
                  <div className="product-price">
                    <p>{curPrice}</p>
                  </div>
                </Link>
                {toggleFaveStar}
              </div>
              {gridFixSmMd} {gridFixLg}
            </span>
          );
        })
    );
  } 

  showPlaceholders(){
    let items:Object[] = [];
    for (let i = 0; i < ITEMSPERPAGE; i++) {//show # of placeholders
    items.push( 
      <div className="productwrap col-xs-12 col-sm-4 col-md-4 col-lg-3 placeholder" key={i}>
        <div className="product-wrapper">
        <div className="product-image" >
        <ReactPlaceholder style={{height:"180px"}} type='rect'  ready={false} showLoadingAnimation={true}>
        </ReactPlaceholder>  
        </div>
        <div className="product-info-column" >
        <ReactPlaceholder  type='text' rows={6}  ready={false} showLoadingAnimation={true}>
        </ReactPlaceholder>
        </div>
        </div> 
        </div>
    )
    }
    return items;
  }

  render() {
    console.log("Render SearchResultListings", this.props);
    if (this.props.results && this.props.results.length > 0) {
        return this.loadListings();
    } else if (this.props.famDataCount > 0) {
      //category has listings but search filters are too narrow
      return (
        <NoResultsFoundMsg
          lang={this.props.lang}
          onClearFilters={this.props.onClearFilters}
        />
      );
    } else if (
      this.props.famDataCount !== null &&
      this.props.famDataCount === 0
    ) {
      //json loaded but selected category (famData) is empty
      return <NoResultsFamEmptyMsg lang={this.props.lang} />;
    } else {
      //famData doesnt exist - still loading json 
        return  this.showPlaceholders();
         
       
    }
  }
}
