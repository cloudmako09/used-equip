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
  isEnvironmentBFERENTAL,
  // isEnvironmentBFE,
  isEnvironmentBFE_or_BFERENTAL,
} from "../common/Constants";

export type Props_Details = {
  lang: string;
  catCodeFromUrl: string;
  currentCatClass: string;
  serialFromUrl: string;
  jsonDataProduct: Types.Type_jsonModelDetails | undefined;
  urlParams: string[];
};

export default class DetailsPage extends React.PureComponent<Props_Details> {
  constructor(p) {
    super(p);
    console.log("Construct Details Page ", this.props);
    window.scrollTo(0, 0);
  }

  getCanonicalUrl = () => {
    const categoryCode =
      this.props.jsonDataProduct &&
      this.props.jsonDataProduct["product-family-categories"]
        ? this.props.jsonDataProduct["product-family-categories"].category[
            "category-code"
          ]
        : null;
    return (
      DOMAINBASE +
      getDetailPageUrlFromSerial(
        this.props.lang,
        slug(categoryCode),
        this.props.serialFromUrl,
        false
      )
    );
  };

  getMetaDescTag = () => {
    const seoText: Types.types_seoData = getSeoContentByCatCode(
      this.props.catCodeFromUrl
    );
    const metaText =
      this.props.lang === "fr" ? seoText.FR.Meta : seoText.EN.Meta;
    return metaText;
  };

  inspectionReportAvailable(): boolean {
    return (
      typeof this.props.jsonDataProduct !== "undefined" &&
      typeof this.props.jsonDataProduct.condition !== "undefined" &&
      typeof this.props.jsonDataProduct.condition.category !== "undefined" &&
      this.props.jsonDataProduct.condition.category !== null &&
      typeof this.props.jsonDataProduct.condition.category[0] !== "undefined"
    );
  }

  render() {
    isEnvironmentBFE_or_BFERENTAL
      ? setBodyClass(["pgDetail", "bfetheme"])
      : setBodyClass(["pgDetail"]);
    if (
      this.props.jsonDataProduct &&
      this.props.serialFromUrl === this.props.jsonDataProduct["serial-number"]
    ) {
      return (
        <>
          <Helmet>
            <meta name="description" content={this.getMetaDescTag()} />
            <link rel="canonical" href={this.getCanonicalUrl()} />
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
                      lang={this.props.lang}
                      currentCatClass={this.props.currentCatClass}
                      jsonDataProduct={this.props.jsonDataProduct}
                      catCodeFromUrl={this.props.catCodeFromUrl}
                      urlParams={this.props.urlParams}
                    />
                  </div>

                  <div
                    id="col-cta"
                    className="col-xs-12 col-sm-12 col-md-4 col-lg-4"
                  >
                    <DetailColumn2
                      lang={this.props.lang}
                      currentCatClass={this.props.currentCatClass}
                      jsonDataProduct={this.props.jsonDataProduct}
                      inspectionReportAvailable={this.inspectionReportAvailable()}
                    />
                    {/* Current Availability */}
                    {isEnvironmentBFERENTAL ? (
                      <section className="current-avail">
                        <p>
                          <strong>
                            {outputEnFr(
                              "Currently Available:",
                              "Disponibilité actuelle:",
                              this.props.lang
                            )}
                          </strong>
                        </p>
                        <p id="current-avail" className={this.props.jsonDataProduct["availability"] === 'Yes' ? 'green' : 'red'}>
                          {this.props.jsonDataProduct["availability"]}
                        </p>
                        {/* TODO: When French comes, use outputEnFr method - need to figure out how to add strong, p and br tags and pass into an argument. */}
                        <div>
                          {this.props.lang === "fr" ? (
                            <>
                              <p>
                                <strong>Oui</strong> = disponible en inventaire
                                et prêt à être loué
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
                                <strong>Yes</strong> = available and ready in
                                our yard
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
              {this.inspectionReportAvailable() ? (
                <InspectionReport
                  lang={this.props.lang}
                  jsonDataProduct={this.props.jsonDataProduct}
                />
              ) : null}

              {/* <!-- <section id="financing">
    <div id="home-financing-offer" >
      <div class="container">
        <div class="row">
            <div class="col-xs-12 text-center">
                <p>
                  <%=OutputEnFr("For a limited time, get <strong>4.9% financing offer</strong> for 60 months* on all used equipment.",
                  "Pour un temps limité, obtenez une <strong>offre de financement de 4,9 %</strong> pour 60 mois* sur tout équipement usagé.")%>
                </p>
                <p class="phone-bold">
                    <%=OutputEnFr("Call <a href='tel:18888501455'>1 888 850-1455</a> for more details.","Appelez le <a href='tel:18888501455'>1-888-850-1455</a> pour plus de détails")%>
                </p>
                <p class="terms">
                    <%=OutputEnFr("*Offer valid until December 31, 2019. Certain conditions apply.","*Offre valable jusqu’au 31 décembre 2019. Certaines conditions s'appliquent.")%>                  
                </p> <br/>
        </div> 
        <div class="col-xs-12 text-center ">
            <div class="gfx-wrap">
                <img class="financing-graphic img1" src="<%=OutputEnFr("/used/images/Financing-offer-used-english.png","/used/images/Financing-offer-used-french.png")%>" alt="Used Cat equipment financing"  />
                <img class="financing-graphic img2" src="/used/images/financing_dozer.jpg" alt="Used Cat equipment financing"  />
          </div>
        </div>
   
      </div>
    </div>
  </div>
  </section> --> */}
            </div>
          </div>

          <CTASection
            lang={this.props.lang}
            categoryClass={this.props.currentCatClass}
            curCategory={this.props.catCodeFromUrl}
            modelName={getProductName(this.props.jsonDataProduct)}
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
  }
}
