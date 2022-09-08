import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  outputEnFr,
  getProductPhotoSrc,
  formatHours,
  badCityCheck,
  formatPrice,
  getSearchFiltersFromUrl,
  handleImageLoadError,
  getProductName,
  getDealerName,
} from "../../common/HelperFunctions";
import { getListingPageUrl, getMetaTitle } from "../../common/SEO/SeoFunctions";
import * as Constants from "../../common/Constants";
import { Link } from "react-router-dom";
import { Type_jsonModelDetails } from "../../common/Types";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app

type Type_detailsHtml = {
  backhreflink;
  machineName;
  dealerId;
  breadcrumbs;
  productLocation;
  itemPriceCA;
  itemPriceUS;
  imageGalleryThumbs;
  visibility: {
    certification: boolean;
  };
  comments;
};
type Props_MachineImagesAndInfo = {
  lang: string;
  catCodeFromUrl: string;
  currentCatClass: string;
  jsonDataProduct: Type_jsonModelDetails | undefined;
  urlParams: string[];
};

const MachineImagesAndInfo = (props: Props_MachineImagesAndInfo) => {
  console.log("Render MachineImagesAndInfo", props);
  const [state_photoIndex, setState_photoIndex] = useState<number>(0);
  const [state_photoOpen, setState_photoOpen] = useState<boolean>(false);

  let metaTitle;

  if (props.jsonDataProduct == null) {
    return <></>;
  }

  console.log("test json data product", props.jsonDataProduct);

  let detailsHtml: Type_detailsHtml = {
    backhreflink: null,
    machineName: null,
    dealerId: null,
    breadcrumbs: null,
    productLocation: null,
    itemPriceCA: Constants.TEXT(props.lang).callForPrice,
    itemPriceUS: Constants.TEXT(props.lang).callForPrice,
    comments: null,
    imageGalleryThumbs: <></>,
    visibility: {
      certification: false,
    },
  };

  function openPhoto(index: number) {
    setState_photoOpen(true);
    setState_photoIndex(index);
  }

  //PHOTOS ARRAY
  let images: string[] = [];
  if (
    typeof props.jsonDataProduct.photos != "undefined" &&
    typeof props.jsonDataProduct.photos[0] != "undefined" &&
    props.jsonDataProduct.photos[0].text
  ) {
    images = props.jsonDataProduct.photos.map((photo, x) => {
      //skips index 0 with slice(1)
      return photo.text.replace("http://", "//");
    });
  }

  //GET SEARCH FILTERS FROM URL PARAMS
  const searchFiltersFromUrl = getSearchFiltersFromUrl(
    props.currentCatClass,
    props.catCodeFromUrl,
    props.urlParams
  );

  const currentPage = props.urlParams[Constants.PARAMS.PAGE] || 1;
  //GO BACK LINK
  detailsHtml.backhreflink = getListingPageUrl(
    props.lang,
    props.catCodeFromUrl,
    true,
    searchFiltersFromUrl,
    currentPage
  );
  //MACHINE NAME
  detailsHtml.machineName = getProductName(props.jsonDataProduct);
  console.log("test machine name", detailsHtml.machineName);
  detailsHtml.dealerId = getDealerName(props.jsonDataProduct);
  console.log("test dealer name", detailsHtml.dealerId);

  if (
    props.jsonDataProduct["product-family-categories"] &&
    props.jsonDataProduct["product-family-categories"].category
  ) {
    const listingPageUrl = getListingPageUrl(
      props.lang,
      props.jsonDataProduct["product-family-categories"].category[
        "category-code"
      ],
      false
    );

    //BREADCRUMBS
    detailsHtml.breadcrumbs = (
      <>
        <Link to={listingPageUrl}>
          {
            props.jsonDataProduct["product-family-categories"].category[
              "category-display-name"
            ]
          }
        </Link>{" "}
        &nbsp; <i className="fa fa-angle-right"></i> &nbsp;{" "}
        {props.jsonDataProduct.model}
      </>
    );

    //META TITLE
    metaTitle = getMetaTitle(
      detailsHtml.machineName +
        " | " +
        props.jsonDataProduct["product-family-categories"].category[
          "category-display-name"
        ],
      props.lang,
      searchFiltersFromUrl
    ); //set meta title
  } else {
    //META TITLE
    metaTitle = getMetaTitle(
      detailsHtml.machineName,
      props.lang,
      searchFiltersFromUrl
    ); //TODO: set document title
  }
  //$("form input[name=modelname]").val(machineName);//TODO: add model to form

  //PRICE
  if (
    props.jsonDataProduct.price != null &&
    props.jsonDataProduct.price.text != null
  ) {
    detailsHtml.itemPriceCA = formatPrice(
      props.jsonDataProduct.price.text,
      props.lang,
      false,
      "CAD", // expected currency
      props.jsonDataProduct.price?.currency // receiving currency
      // props.jsonDataProduct["dealer-name"]
    );
    detailsHtml.itemPriceUS = formatPrice(
      props.jsonDataProduct.price.text,
      props.lang,
      false,
      "USD", // expected currency
      props.jsonDataProduct.price?.currency // receiving currency
      // props.jsonDataProduct["dealer-name"]
    );
  }

  //LOCATION
  detailsHtml.productLocation =
    badCityCheck(props.jsonDataProduct["city"]) +
    ", " +
    props.jsonDataProduct["state"];

  //CERTIFICATION
  if (
    props.jsonDataProduct["certification"] != null &&
    props.jsonDataProduct["certification"] !== "None" &&
    props.jsonDataProduct["certification"] !== "Aucune"
  ) {
    detailsHtml.visibility.certification = true;
  }
  //COMMENTS
  // if (props.jsonDataProduct.comments != null && props.jsonDataProduct.comments !== "") {
  //   detailsHtml.visibility.comments=true;
  // }

  //IMAGE GALLERY

  detailsHtml.imageGalleryThumbs = images.slice(1).map((photo, x) => {
    //skips index 0 with slice(1)
    return (
      <img
        className="equip-img-thumbnail"
        key={x}
        src={photo}
        onClick={() => openPhoto(x + 1)}
        onError={(e) => handleImageLoadError(e)}
        alt={detailsHtml.machineName}
      />
    );
  });

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
      </Helmet>
      <div id="main"></div>
      <div className="breadcrumbs data_breadcrumbs">
        {detailsHtml.breadcrumbs}
      </div>
      <p className="data_familyname">
        {props.jsonDataProduct["product-family-display-name"]}
      </p>
      <h1 id="prod-title" className="data_name">
        {detailsHtml.machineName}
      </h1>

      <h2>
        <Link className="backtolink" to={detailsHtml.backhreflink}>
          &laquo;{" "}
          {outputEnFr(
            "Back to search results",
            "Retour aux résultats de recherche",
            props.lang
          )}
        </Link>
      </h2>
      <div className="row">
        <div id="col-imgs" className="col-sm-6 col-md-6 col-lg-6">
          <div id="prod-imgs">
            <div id="main-prod-img" className="data_img">
              <img
                onClick={() => openPhoto(0)}
                src={getProductPhotoSrc(props.jsonDataProduct, 0)}
                width="230"
                alt={detailsHtml.machineName}
                onError={(e) => handleImageLoadError(e)}
              />
            </div>
            <div id="galleryThumbnails" className="data_gallery_thumbs">
              {detailsHtml.imageGalleryThumbs}
            </div>
            <br />
            <br />
            <div className="addthis_inline_share_toolbox"></div>
          </div>
        </div>
        <div id="col-info" className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div id="price-block">
            <div className="price-wrap">
              <img
                className="flagimg"
                src={Constants.IMAGES.FLAG_CA}
                alt="CDN $"
              />
              {/* {detailsHtml.dealerId === "BATTLEFIELD EQUIPMENT RENTALS"
                ? "here is the battlefield price"
                : "here is the cat financial dealer price"} */}
              <span className="data_price_cad">{detailsHtml.itemPriceCA}</span>
            </div>
            {
              /*Show US price on BFE sites*/
              Constants.isEnvironmentBFE_or_BFERENTAL && (
                <div className="price-wrap">
                  <img
                    className="flagimg"
                    src={Constants.IMAGES.FLAG_US}
                    alt="US $"
                  />
                  <span className="data_price_usd">
                    {detailsHtml.itemPriceUS}
                  </span>
                </div>
              )
            }
            {
              /*Show US price on Jobsite*/
              Constants.isEnvironmentJOBSITE && (
                <div className="price-wrap">
                  <img
                    className="flagimg"
                    src={Constants.IMAGES.FLAG_US}
                    alt="US $"
                  />
                  <span className="data_price_usd">
                    {detailsHtml.itemPriceUS}
                  </span>
                </div>
              )
            }
            {/* <p>{detailsHtml.dealerId}</p> */}
            <div style={{ clear: "both" }}></div>
          </div>

          <div id="top-specs">
            {/* Date Acquired */}
            {/* If it's BFE Rental
            // And if it IS a Cat product category (aka is NOT any other product category) */}
            {Constants.isEnvironmentBFERENTAL &&
            props.jsonDataProduct["product-family"] !== "Generators" &&
            props.jsonDataProduct["product-family"] !==
              "Lawn & Garden Equipment" &&
            props.jsonDataProduct["product-family"] !== "Light Towers" &&
            props.jsonDataProduct["product-family"] !==
              "Message & Arrow Boards" &&
            props.jsonDataProduct["product-family"] !== "Miscellaneous" &&
            props.jsonDataProduct["product-family"] !== "Pumps" &&
            props.jsonDataProduct["product-family"] !==
              "Scissor Lifts & Booms" &&
            props.jsonDataProduct["product-family"] !== "Trench Shoring" &&
            props.jsonDataProduct["product-family"] !== "Welders" &&
            // If product doesn't have model year, show date acquired
            props.jsonDataProduct["year"] === undefined ? (
              <div>
                {props.jsonDataProduct["acquired-date"] ? (
                  <div>
                    <h3>
                      {outputEnFr(
                        "Date Acquired:",
                        "Date d'acquisition:",
                        props.lang
                      )}
                    </h3>
                    <p className="large">
                      {props.jsonDataProduct["acquired-date"]}
                    </p>
                    <h3>
                      {outputEnFr("Model Year:", "Année modèle:", props.lang)}
                    </h3>
                    <p className="large">{props.jsonDataProduct["year"]}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              // If product has model year, only show model year and hide date acquired
              <>
                <h3>
                  {outputEnFr("Model Year:", "Année modèle:", props.lang)}
                </h3>
                <p className="large">{props.jsonDataProduct["year"]}</p>
              </>
            )}

            {/* If product is Allied (aka any other product), show both model year and date acquired */}
            {Constants.isEnvironmentBFERENTAL &&
            props.jsonDataProduct["product-family"] !== "Excavators" &&
            props.jsonDataProduct["product-family"] !== "Material Handling" &&
            props.jsonDataProduct["product-family"] !== "Backhoe Loaders" &&
            props.jsonDataProduct["product-family"] !== "Skid Steer Loaders" &&
            props.jsonDataProduct["product-family"] !==
              "Compact Track Loaders" &&
            props.jsonDataProduct["product-family"] !==
              "Compaction Equipment" &&
            props.jsonDataProduct["product-family"] !== "Generators" ? (
              <div>
                <h3>
                  {outputEnFr(
                    "Date Acquired:",
                    "Date d'acquisition:",
                    props.lang
                  )}
                </h3>
                <p className="large">
                  {props.jsonDataProduct["acquired-date"]}
                </p>
                <h3>
                  {outputEnFr("Model Year:", "Année modèle:", props.lang)}
                </h3>
                <p className="large">{props.jsonDataProduct["year"]}</p>
              </div>
            ) : (
              ""
            )}

            <h3>{outputEnFr("Location:", "Emplacement:", props.lang)}</h3>
            <p className="large">{detailsHtml.productLocation}</p>
            <h3> {outputEnFr("Hours:", "Heures:", props.lang)}</h3>
            <p className="large">
              {formatHours(props.jsonDataProduct["hours"], props.lang)}
            </p>
            <h3>
              {" "}
              {outputEnFr("Serial number:", "Numéro de série:", props.lang)}
            </h3>
            <p className="large">{props.jsonDataProduct["serial-number"]}</p>
            {props.jsonDataProduct["stock-number"] && (
              <>
                <h3>
                  {outputEnFr("Stock Number:", "Numéro d'unité:", props.lang)}
                </h3>
                <p className="large">{props.jsonDataProduct["stock-number"]}</p>
              </>
            )}

            {detailsHtml.visibility.certification && (
              <>
                <h3>Certification:</h3>
                <p className="large">{props.jsonDataProduct.certification}</p>
              </>
            )}

            <h3 className="note-warranty">
              {Constants.isEnvironmentBFERENTAL ? (
                <div>
                  {outputEnFr(
                    "Freight options available.",
                    "Options de garantie et de transport disponibles.",
                    props.lang
                  )}
                </div>
              ) : (
                <div>
                  {outputEnFr(
                    "Warranty and Freight options available.",
                    "Options de garantie et de transport disponibles.",
                    props.lang
                  )}
                </div>
              )}
            </h3>
          </div>

          <div className="usnote">
            {outputEnFr(
              "US price conversion rate is not exact and is to be used only as an estimate. Please contact us for exact US pricing. Prices subject to change without notice.",
              "Le prix US est basé sur le taux de change en vigueur et est fourni uniquement pour estimé. Contactez-nous pour obtenir un prix exact en dollars américains. Les prix sont sujets à changement sans préavis.",
              props.lang
            )}
            <br />
          </div>
        </div>
      </div>

      {state_photoOpen && (
        <Lightbox
          mainSrc={images[state_photoIndex]}
          nextSrc={images[(state_photoIndex + 1) % images.length]}
          prevSrc={
            images[(state_photoIndex + images.length - 1) % images.length]
          }
          onCloseRequest={() => setState_photoOpen(false)}
          onMovePrevRequest={() =>
            setState_photoIndex(
              (state_photoIndex + images.length - 1) % images.length
            )
          }
          onMoveNextRequest={() =>
            setState_photoIndex((state_photoIndex + 1) % images.length)
          }
        />
      )}
    </>
  );
};
MachineImagesAndInfo.whyDidYouRender = true;
export default MachineImagesAndInfo;
