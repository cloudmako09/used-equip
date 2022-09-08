import * as Constants from "../Constants";
import * as Helpers from "../HelperFunctions";
import * as Types from "../../common/Types";
import { PageTypes } from "../../../pages/common/Constants";
import SEO_BFE from "./SEOcontentBFE";
import SEO_JOBSITE from "./SEOcontentJOBSITE";
import SEO_TCAT from "./SEOcontentTCAT";
import _ from "lodash";

export function slug(sourcetext: string | null) {
  let text = sourcetext;
  if (text !== null && text !== "") {
    text = _.deburr(text) + "";
    text = text.toLowerCase();
    text = text.split("'").join("-"); //apostrophe
    text = text.split(".").join(""); //period
    text = text.split(")").join(""); //r bracket
    text = text.split("(").join(""); //l bracket
    text = text.split(" ").join("-"); //spaces
    text = text.split("/").join("-"); //slash
    text = text.split("|").join("-"); //pipe
    text = text.split("---").join("-"); //3 dashes

    //text = text.replace(/\)|\(/g, '');//remove brackets
    // text = text.replace(/\'|\s+|\/|\|/g, '-');	// '/| space : replace with hyphen
    // text = text.replace(/-+/g, '-');	//3 dashes - plus counts multiple
  }
  return Helpers.ConverterString(text);
}

export function getListingPageUrl(
  setLang: string,
  setCategory: string | null,
  includeExtraParams: boolean,
  filters?: Types.searchFilters,
  currentPage?
) {
  let newUrl;
  currentPage = currentPage || 1;
  if (
    typeof setCategory === "undefined" ||
    setCategory === "" ||
    setCategory === null ||
    setCategory === "undefined"
  ) {
    //set to generic "products" or "produits"
    setCategory =
      setLang === "fr" ? Constants.ALLFAMSWORD_FR : Constants.ALLFAMSWORD_EN;
  }
  newUrl = "/" + setLang + "/" + slug(setCategory);
  if (includeExtraParams && filters && currentPage) {
    newUrl += getUrlParamsFromFilters(setLang, filters, currentPage);
    newUrl = newUrl.replace("&", "?"); //replace first & with ? so its valid url
  }
  return newUrl;
}

export function getDetailPageUrlFromSerial(
  setLang: string,
  setCategory: string | null,
  serialNumber: string,
  includeExtraParams: boolean,
  filters?: Types.searchFilters,
  currentPage?
) {
  var productUrl;
  // logme("getDetailPageUrlFromSerial("+sernum+","+setfamily+","+includeExtraParams);

  if (setCategory === null || setCategory === "") {
    setCategory =
      setLang === "fr" ? Constants.ALLFAMSWORD_FR : Constants.ALLFAMSWORD_EN;
  }
  if (setLang === "fr") {
    // newUrl = "/fr/"+ALLFAMSWORD_FR;
    productUrl = "/fr/" + setCategory;
  } else {
    // newUrl = "/en/"+ALLFAMSWORD_EN;
    productUrl = "/en/" + setCategory;
  }

  productUrl += "/" + serialNumber;
  if (includeExtraParams && filters) {
    productUrl += getUrlParamsFromFilters(setLang, filters, currentPage);
    productUrl = productUrl.replace("&", "?"); //replace first & with ? so its valid url
  }
  return productUrl;
}

export function getNewUrlFromFilters(
  lang: string,
  filters: Types.searchFilters,
  currentPage: number
) {
  console.log("getNewUrlFromFilters()", lang, filters, currentPage);

  let newUrl = "/" + lang;

  if (
    filters.category !== null &&
    filters.category !== "" &&
    filters.category !== Constants.ALLFAMSWORD_EN &&
    filters.category !== Constants.ALLFAMSWORD_FR &&
    !filters.viewDeals &&
    !filters.viewFaves
  ) {
    //add category
    newUrl += "/" + filters.category;
  } else if (filters.viewDeals) {
    //add category
    newUrl += "/deals";
  } else if (filters.viewFaves) {
    var urlcategory = lang === "fr" ? "favoris" : "favourites";
    newUrl += "/" + urlcategory;
  } else {
    var products =
      lang === "fr" ? Constants.ALLFAMSWORD_FR : Constants.ALLFAMSWORD_EN;
    //adjust for power systems
    if (
      filters.categoryClass != null &&
      filters.categoryClass === Constants.CLASS_POWER
    ) {
      products = Constants.URLPOWER_SLUG;
    }

    newUrl += "/" + products;
  }

  newUrl += getUrlParamsFromFilters(lang, filters, currentPage);

  newUrl = newUrl.replace("&", "?"); //replace first & with ? so its valid url

  return newUrl;
}

export function numberClean(number) {
  //for text inputs, symbols cause issues
  let newNumber = number;
  newNumber = newNumber.split(",").join("");
  newNumber = newNumber.split(" ").join("");
  newNumber = newNumber.split("$").join("");
  return newNumber;
}

function getUrlParamsFromFilters(
  lang: string,
  filters: Types.searchFilters,
  currentPage: number
) {
  let allparams = "";
  if (filters.keyword) {
    allparams += "&keyword=" + encodeURI(filters.keyword);
  }
  if (filters.make) {
    allparams += "&make=" + filters.make;
  }
  if (filters.maxPrice) {
    allparams += "&max=" + filters.maxPrice;
  }
  if (filters.hoursMax) {
    allparams += "&hrs=" + filters.hoursMax;
  }
  if (filters.yearMin && filters.yearMin) {
    allparams += "&yrmin=" + filters.yearMin;
  }
  if (filters.yearMax) {
    allparams += "&yrmax=" + filters.yearMax;
  }
  if (filters.province) {
    allparams += "&province=" + filters.province;
  }
  if (
    filters.categoryClass &&
    filters.categoryClass === Constants.CLASS_POWER &&
    filters.category !== Constants.URLPOWER_SLUG
  ) {
    allparams +=
      "&class=" +
      (lang === "fr" ? Constants.URLPOWER_FR : Constants.URLPOWER_EN);
  }
  if (filters.city && Helpers.badCityCheck(filters.city) !== "N/A") {
    allparams += "&city=" + Helpers.saferString(filters.city);
  }
  if (filters.certifiedOnly) {
    allparams += "&certified=1";
  }
  if (filters.battlefieldInventory) {
    allparams += "&bfeinv=1";
  }
  if (filters.consignmentOnly) {
    allparams += "&consignment=1";
  }
  if (filters.rentalFleetAvailability) {
    allparams += "&available=1";
  }
  if (filters.rentalFleetWithImages) {
    allparams += "&images=1";
  }
  if (filters.sortBy && filters.sortBy !== Constants.SORT.YEAR_HI) {
    //ignore year desc because its the default
    allparams += "&sort=" + filters.sortBy;
  }

  if (currentPage > 1) {
    allparams += "&page=" + currentPage;
  }
  /*if (imagesOnlyChecked){
        allparams += "&images=1";
    }*/
  return allparams;
}

export function getAllUrlParams(): string[] {
  //gets URL parameters but only for values after the ?
  const get_params = function (search_string) {
    const parse = function (params, pairs) {
      const pair = pairs[0];
      const parts = pair.split("=");
      const key = decodeURIComponent(parts[0]);
      const value = decodeURIComponent(parts.slice(1).join("="));
      params[key] = value;
      return pairs.length === 1 ? params : parse(params, pairs.slice(1));
    };

    // Get rid of leading ?
    return search_string.length === 0
      ? {}
      : parse({}, search_string.substr(1).split("&"));
  };
  let params;
  if (typeof window.location != "undefined") {
    params = get_params(window.location.search);
    if (params) {
      return params;
    }
  }
  return [];
}

export function getMetaTitle(
  info: string,
  lang: string,
  filters?: Types.searchFilters,
  includeSiteName?: boolean
) {
  let companyName = Constants.isEnvironmentBFE_or_BFERENTAL
    ? "Battlefield Equipment Rentals" : Constants.isEnvironmentJOBSITE ? "Jobsite Industrial Rental Services"
    : "Toromont Cat";

  if (lang === "fr" && Constants.isEnvironmentBFE_or_BFERENTAL) {
    companyName = "Location d’équipement Battlefield";
  } else if (lang === "fr" && Constants.isEnvironmentJOBSITE) {
    companyName = "Location d'outils industriels Jobsite"
  }

  let newMetaTitle;
  if (info === "default") {
    if (
      (filters && filters.categoryClass === Constants.CLASS_POWER) ||
      (filters && filters.category === "power-systems-production-d-energie")
    ) {
      newMetaTitle =
        lang === "fr"
          ? "Groupes électrogènes usagés | " + companyName
          : "Used Generators | " + companyName;
    } else if (Constants.isEnvironmentBFERENTAL) {
      newMetaTitle =
        lang === "fr"
          ? "Vente de flotte de location | " + companyName
          : "Rental Fleet Sell-Off | " + companyName;
    } else {
      newMetaTitle =
        lang === "fr"
          ? "Outils & Équipements d'Occasion | " + companyName
          : "Used Tools & Equipment | " + companyName;
    }
  } else {
    info = lang === "fr" ? info : "Used " + info;
    if (
      (filters && filters.categoryClass === Constants.CLASS_POWER) ||
      (filters && filters.category === "power-systems-production-d-energie")
    ) {
      newMetaTitle =
        lang === "fr"
          ? "Groupes électrogènes usagés - " + info + " | " + companyName
          : "Used Generators | " + companyName;
    } else {
      let siteNamePrepend = lang === "fr" ? "Équipement lourd usagé - " : "Used Heavy Equipment - ";
      siteNamePrepend = includeSiteName ? siteNamePrepend : ""; //remove if disabled

      newMetaTitle = siteNamePrepend + info + " | " + companyName;
    }
  }
  if (filters && filters.keyword && filters.keyword !== "") {
    newMetaTitle = filters.keyword + " | " + newMetaTitle;
  }
  return newMetaTitle;
}
export function handleChangeLanguage(
  newLang,
  pgType,
  location_pathname,
  location_search
) {
  console.log("handleChangeLanguage", newLang);

  if (newLang) {
    //dont change state but change url
    const updatedUrl = getPathLanguageChanged(
      newLang,
      pgType,
      location_pathname,
      location_search
    );
    document.location.href = updatedUrl; //using instead of history.push for a hard page load on language change
  }
}
export function getPathLanguageChanged(newLanguage, curPageType, path, params) {
  var newPath = path;

  if (curPageType === PageTypes.Home) {
    newPath = "/" + newLanguage;
  } else {
    newPath = newPath.replace("/en/", "/" + newLanguage + "/"); //find lang param and replace
    newPath = newPath.replace("/fr/", "/" + newLanguage + "/"); //find lang param and replace
    newPath = newPath + params;
  }
  return newPath;
}

export const getSeoContentByCatCode = (
  catcode?: string | null
): Types.types_seoData => {
  if (catcode == null) {
    catcode = "products";
  }

  const SEO = Constants.isEnvironmentBFE_or_BFERENTAL ? SEO_BFE : Constants.isEnvironmentJOBSITE ? SEO_JOBSITE : SEO_TCAT;

  if (catcode) {
    let seoData = SEO.find((o) => o["CatCodeSlug"] === catcode);
    if (seoData) {
      return seoData;
    }
  }

  return SEO[0];
};

// export const getCategoryCtaImage=(catCode:string)=>{
//   const img = switch(catCode){
//     case "articulated-trucks-tombereaux-articules"

//   }

// }