/* eslint-disable react/jsx-pascal-case */
import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import {
  slug,
  getAllUrlParams,
  getSeoContentByCatCode,
  getMetaTitle,
} from "./pages/common/SEO/SeoFunctions";
import { displayCart } from "./js_vanilla/used-favouriteAddon";
import Header from "./pages/common/Components/Header";
import * as Constants from "./pages/common/Constants";
import {
  getJsonUrl,
  getCookie,
  isPowerCategory,
} from "./pages/common/HelperFunctions";
import Footer_Battlefield from "./pages/common/Components/Footer_Battlefield";
import Footer_TCAT from "./pages/common/Components/Footer_TCAT";
import { types_seoData, Type_jsonCategoryGroup } from "./pages/common/Types";
import ListingsPage from "./pages/listings/ListingsPage";
import CCUPage from "./pages/other/CCUPage";
import ConsignmentPage from "./pages/other/ConsignmentPage";
import EmailConfirm from "./pages/other/EmailConfirm";
import HomePage from "./pages/home/HomePage";
import _ from "lodash";
import UpdateSitemap from "./pages/other/UpdateSitemap";
const DetailsPage = React.lazy(() => import("./pages/details/DetailsPage"));

type Props_PageWrapper = {
  pageType: number;
  history?; //from withRouter
  match?; //from withRouter
};
type State_PageWrapper = {
  categoryClass;
  jsonApiUrl;
  jsonDataGroupsMain: Type_jsonCategoryGroup[] | null;
  jsonDataGroupsPower: Type_jsonCategoryGroup[] | null;
  jsonDataProduct;
};

class PageWrapper extends React.PureComponent<
  Props_PageWrapper,
  State_PageWrapper
> {
  constructor(props) {
    super(props);
    console.log("Construct PageWrapper", props, getAllUrlParams());

    //get class from URL (either heavy equipment or power)

    this.state = {
      categoryClass: this.getCategoryClass(),
      jsonApiUrl: getJsonUrl(
        this.props.pageType,
        this.getParamLanguage(),
        this.getParamSerial()
      ),
      jsonDataGroupsMain: null,
      jsonDataGroupsPower: null,
      jsonDataProduct: null,
    };

    displayCart(); //initialize cart/faves in nav
  }
  getParamLanguage() {
    let paramLang = this.props.match.params.param_Lang; //get language from URL
    let cookieLang = getCookie("lang"); //get language from cookie/
    let browserLang;
    let setLanguageTo = "en";
    if (typeof window != "undefined" && window.navigator != null) {
      //get language from browser setting
      browserLang = window.navigator.language;
    }
    //console.log("Lang setting: url: " + paramLang + ", cookie: " + cookieLang + ", browser: " + browserLang);
    if (typeof paramLang !== "undefined" && paramLang !== "undefined") {
      //url language takes priority
      setLanguageTo = paramLang;
    } else if (cookieLang && cookieLang !== "") {
      //cookie takes second priority
      setLanguageTo = cookieLang;
    } else if (
      this.getParamCategory() === Constants.URLPOWER_FR ||
      browserLang === "fr" ||
      browserLang === "fr-CA"
    ) {
      setLanguageTo = "fr";
    }
    //save language preference to cookie
    if (!cookieLang || cookieLang === "" || cookieLang !== setLanguageTo) {
      console.log("Storing language cookie " + setLanguageTo);
      document.cookie =
        "lang=" +
        setLanguageTo +
        "; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    }
    return setLanguageTo;
  }
  getParamCategory() {
    return this.props.match.params.param_Category;
  }
  getParamSerial() {
    return this.props.match.params.param_Serial;
  }
  getCategoryClass() {
    let categoryClass = Constants.CLASS_HEAVY;
    if (
      this.getParamCategory() === Constants.URLPOWER_SLUG ||
      getAllUrlParams()["class"] === Constants.URLPOWER_EN ||
      getAllUrlParams()["class"] === Constants.URLPOWER_FR
    ) {
      categoryClass = Constants.CLASS_POWER;
    }
    return categoryClass;
  }

  componentDidMount() {
    console.log("PageWrapper componentDidMount() ", this.props);
    const newJsonUrl = getJsonUrl(
      this.props.pageType,
      this.getParamLanguage(),
      this.getParamSerial()
    );
    if (!navigator.userAgent || navigator.userAgent !== "ReactSnap") {
      //avoids loading on react-snap scan
      this.loadJsonOnStartup(newJsonUrl);
    }
  }

  componentDidUpdate() {
    const newJsonUrl = getJsonUrl(
      this.props.pageType,
      this.getParamLanguage(),
      this.getParamSerial()
    );
    //update json if changed
    if (newJsonUrl !== this.state.jsonApiUrl) {
      console.log("Json URL changed, load updated json now");
      this.loadJsonOnStartup(newJsonUrl);
    }
    //update cat class if changed
    if (this.getCategoryClass() !== this.state.categoryClass) {
      console.log(
        "PageWrapper ComponentDidUpdate - category class updated",
        this.getCategoryClass()
      );
      this.updateCategoryClassState(this.getCategoryClass());
    }
  }

  async loadJsonOnStartup(newJsonUrl: string | undefined) {
    if (newJsonUrl) {
      await this.getJsonData(newJsonUrl);
    }
  }

  updateCategoryClassState = (newClass) => {
    this.setState({
      ...this.state,
      categoryClass: newClass,
    });
  };

  getJsonData = (jsonApiUrl: string) => {
    fetch(jsonApiUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("loaded api", result);

          //TODO: set canonical urls using react-helmet

          if (this.props.pageType === Constants.PageTypes.Details) {
            this.setState({
              categoryClass: this.getCategoryClass(),
              jsonApiUrl: jsonApiUrl,
              jsonDataProduct: result,
            });
          } else {
            this.setState({
              categoryClass: this.getCategoryClass(),
              jsonApiUrl: jsonApiUrl,
              jsonDataGroupsMain: this.initialFilterJson(result),
              jsonDataGroupsPower: this.powerSystemsFilterJson(result),
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  initialFilterJson = (jsonData) => {
    //const categClass = this.state.categoryClass;

    //TCAT ONLY - FILTER BY CATEGORY CLASS TYPE
    if (Constants.isEnvironmentTCAT) {
      let equipmentGrouping: Type_jsonCategoryGroup[] = _.filter(
        jsonData.groups,
        function (o) {
          const groupCategoryClass =
            o["equipments"][0]["product-family-categories"]["category-class"][
              "name"
            ];
          const famCode = o["group-code"];

          const notAttachments =
            groupCategoryClass !== "ATTACHMENTS" &&
            groupCategoryClass !== "ÉQUIPEMENTS" &&
            slug(famCode) !== "work-tools-outils-de-travail";

          const notForklifts =
            famCode !== "Forklifts" &&
            famCode !== "CHARIOTS ÉLÉVATEURS" &&
            famCode !== "Forklifts - Chariots Elévateurs";

          if (notAttachments && notForklifts && !isPowerCategory(o)) {
            return true;
          } else {
            return false;
          }
        }
      );

      return equipmentGrouping;
    } else {
      return jsonData.groups;
    }
  };

  powerSystemsFilterJson(jsonDataSrc) {
    let newPowerGrouping: Type_jsonCategoryGroup[] = [];

    let equipmentFilteredPowerOnly: Type_jsonCategoryGroup[] = _.filter(
      jsonDataSrc.groups,
      function (o) {
        if (isPowerCategory(o)) {
          return true;
        } else {
          return false;
        }
      }
    );
    if (typeof equipmentFilteredPowerOnly[0] == "undefined") return null;

    let equipmentGroupingPower = _.groupBy(
      equipmentFilteredPowerOnly[0].equipments,
      function (o) {
        return o["product-family-code"];
      }
    );

    Object.keys(equipmentGroupingPower).forEach(function (x) {
      newPowerGrouping.push({
        count: equipmentGroupingPower[x].length,
        "group-code": equipmentGroupingPower[x][0]["product-family-code"],
        "group-display-name": equipmentGroupingPower[x][0]["product-family"],
        "group-name": equipmentGroupingPower[x][0]["product-family"],
        equipments: equipmentGroupingPower[x],
      });
    });

    console.log("initial json 2 (power) ", newPowerGrouping);
    return newPowerGrouping;
  }

  getCurrentListingGroups = () => {
    return this.state.categoryClass === Constants.CLASS_POWER
      ? this.state.jsonDataGroupsPower
      : this.state.jsonDataGroupsMain;
  };

  getMetaDescTag = () => {
    const seoText: types_seoData = getSeoContentByCatCode();
    const metaText =
      this.getParamLanguage() === "fr" ? seoText.FR.Meta : seoText.EN.Meta;
    return metaText;
  };

  getPageComponent = () => {
    switch (this.props.pageType) {
      case Constants.PageTypes.Listings:
        return (
          <ListingsPage
            lang={this.getParamLanguage()}
            catCodeFromUrl={this.getParamCategory()}
            urlParams={getAllUrlParams()}
            currentCatClass={this.state.categoryClass}
            handleUpdateCatClass={this.updateCategoryClassState}
            jsonDataGroups={this.getCurrentListingGroups()}
          />
        );
      case Constants.PageTypes.Details:
        return (
          <DetailsPage
            lang={this.getParamLanguage()}
            catCodeFromUrl={this.getParamCategory()}
            urlParams={getAllUrlParams()}
            currentCatClass={this.state.categoryClass}
            jsonDataProduct={this.state.jsonDataProduct}
            serialFromUrl={this.getParamSerial()}
          />
        );
      case Constants.PageTypes.CCU:
        return <CCUPage lang={this.getParamLanguage()} />;
      case Constants.PageTypes.Consignment:
        return <ConsignmentPage lang={this.getParamLanguage()} />;
      case Constants.PageTypes.EmailConfirm:
        return (
          <EmailConfirm
            lang={this.getParamLanguage()}
            urlParams={getAllUrlParams()}
          />
        );
      case Constants.PageTypes.UpdateSitemap:
        return <UpdateSitemap />;
      default:
        return (
          <HomePage
            lang={this.getParamLanguage()}
            jsonDataGroups={this.state.jsonDataGroupsMain}
          />
        );
    }
  };

  getFooterComponent = () => {
    return Constants.isEnvironmentBFE_or_BFERENTAL ? (
      <Footer_Battlefield lang={this.getParamLanguage()} />
    ) : (
      <Footer_TCAT
        lang={this.getParamLanguage()}
        currentCatClass={this.state.categoryClass}
      />
    );
  };

  render() {
    return (
      <>
        <Helmet
          htmlAttributes={{
            lang: this.getParamLanguage() === "fr" ? "fr-CA" : "en",
          }}
        >
          <title>{getMetaTitle("default", this.getParamLanguage())}</title>
          <meta name="description" content={this.getMetaDescTag()} />
        </Helmet>
        <Suspense fallback={<></>}>
          <a className="skip-to-content-link" href="#main">
            Skip to content
          </a>
          <Header
            lang={this.getParamLanguage()}
            pageType={this.props.pageType}
            paramCategory={this.getParamCategory()}
            currentCatClass={this.state.categoryClass}
            jsonDataGroups={this.state.jsonDataGroupsMain}
          />

          {this.getPageComponent()}

          {this.getFooterComponent()}
        </Suspense>
      </>
    );
  }
}
export default withRouter(PageWrapper);
