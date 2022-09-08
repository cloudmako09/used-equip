import * as Types from "../../common/Types";
import {
  cityGroupingValue,
  hasWord,
} from "../../common/HelperFunctions";
import _ from "lodash";
import { SORT } from "../../common/Constants";
import shoppingCart from "../../../js_vanilla/used-favouriteAddon";
import { isCurrentDeal } from "./listingFunctions";

const getFilteredSearchResults = (filters: Types.searchFilters, famData) => {
  //filter based on all search filters
  let filteredResults = _.filter(famData, function (p) {
    //x is current product data

    //adjust some filters for better results
    let f_yearMax = filters.yearMax;
    if (f_yearMax && f_yearMax < 999) {
      f_yearMax = 0;
    }

    //apply filters
    if (
      typeof p["serial-number"] === "undefined" ||
      (filters.make &&
        filters.make === "Caterpillar" &&
        p.manufacturer != null &&
        p.manufacturer !== "CATERPILLAR") ||
      (filters.make &&
        filters.make === "other" &&
        p.manufacturer != null &&
        p.manufacturer === "CATERPILLAR") ||
      (filters.province &&
        filters.province !== "" &&
        p.state != null &&
        p.state !== filters.province) ||
      (filters.city &&
        ((filters.city !== "N/A" && p.city == null) ||
          (p.city != null &&
            cityGroupingValue(p.city) !== cityGroupingValue(filters.city)))) ||
      (filters.maxPrice &&
        filters.maxPrice > 0 &&
        (p.price == null || Number(p.price.text) > filters.maxPrice)) ||
      (filters.yearMin &&
        filters.yearMin > 0 &&
        (p.year == null || Number(p.year) < filters.yearMin)) ||
      (f_yearMax &&
        f_yearMax > 0 &&
        (p.year == null || Number(p.year) > f_yearMax)) ||
      (filters.hoursMax &&
        filters.hoursMax > 0 &&
        (p.hours == null ||
          Number(p.hours) < 1 ||
          Number(p.hours) > filters.hoursMax)) ||
      (filters.keyword &&
        filters.keyword !== "" &&
        !hasWord(p, filters.keyword)) ||
      // Certified only
      (filters.certifiedOnly &&
        (p.certification == null ||
          p.certification === "None" ||
          p.certification === "Aucune")) ||
      // Consignment Only
      (filters.consignmentOnly &&
        !p.model?.includes("CONSIGNMENT")) ||
      // Battlefield inventory start
      (filters.battlefieldInventory &&
        p["dealer-name"] === "CATERPILLAR FINANCIAL SERVICES CORPORATION") ||
      // Battfield inventory end
      (filters.rentalFleetAvailability && p["availability"] === "No") ||
      (filters.rentalFleetWithImages &&
        (p["photos"] === undefined || !p["photos"].length)) ||
      (
        // If both Rental Fleet checkboxes are checked
        (filters.rentalFleetAvailability
          && p["availability"] === "No"
        ) &&
        (filters.rentalFleetWithImages
          &&
          (p["photos"] === undefined || !p["photos"].length
          ))
      ) ||
      (
        // If both Battlefield Used checkboxes are checked
        (filters.certifiedOnly &&
          (p.certification == null ||
            p.certification === "None" ||
            p.certification === "Aucune")) &&
        (filters.battlefieldInventory &&
          p["dealer-name"] === "CATERPILLAR FINANCIAL SERVICES CORPORATION")
      ) ||
      (filters.viewFaves &&
        !shoppingCart.isItemInCart(
          p.year,
          p.manufacturer,
          p.model,
          p["serial-number"]
        )) ||
      (filters.viewDeals &&
        !isCurrentDeal(p["serial-number"], p["stock-number"]))
    ) {
      return false; // don't include in listings
    }
    else {
      return true;
    }
  });

  ///////////////SORT ORDER
  if (filters.sortBy === SORT.YEAR_LO) {
    //sort by year asc
    filteredResults = _.chain(filteredResults)
      .sortBy(function (o) {
        if (o.price != null) {
          return Number(o.price.text);
        } else {
          return 0;
        }
      }) //asc
      .sortBy("manufacturer") //asc
      .sortBy("year") //asc
      .value();
  } else if (filters.sortBy === SORT.HOURS_LO) {
    //sort by hours asc
    filteredResults = _.chain(filteredResults)
      .sortBy(function (o) {
        return Number(o.hours) || 999999999999999999;
      }) //asc
      .value();
  } else if (filters.sortBy === SORT.HOURS_HI) {
    //sort by hours desc
    filteredResults = _.chain(filteredResults)
      .sortBy(function (o) {
        return Number(o.hours);
      })
      .reverse() //desc
      .value();
  } else if (filters.sortBy === SORT.MODEL_LO) {
    //sort by model asc
    filteredResults = _.chain(filteredResults)
      .sortBy("year") //asc
      .sortBy("model") //asc
      .sortBy("manufacturer") //asc
      .value();
  } else if (filters.sortBy === SORT.MODEL_HI) {
    //sort by model desc
    filteredResults = _.chain(filteredResults)
      .sortBy("year")
      .reverse() //asc
      .sortBy("model")
      .reverse() //desc
      .sortBy("manufacturer") //asc
      .value();
  } else if (filters.sortBy === SORT.PRICE_HI) {
    //sort by price desc
    filteredResults = _.chain(filteredResults)
      .sortBy(function (o) {
        if (o.price != null) {
          return Number(o.price.text);
        } else {
          return 0;
        }
      })
      .reverse() //desc
      .value();
  } else if (filters.sortBy === SORT.PRICE_LO) {
    //sort by price asc
    filteredResults = _.chain(filteredResults)
      .sortBy(function (o) {
        if (o.price != null) {
          return Number(o.price.text);
        } else {
          return 99999999999;
        }
      }) //asc
      .value();
  } else {
    //sort by year desc
    filteredResults = _.chain(filteredResults)
      .sortBy(function (o) {
        if (o.price != null) {
          return Number(o.price.text);
        } else {
          return 0;
        }
      })
      .reverse() //asc
      .sortBy("manufacturer")
      .reverse() //asc
      .sortBy(function (o) {
        return o.year || 0;
      }) //desc
      .reverse()
      .value();
  }
  return filteredResults;
};
export default getFilteredSearchResults;
