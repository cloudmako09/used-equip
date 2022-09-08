import React from "react";
import { outputEnFr } from "../../common/HelperFunctions";
import * as Types from "../../common/Types";
import {
  getProvinceName,
  saferString,
  cityGroupingValue,
  cityDisplayName,
  badCityCheck,
} from "../../common/HelperFunctions";
import _ from "lodash";
import { isEnvironmentTCAT } from "../../common/Constants";

type Props_SelectProvinceAndCity = {
  lang: string;
  filters: Types.searchFilters;
  onSearchFilterChange;
  famData;
};

type type_citylist = {
  value: string;
  displayName: string;
  province: string;
};
type type_provincelist = {
  value: string;
  displayName: string;
};
export default class SelectProvinceAndCity extends React.PureComponent<Props_SelectProvinceAndCity> {
  onCitySelectboxChange = (e) => {
    let newCity = e.target.value;
    if (newCity === "") {
      newCity = null;
    }
    const updatedSearchFilters: Types.searchFilters = {
      ...this.props.filters,
      city: newCity,
    };

    this.props.onSearchFilterChange(updatedSearchFilters);
  };

  onProvinceSelectChange = (e) => {
    let newProvince = e.target.value;
    let selectedCity = this.props.filters.city;
    if (newProvince === "") {
      newProvince = null;
    }

    const foundCityInList = this.getCityList(newProvince).find(
      (o) => o.value === selectedCity
    );
    if (selectedCity && !foundCityInList) {
      //reset city to null if not in list due to province change
      selectedCity = null;
    }

    const updatedSearchFilters: Types.searchFilters = {
      ...this.props.filters,
      province: newProvince,
      city: selectedCity,
    };

    this.props.onSearchFilterChange(updatedSearchFilters);
  };

  getCityList = (checkProv?) => {
    //only shows current province if one is selected
    //checkProv allows to get list for specific province instead of what is in filters
    const UsedDataCities = _.chain(this.props.famData)
      .sortBy(function (o) {
        return cityGroupingValue(o.city);
      })
      .groupBy(function (o) {
        return cityGroupingValue(o.city);
      })
      .value();
    let filters_Province = this.props.filters.province;
    if (checkProv) {
      filters_Province = checkProv;
    }
    let list_cities: type_citylist[] = [];

    Object.keys(UsedDataCities).forEach(function (x) {
      if (UsedDataCities[x][0] == null) {
        return;
      }
      var curCity = badCityCheck(UsedDataCities[x][0]["city"]);
      var curProv = saferString(UsedDataCities[x][0]["state"]);
      if (
        curCity === "N/A" ||
        (filters_Province && filters_Province !== curProv)
      ) {
        return;
      }
      list_cities.push({
        value: cityGroupingValue(curCity),
        displayName: cityDisplayName(curCity),
        province: curProv,
      });
    });

    return list_cities;
  };

  getProvincesList = () => {
    const curLang = this.props.lang;

    let UsedDataProvinces = _.chain(this.props.famData)
      .sortBy(function (o) {
        return _.deburr(getProvinceName(o.state, curLang));
      })
      .groupBy("state")
      .value();

    let list_provinces: type_provincelist[] = [];

    Object.keys(UsedDataProvinces).forEach(function (x) {
      if (UsedDataProvinces[x][0] == null) {
        return;
      }
      const curProv = saferString(UsedDataProvinces[x][0].state);
      let provinceDisplayName = getProvinceName(curProv, curLang); //get different display name if abbreviation OR translation needed

      if (
        isEnvironmentTCAT &&
        (curProv === "IL" || provinceDisplayName === "Other")
      ) {
        return;
      }
      if (
        list_provinces.findIndex((o) => o.displayName === provinceDisplayName) <
        0
      ) {
        //Add to array if not includes display name already
        list_provinces.push({
          value: curProv,
          displayName: provinceDisplayName,
        });
      }
    });
    return list_provinces;
  };

  getCitySelectOptions = () => {
    let selectOptions_cities = [
      <option value="" key="n/a">
        {this.props.lang === "en" ? "Search All" : "Voir tout"}
      </option>,
    ];

    const cityList: type_citylist[] = this.getCityList();

    Object.keys(cityList).forEach(function (x) {
      selectOptions_cities.push(
        <option value={cityList[x].value} key={cityList[x].value}>
          {cityList[x].displayName}
        </option>
      );
    });

    return selectOptions_cities;
  };

  getProvincesSelectOptions = () => {
    let selectOptions_provinces = [
      <option value="" key="na">
        {this.props.lang === "en" ? "Search All" : "Voir tout"}
      </option>,
    ];

    const provList: type_provincelist[] = this.getProvincesList();

    Object.keys(provList).forEach(function (x) {
      selectOptions_provinces.push(
        <option value={provList[x].value} key={provList[x].value}>
          {provList[x].displayName}
        </option>
      );
    });
    return selectOptions_provinces;
  };

  render() {
    return (
      <>
        <>
          <label htmlFor="product-province">Province:</label>
          <select
            id="product-province"
            name="product-province"
            onChange={(e) => this.onProvinceSelectChange(e)}
            value={saferString(this.props.filters.province)}
          >
            {this.getProvincesSelectOptions()}
          </select>

          <label htmlFor="product-city">
            {outputEnFr("City:", "Ville:", this.props.lang)}
          </label>
          <select
            id="product-city"
            name="product-city"
            onChange={(e) => this.onCitySelectboxChange(e)}
            value={saferString(this.props.filters.city)}
          >
            {this.getCitySelectOptions()}
          </select>

          <br />
        </>
      </>
    );
  }
}
