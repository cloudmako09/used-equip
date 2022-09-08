import React from "react";
import "../../css/detailpage.scss";
import { Helmet } from "react-helmet";
import {
  setBodyClass,
  getProductName,
  outputEnFr,
} from "../common/HelperFunctions";
import MachineImagesAndInfo from "./sections/MachineImagesAndInfo";
import DetailColumn2 from "./sections/DetailColumn2";
import InspectionReport from "./sections/InspectionReport";
import * as Types from "../common/Types";
import CTASection from "../common/Sections/CTASection";
import {
  getSeoContentByCatCode,
  getDetailPageUrlFromSerial,
  slug,
} from "../common/SEO/SeoFunctions";
import {
  DOMAINBASE,
  IMAGES,
  isEnvironmentBFE,
  isEnvironmentBFERENTAL,
  // isEnvironmentBFE,
  isEnvironmentBFE_or_BFERENTAL,
  isEnvironmentJOBSITE,
} from "../common/Constants";
import PeriodicAnnualInspectionReport from "./sections/PeriodicAnnualInspectionReport";

export type Props_Details = {
  lang: string;
  catCodeFromUrl: string;
  currentCatClass: string;
  serialFromUrl: string;
  jsonDataProduct: Types.Type_jsonModelDetails | undefined;
  urlParams: string[];
};

const DetailsPage = ({
  lang,
  catCodeFromUrl,
  currentCatClass,
  serialFromUrl,
  jsonDataProduct,
  urlParams,
}: Props_Details) => {
  const getCanonicalUrl = () => {
    const categoryCode =
      jsonDataProduct && jsonDataProduct["product-family-categories"]
        ? jsonDataProduct["product-family-categories"].category["category-code"]
        : null;
    return (
      DOMAINBASE +
      getDetailPageUrlFromSerial(lang, slug(categoryCode), serialFromUrl, false)
    );
  };

  const getMetaDescTag = () => {
    const seoText: Types.types_seoData = getSeoContentByCatCode(catCodeFromUrl);
    const metaText = lang === "fr" ? seoText.FR.Meta : seoText.EN.Meta;
    return metaText;
  };

  const inspectionReportAvailable = () => {
    return (
      typeof jsonDataProduct !== "undefined" &&
      typeof jsonDataProduct.condition !== "undefined" &&
      typeof jsonDataProduct.condition.category !== "undefined" &&
      jsonDataProduct.condition.category !== null &&
      typeof jsonDataProduct.condition.category[0] !== "undefined"
    );
  };

  isEnvironmentBFE_or_BFERENTAL
    ? setBodyClass(["pgDetail", "bfetheme"])
    : isEnvironmentJOBSITE
    ? setBodyClass(["pgDetail", "jobsite-theme"])
    : setBodyClass(["pgDetail"]);
  // If Jobsite or Rental Fleet, make the API data pull in via the product's ID.
  // If CCE Used, keep the data pulling in via the product's serial number.
  if (
    (isEnvironmentJOBSITE &&
      jsonDataProduct &&
      serialFromUrl === jsonDataProduct["id"]) ||
    (isEnvironmentBFERENTAL &&
      jsonDataProduct &&
      serialFromUrl === jsonDataProduct["id"]) ||
    (isEnvironmentBFE &&
      jsonDataProduct &&
      serialFromUrl === jsonDataProduct["serial-number"])
  ) {
    return (
      <>
        <Helmet>
          <meta name="description" content={getMetaDescTag()} />
          <link rel="canonical" href={getCanonicalUrl()} />
        </Helmet>
        <div id="screenlayout" className="container-fluid nopad">
          <div id="mainContent" className="detailsection">
            <div className="container">
              <div className="row detailsection_info detailMainInfo">
                <div
                  id="images-info"
                  className="col-xs-12 col-sm-12 col-md-8 col-lg-8"
                >
                  <MachineImagesAndInfo
                    lang={lang}
                    currentCatClass={currentCatClass}
                    jsonDataProduct={jsonDataProduct}
                    catCodeFromUrl={catCodeFromUrl}
                    urlParams={urlParams}
                  />
                </div>

                <div
                  id="col-cta"
                  className="col-xs-12 col-sm-12 col-md-4 col-lg-4"
                >
                  <DetailColumn2
                    lang={lang}
                    currentCatClass={currentCatClass}
                    jsonDataProduct={jsonDataProduct}
                    inspectionReportAvailable={inspectionReportAvailable()}
                  />
                  {/* Current Availability */}
                  {isEnvironmentBFERENTAL || isEnvironmentJOBSITE ? (
                    <section className="current-avail">
                      <p>
                        <strong>
                          {outputEnFr(
                            "Currently Available:",
                            "Disponibilité actuelle:",
                            lang
                          )}
                        </strong>
                      </p>
                      <p
                        id="current-avail"
                        className={
                          jsonDataProduct["availability"] === "Yes"
                            ? "green"
                            : "red"
                        }
                      >
                        {jsonDataProduct["availability"] === "Yes" &&
                        lang === "fr" ? (
                          <>Oui</>
                        ) : (
                          <>{jsonDataProduct["availability"]}</>
                        )}
                      </p>
                      {/* TODO: When French comes, use outputEnFr method - need to figure out how to add strong, p and br tags and pass into an argument. */}
                      <div>
                        {lang === "fr" ? (
                          <>
                            <p>
                              <strong>Oui</strong> = disponible en inventaire et
                              prêt à être loué
                            </p>
                            <p>
                              <strong>Non</strong> = présentement en location,
                              sur contrat ou en cours de maintenance. Veuillez
                              nous contacter pour réserver cette unité
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              <strong>Yes</strong> = available and ready in our
                              yard
                            </p>
                            <p>
                              <strong>No</strong> = currently on rent, on
                              contract or being serviced. Please contact us to
                              reserve this unit.
                            </p>
                          </>
                        )}
                      </div>
                    </section>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {/* General Inspection Report */}
            {inspectionReportAvailable() ? (
              <InspectionReport lang={lang} jsonDataProduct={jsonDataProduct} />
            ) : null}
            {/* Periodic / Annual Inspection Report */}
            {isEnvironmentBFERENTAL || isEnvironmentJOBSITE ? (
              <PeriodicAnnualInspectionReport
                lang={lang}
                jsonDataProduct={jsonDataProduct}
              />
            ) : null}
          </div>
        </div>

        <CTASection
          lang={lang}
          categoryClass={currentCatClass}
          curCategory={catCodeFromUrl}
          modelName={getProductName(jsonDataProduct)}
        />
      </>
    );
  } else {
    return (
      <div className="mainContentLoading">
        <div id="loading-graphic">
          <img src={IMAGES.LOADING_GIF} alt="Loading" />
        </div>
      </div>
    );
  }
};

export default DetailsPage;
