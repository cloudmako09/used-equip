import {
  slug,
  getListingPageUrl,
  getSeoContentByCatCode,
} from "./SEO/SeoFunctions";
import * as Types from "../common/Types";
import { Type_jsonModelDetails } from "../common/Types";
import * as Constants from "./Constants";
import accounting from "accounting";
import { renderToString } from "react-dom/server";
import _ from "lodash";

type Props_MachineImagesAndInfo = {
  lang: string;
  catCodeFromUrl: string;
  currentCatClass: string;
  jsonDataProduct: Type_jsonModelDetails | undefined;
  urlParams: string[];
};


export const outputEnFr = (textEn, textFr, lang: string) => {
  return lang === "fr" ? textFr : textEn;
};

export const getJsonUrl = (pageType: number, lang: string, serial: string) => {
  let jsonUrl =
    "https://tws.toromont.ca/ToromontCAT/ServiceHub/PublicInfo/equipment/used/N000";

  if (Constants.isEnvironmentBFE) {
    //change json url if BFE
    jsonUrl =
      "https://tws.toromont.ca/ToromontCAT/ServiceHub/PublicInfo/equipment/used/N001";
  }

  if (Constants.isEnvironmentBFERENTAL) {
    //change json url if BFERENTAL
    jsonUrl =
      "https://tws.toromont.ca/ToromontCAT/ServiceHub/PublicInfo/equipment/used/N001/selloff";
  }

  if (pageType === Constants.PageTypes.Details) {
    //Details page adds serial as parameter to json
    // 
    if (Constants.isEnvironmentBFERENTAL) {
      jsonUrl += "/detail?serialNumber=" + serial;
    } else {
      jsonUrl += "/equipment/" + serial;
    }
  }

  let param = "?";
  if (pageType === Constants.PageTypes.Details && Constants.isEnvironmentBFERENTAL) {
    param = "&";
  }

  if (lang === "fr") {
    jsonUrl += param + "accept-language=fr-ca";
  } else {
    jsonUrl += param + "accept-language=en-ca";
  }

  if (
    pageType === Constants.PageTypes.Listings ||
    pageType === Constants.PageTypes.Details ||
    pageType === Constants.PageTypes.Home
  ) {
    //won't load json unless these page types, not needed on specific pages
    return jsonUrl;
  }
};

export function getImage(imageFileName) {
  //this is used because require can crash site if file not found
  let imagefile;
  try {
    imagefile = require("../../images/" + imageFileName);
  } catch (err) {
    imagefile = null;
  }
  return imagefile;
}

export function getPhoneNumber(currentClass): string {
  if (Constants.isEnvironmentBFE) {
    return Constants.PHONENUMBERS.BFE;
  } else if (Constants.isEnvironmentBFERENTAL) {
    return Constants.PHONENUMBERS.BFERENTAL;
  } else if (currentClass === Constants.CLASS_POWER) {
    //power systems phone number
    return Constants.PHONENUMBERS.POWER_TCAT;
  } else {
    //regular heavy equipment phone number
    return Constants.PHONENUMBERS.HEAVY_TCAT;
  }
}
export function getEloquaFormNameCONTACT(
  categoryClass,
  currentCategory,
  userSelectedProvince
): string {
  if (isProvinceQM(userSelectedProvince)) {
    //QM
    if (categoryClass === Constants.CLASS_POWER) {
      //POWER
      return Constants.ELOQUAFORMS.CONTACTFORM.POWER.QM;
    } else {
      //HEAVY EQUIPMENT
      return Constants.ELOQUAFORMS.CONTACTFORM.HEAVY.QM;
    }
  } else {
    //Central
    if (categoryClass === Constants.CLASS_POWER) {
      //POWER
      return Constants.ELOQUAFORMS.CONTACTFORM.POWER.CENTRAL;
    } else {
      //HEAVY EQUIPMENT
      return Constants.ELOQUAFORMS.CONTACTFORM.HEAVY.CENTRAL;
    }
  }
}
export function getEloquaFormNameFOOTER(
  lang,
  currentClass,
  currentCategory
): string {
  if (
    currentClass === Constants.CLASS_POWER ||
    currentCategory === Constants.URLPOWER_SLUG
  ) {
    //power
    return lang === "fr"
      ? Constants.ELOQUAFORMS.FOOTERSUBSCRIBE.POWER.FR
      : Constants.ELOQUAFORMS.FOOTERSUBSCRIBE.POWER.EN;
  } else {
    //heavy equipment
    return lang === "fr"
      ? Constants.ELOQUAFORMS.FOOTERSUBSCRIBE.HEAVY.FR
      : Constants.ELOQUAFORMS.FOOTERSUBSCRIBE.HEAVY.EN;
  }
}
export function isProvinceQM(provAbbr) {
  if (
    provAbbr === "QC" ||
    provAbbr === "NS" ||
    provAbbr === "NB" ||
    provAbbr === "PE"
  ) {
    return true;
  } else {
    return false;
  }
}

export function isHeavyEquipmentCategory(UsedDataGroup) {
  const curCategoryClass = getCategoryClassFromValue(
    UsedDataGroup.equipments[0]["product-family-categories"]["category-class"]
      .name
  );
  const isHeavyEquipmentCategory =
    curCategoryClass === Constants.CLASS_HEAVY &&
    slug(UsedDataGroup["group-code"]) !== Constants.URLPOWER_SLUG;
  return isHeavyEquipmentCategory;
}

export function isPowerCategory(UsedDataGroup) {
  const isPowerCategory =
    slug(UsedDataGroup["group-code"]) === Constants.URLPOWER_SLUG;
  return isPowerCategory;
}

export function getCategoryClassFromValue(classVal) {
  classVal = classVal.toUpperCase();
  if (classVal === "MACHINERY" || classVal === "MACHINERIE") {
    return Constants.CLASS_HEAVY;
  } else if (
    classVal === "POWER SYSTEMS" ||
    classVal === "SYSTÈME D'ALIMENTATION" ||
    classVal === "PRODUCTION D'ÉNERGIE"
  ) {
    return Constants.CLASS_POWER;
  }
  return classVal;
}

export function isEmpty(thing) {
  if (typeof thing !== "undefined" && thing !== null && thing !== "") {
    return false;
  } else {
    return true;
  }
}

export function saferStringForUrl(string) {
  if (string != null) {
    string = _.deburr(string);
    string = string.toLowerCase();
    string = string.split("&").join("+");
    string = string.split("'").join("");
    string = string.split("- ").join("-");
    string = string.split(" ").join("-");
    string = string.split("/").join("-");
  }
  return string;
}

export function sortGroupsByDisplayName(UsedData) {
  return _.sortBy(UsedData, function (o) {
    if (o["group-display-name"] != null) {
      return _.deburr(o["group-display-name"]);
    }
  }); //asc
}

export function saferString(string, deflt?) {
  if (string != null) {
    string = string.split("&").join("+");
    string = string.split("'").join("&apos;");
  } else if (string == null && typeof deflt != "undefined") {
    string = deflt;
  } else {
    string = "N/A";
  }
  return string;
}

export function badCityCheck(cityName) {
  if (cityName !== null && typeof cityName !== "undefined" && cityName !== "") {
    var namefix = cityName.toLowerCase();
    if (namefix === "client" || namefix === "customer" || namefix.length < 2) {
      return "N/A";
    }
  } else {
    return "N/A";
  }

  return cityName;
}
export function setBodyClass(classesArray: string[]) {
  document.body.classList.remove(...document.body.classList);
  document.body.classList.add(...classesArray);
}

export function getCategoryLinks(
  jsonDataGroups,
  lang
): Types.type_linkList[] | null {
  if (typeof jsonDataGroups !== "undefined" && jsonDataGroups !== null) {
    let categoryLinks: Types.type_linkList[] = [];
    jsonDataGroups.forEach((group) => {
      if (Constants.isEnvironmentTCAT && !isHeavyEquipmentCategory(group)) {
        return;
      } //skip non-heavy for tcat
      categoryLinks.push({
        linkText: group["group-display-name"] + " (" + group.count + ")",
        linkUrl: getListingPageUrl(lang, group["group-code"], false),
        groupCodeSlug: slug(group["group-code"]),
      });
    });
    categoryLinks.sort(function (a, b) {
      //sort alphabeticaly
      if (a.linkText < b.linkText) {
        return -1;
      }
      if (a.linkText > b.linkText) {
        return 1;
      }
      return 0;
    });
    return categoryLinks;
  } else {
    return null;
  }
}

export function formatHours(hours: number, lang: string) {
  var formattedHrs;
  var seperator = "";
  if (hours >= 10000) {
    seperator = " ";
  }

  if (lang === "fr" && hours > 0) {
    formattedHrs = accounting.formatMoney(hours, "", 0, seperator);
  } else if (hours > 0) {
    formattedHrs = accounting.formatMoney(hours, "", 0);
  } else {
    formattedHrs = "---";
  }
  return formattedHrs;
}
export function getProductPhotoSrc(data, num) {
  let machineImage = Constants.IMAGES.NOIMG_DEFAULTSRC_BFERENTAL;

  if (
    typeof data.photos != "undefined" &&
    typeof data.photos[num] != "undefined"
  ) {
    if (typeof data.photos[num]["text"] != "undefined") {
      machineImage = data.photos[num]["text"].replace("http://", "//");
    } else if (typeof data.photos[num]["uri"] != "undefined") {
      machineImage = data.photos[num]["uri"].replace("http://", "//");
    }
  }
  return machineImage;
}
export function handleImageLoadError(e) {
  e.target.src = Constants.IMAGES.NOIMG_DEFAULTSRC_BFERENTAL;
}

export function getProductName(jsonDataProduct: Types.Type_jsonModelDetails) {
  return (
    (jsonDataProduct.year ? jsonDataProduct.year + " " : "") +
    (jsonDataProduct.manufacturer != null
      ? jsonDataProduct.manufacturer + " "
      : "") +
    (jsonDataProduct.model != null ? jsonDataProduct.model : "")
  );
}

export function getDealerName(jsonDataProduct: Types.Type_jsonModelDetails) {
  return jsonDataProduct["dealer-name"];
}

export function cityGroupingValue(cityName) {
  if (cityName) {
    var grpValue = _.deburr(badCityCheck(cityName));

    grpValue = grpValue.toLowerCase();
    grpValue = grpValue.split("'").join(""); //apostrophe
    grpValue = grpValue.split(")").join(""); //r bracket
    grpValue = grpValue.split("(").join(""); //l bracket
    grpValue = grpValue.split(".").join(""); //period
    grpValue = grpValue.split(" ").join(""); //spaces
    grpValue = grpValue.split("/").join(""); //slash
    grpValue = grpValue.split("|").join(""); //pipe
    grpValue = grpValue.split("-").join(""); //dashes
    return grpValue;
  } else {
    return "na";
  }
}

export function hasWord(product, keyword) {
  if (typeof keyword === "undefined") {
    keyword = "";
  } else {
    //strip junk words from search
    keyword = keyword.replace(/for/gi, "");
    keyword = keyword.replace(/sale/gi, "");
    keyword = keyword.replace(/used/gi, "");
    keyword = keyword.replace(/heavy/gi, "");
    keyword = keyword.replace(/equipment/gi, "");
    keyword = keyword.replace(/for sale/gi, "");
    keyword = keyword.replace(/canada/gi, "");
    keyword = keyword.replace(/toromont/gi, "");
    keyword = keyword.replace(/construction/gi, "");
    keyword = keyword.replace(/\+/g, " ");
  }
  let foundAllWords = true;
  const split = keyword.split(" ");

  //split by each word so can check that all words are found
  for (let i = 0; i < split.length; ++i) {
    let foundCurWord = false;

    //everything is deburred and lowercased to avoid differences in text characters
    const curWord = _.deburr(split[i].toLowerCase());

    /*model*/
    if (
      product.model != null &&
      _.deburr(product.model).toLowerCase().indexOf(curWord) > -1
    ) {
      foundCurWord = true;
    }
    /*year*/
    if (
      product.year != null &&
      product.year.toLowerCase().indexOf(curWord) > -1
    ) {
      foundCurWord = true;
    }
    /*unit number - must match entirety*/
    if (
      typeof product["stock-number"] != "undefined" &&
      product["stock-number"] != null &&
      _.deburr(product["stock-number"]).toLowerCase() === curWord
    ) {
      //not using indexof = strict search full stock num
      foundCurWord = true;
    }
    /*serial number - must match entirety*/
    if (
      typeof product["serial-number"] != "undefined" &&
      product["serial-number"] != null &&
      _.deburr(product["serial-number"]).toLowerCase() === curWord
    ) {
      //not using indexof = strict search full serial num
      foundCurWord = true;
    }
    /*category display name*/
    if (
      typeof product["product-family-categories"] != "undefined" &&
      product["product-family-categories"]["category"] != null &&
      product["product-family-categories"]["category"][
      "category-display-name"
      ] != null &&
      _.deburr(
        product["product-family-categories"]["category"][
        "category-display-name"
        ]
      )
        .toLowerCase()
        .indexOf(curWord) > -1
    ) {
      foundCurWord = true;
    }
    /*category-code*/
    if (
      typeof product["product-family-categories"] != "undefined" &&
      product["product-family-categories"]["category"] != null &&
      product["product-family-categories"]["category"]["category-code"] !=
      null &&
      _.deburr(
        product["product-family-categories"]["category"]["category-code"]
      )
        .toLowerCase()
        .indexOf(curWord) > -1
    ) {
      foundCurWord = true;
    }
    /*product-family-code*/
    if (
      typeof product["product-family-display-name"] != "undefined" &&
      _.deburr(product["product-family-display-name"])
        .toLowerCase()
        .indexOf(curWord) > -1
    ) {
      foundCurWord = true;
    }
    /*city*/
    if (
      product.city != null &&
      _.deburr(product.city).toLowerCase().indexOf(curWord) > -1
    ) {
      foundCurWord = true;
    }
    /*province - check against both eng and fr*/
    if (
      product.state != null &&
      (_.deburr(getProvinceName(product.state, "en"))
        .toLowerCase()
        .indexOf(curWord) > -1 ||
        _.deburr(getProvinceName(product.state, "fr"))
          .toLowerCase()
          .indexOf(curWord) > -1)
    ) {
      foundCurWord = true;
    }
    /*make*/
    if (
      product.manufacturer != null &&
      _.deburr(product.manufacturer).toLowerCase().indexOf(curWord) > -1
    ) {
      foundCurWord = true;
    }

    const seoDescs: Types.types_seoData = getSeoContentByCatCode(
      slug(product["product-family-categories"]["category"]["category-code"])
    );
    const seoDescEn = stripHtml(renderToString(seoDescs.EN.Desc));
    const seoDescFr = stripHtml(renderToString(seoDescs.EN.Desc));

    /*category descriptions english*/
    //search full family description - html parsed to unescape characters
    if (
      seoDescs.CatCode !== "Default" &&
      (_.deburr(seoDescEn).toLowerCase().indexOf(curWord) > -1 ||
        _.deburr(seoDescFr).toLowerCase().indexOf(curWord) > -1)
    ) {
      foundCurWord = true;
    }

    //must have found each word in order for foundAllWords to be true
    if (foundCurWord === false) {
      foundAllWords = false;
    }
  }
  return foundAllWords;
}

function stripHtml(html) {
  var regex = /(&nbsp;|<([^>]+)>)/gi,
    body = html,
    result = body.replace(regex, " ");
  return result;
}

export function checkEnvironment(envToCompare?) {
  if (
    envToCompare &&
    process !== null &&
    process.env !== null &&
    process.env.REACT_APP_DEPLOYMENT_ENVIRONMENT !== null
  ) {
    if (process.env.REACT_APP_DEPLOYMENT_ENVIRONMENT === envToCompare) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}



export function getProvinceName(origName, lang) {
  let fullName = origName;
  if (origName.length < 3) {
    //name is abbreviation
    switch (origName) {
      case "NL":
        fullName = "Newfoundland and Labrador"; break;
      case "PE":
        fullName = "Prince Edward Island"; break;
      case "NS":
        fullName = "Nova Scotia"; break;
      case "NB":
        fullName = "New Brunswick"; break;
      case "ON":
        fullName = "Ontario"; break;
      case "QC":
        fullName = "Quebec"; break;
      case "MB":
        fullName = "Manitoba"; break;
      case "SK":
        fullName = "Saskatchewan"; break;
      case "AB":
        fullName = "Alberta"; break;
      case "YT":
        fullName = "Yukon"; break;
      case "NU":
        fullName = "Nunavut"; break;
      case "NT":
        fullName = "Northwest Territories"; break;
      case "BC":
        fullName = "British Columbia"; break;
      default:
        fullName = "Other"; break;
    }
  }

  return lang === "fr" ? getProvinceNameInFrench(fullName) : fullName;
}

export function getProvinceNameInFrench(originalName) {
  switch (originalName) {
    case "Newfoundland and Labrador":
      return "Terre-Neuve-et-Labrador";
    case "Prince Edward Island":
      return "Île-du-Prince-Édouard";
    case "Nova Scotia":
      return "Nouvelle-Écosse";
    case "New Brunswick":
      return "Nouveau-Brunswick";
    case "Quebec":
      return "Québec";
    case "Northwest Territories":
      return "Territoires du Nord-Ouest";
    case "British Columbia":
      return "Colombie-Britannique";
    default:
      return originalName;
  }
}

export function cityDisplayName(cityName) {
  var dispName = cityName;
  dispName = dispName.toUpperCase();
  dispName = dispName.split("- ").join("-");
  return dispName;
}

export const getSearchFiltersFromUrl = (
  categoryClass: string,
  category: string,
  urlParams: string[]
): Types.searchFilters => ({
  categoryClass: categoryClass,
  category: category,
  sortBy: urlParams[Constants.PARAMS.SORT],
  make: urlParams[Constants.PARAMS.MAKE],
  maxPrice: urlParams[Constants.PARAMS.PRICE_MAX],
  keyword: urlParams[Constants.PARAMS.KEYWORD],
  province: urlParams[Constants.PARAMS.PROVINCE],
  yearMin: ConverterNumber(urlParams[Constants.PARAMS.YEAR_MIN]),
  yearMax: ConverterNumber(urlParams[Constants.PARAMS.YEAR_MAX]),
  hoursMax: urlParams[Constants.PARAMS.HOURS_MAX],
  city: urlParams[Constants.PARAMS.CITY],
  certifiedOnly: urlParams[Constants.PARAMS.CERTIFIED] === "1",
  battlefieldInventory: urlParams[Constants.PARAMS.CERTIFIED] === "2",
  rentalFleetAvailability: urlParams[Constants.PARAMS.CERTIFIED] === "3",
  rentalFleetWithImages: urlParams[Constants.PARAMS.CERTIFIED] === "4",
  viewFaves:
    category === Constants.URLFAVES_EN || category === Constants.URLFAVES_FR,
  viewDeals: category === "deals",
});

// export function getUrlParams(catCode) {
//     let urlParams: Types.searchFilters = {
//         categoryClass: Constants.CLASS_HEAVY,
//         category: catCode,
//         sortBy: urlParam(Constants.PARAMS.SORT),
//         make: urlParam(Constants.PARAMS.MAKE),
//         maxPrice: !isNaN(Number(urlParam(Constants.PARAMS.PRICE_MAX))) ? Number(urlParam(Constants.PARAMS.PRICE_MAX)) : null,
//         keyword: urlParam(Constants.PARAMS.KEYWORD),
//         province: urlParam(Constants.PARAMS.PROVINCE),
//         yearMin: !isNaN(Number(urlParam(Constants.PARAMS.YEAR_MIN))) ? Number(urlParam(Constants.PARAMS.YEAR_MIN)) : null,
//         yearMax: !isNaN(Number(urlParam(Constants.PARAMS.YEAR_MAX))) ? Number(urlParam(Constants.PARAMS.YEAR_MAX)) : null,
//         hoursMax: !isNaN(Number(urlParam(Constants.PARAMS.HOURS_MAX))) ? Number(urlParam(Constants.PARAMS.HOURS_MAX)) : null,
//         city: urlParam(Constants.PARAMS.CITY),
//         certifiedOnly: (urlParam(Constants.PARAMS.CERTIFIED) === 1),
//         viewFaves: (urlParam(Constants.PARAMS.VIEW_FAVES) === 1),
//         viewDeals: (urlParam(Constants.PARAMS.VIEW_DEALS)===1)
//     }
//     if (urlParam(Constants.PARAMS.CLASS) === Constants.URLPOWER_EN || urlParam(Constants.PARAMS.CLASS) === Constants.URLPOWER_FR) {
//         urlParams.categoryClass = Constants.CLASS_POWER;
//         if (catCode===Constants.URLPOWER_SLUG){urlParams.category=null;}//fix for power class
//     } else {
//         urlParams.categoryClass = Constants.CLASS_HEAVY;
//     }
//     //fix category if default no category word
//     if (catCode === Constants.ALLFAMSWORD_EN || catCode === Constants.ALLFAMSWORD_FR) {
//         urlParams.category = null;
//     }
//     return urlParams;
// }

export function formatPrice(
  price,
  lang,
  inclCurTxt?: boolean,
  currency?: "USD" | "CAD",
  receivedCurrency?: string
) {
  let formattedPrice = price;

  let usaRate = 0.77;

  if (lang === "fr") {
    //FRENCH
    const currencyText = inclCurTxt ? "CAD" : "";

    if (currency != null && currency === "USD") {
      //USD
      formattedPrice =
        accounting.formatMoney(Number(price) * usaRate, "", 0, " ") +
        " $" +
        currencyText;
    } else {
      //CAD
      formattedPrice =
        accounting.formatMoney(price, "", 0, " ") + " $" + currencyText;
    }
    // Alter conversions for BFE (French)
    if (Constants.isEnvironmentBFE_or_BFERENTAL) {
      if (currency !== receivedCurrency) {
        formattedPrice =
          receivedCurrency === "CAD"
            ? accounting.formatMoney(Number(price) * usaRate, " ", " ") + " $"
            : accounting.formatMoney(Number(price) / usaRate, " ", " ") + " $";
      } else {
        formattedPrice =
          accounting.formatMoney(Number(price), " ", " ") +
          " " +
          " $" +
          " " +
          currencyText;
      }
    }
  } else {
    //ENGLISH
    const currencyText = inclCurTxt ? " CAD" : "";
    if (currency != null && currency === "USD") {
      //USD
      formattedPrice =
        accounting.formatMoney(Number(price) * usaRate, "$", 0) + currencyText;
    } else {
      //CAD
      formattedPrice = accounting.formatMoney(price, "$", 0) + currencyText;
    }

    // check undefined logic goes here

    // Alter conversions for BFE (English) on single product pages
    if (Constants.isEnvironmentBFE_or_BFERENTAL) {
      if (currency !== receivedCurrency) {
        formattedPrice =
          receivedCurrency === "CAD"
            ? accounting.formatMoney(Number(price) * usaRate, "$", 0) +
            currencyText
            : accounting.formatMoney(Number(price) / usaRate, "$", 0) +
            currencyText;
      } else {
        formattedPrice =
          accounting.formatMoney(Number(price), "$", 0) + currencyText;
        // this shows up on ALL prices (cdn or usd) on the listings page, and ONLY
        // on American prices on the single products.
      }
    }
  }
  return formattedPrice;
}
export function formatNumberText(textInputValue, lang) {
  if (Number(textInputValue) > 0) {
    return outputEnFr(
      accounting.formatMoney(textInputValue, "", 0),
      accounting.formatMoney(textInputValue, "", 0, " "),
      lang
    );
  }
  return "";
}

export const ConverterString = (value: any) => {
  if (value === null || value === undefined || typeof value === "string")
    return value;

  return value.toString();
};

export const ConverterBoolean = (value: any) => {
  if (value === null || value === undefined || typeof value === "boolean")
    return value;

  return value.toString() === "true";
};

export const ConverterNumber = (value: any) => {
  if (value === null || value === undefined || typeof value === "number")
    return value;

  return parseFloat(value.toString());
};

//function to get cookie
export function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
