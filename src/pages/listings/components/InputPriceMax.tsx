import React, { useState, useEffect } from "react";
import * as Types from "../../common/Types";
import {
  outputEnFr,
  ConverterNumber,
  formatNumberText,
} from "../../common/HelperFunctions";
import Slider from "rc-slider";
import { numberClean } from "../../common/SEO/SeoFunctions";
import _ from "lodash";

type Props_InputPriceMax = {
  lang: string;
  filters: Types.searchFilters;
  famData;
  onSearchFilterChange;
};

const InputPriceMax = (props: Props_InputPriceMax) => {
  let lowestPrice = 0;
  let highestPrice = 9999999;
  const highestPriceModel = _.maxBy(props.famData, function (o) {
    if (o.price && Number(o.price.text) > -1) {
      return Number(o.price.text);
    }
  });
  const lowestPriceModel = _.minBy(props.famData, function (o) {
    if (o.price && Number(o.price.text) > -1) {
      return Number(o.price.text);
    }
  });

  if (typeof lowestPriceModel != "undefined") {
    lowestPrice = Number(lowestPriceModel.price.text);
  }
  if (typeof highestPriceModel != "undefined") {
    highestPrice = Number(highestPriceModel.price.text);
  }
  const defaultSliderValue = props.filters.maxPrice || highestPrice;

  const [textInputValue, setTextInputValue] = useState(
    ConverterNumber(props.filters.maxPrice)
  );
  const [sliderCurrentValue, setSliderCurrentValue] = useState(
    defaultSliderValue
  );
  const [isUserUpdatingSlider, setIsUserUpdatingSlider] = useState(false); //prevents issues from category changing

  useEffect(() => {
    //update values from prop change, mainly url change from going back/forward in browser
    //update yearMax
    setTextInputValue(ConverterNumber(props.filters.maxPrice));
    setSliderCurrentValue(props.filters.maxPrice || highestPrice);
  }, [props.filters.maxPrice, highestPrice]);

  const rangeSliderMinimum = lowestPrice;
  const rangeSliderMaximum = highestPrice;

  const onInputboxChange = (e) => {
    const newMaxPrice = numberClean(e.target.value);
    setTextInputValue(newMaxPrice); //update its own value
    setSliderCurrentValue(newMaxPrice); //update slider to match typed value
    updateFilters(newMaxPrice); //update filters parent state
  };

  function onSliderBeforeChange(value) {
    setIsUserUpdatingSlider(true);
  }
  function onSliderChange(value) {
    if (isUserUpdatingSlider) {
      setSliderCurrentValue(value); //update its own value
      setTextInputValue(ConverterNumber(value)); //update text input to match slider value
    }
  }

  function onSliderFinishedChange(value) {
    updateFilters(value); //update filters parent state
    setIsUserUpdatingSlider(false);
  }

  const updateFilters = (newMaxPrice) => {
    const updatedSearchFilters: Types.searchFilters = {
      ...props.filters,
      maxPrice: newMaxPrice,
    };
    props.onSearchFilterChange(updatedSearchFilters);
  };

  return (
    <>
      <label htmlFor="product-price">
        {outputEnFr("Maximum price:", "Prix maximum:", props.lang)}
      </label>
      <div id="product-price-wrap" className="input-group">
        <span className="input-group-addon">
          <span>$</span>
        </span>
        <input
          id="product-price"
          className="form-control"
          name="product-price"
          type="text"
          placeholder="(CAD)"
          onChange={(e) => onInputboxChange(e)}
          value={formatNumberText(textInputValue, props.lang) || ""}
        />
      </div>
      <Slider
        value={sliderCurrentValue}
        defaultValue={sliderCurrentValue}
        allowCross={false}
        onBeforeChange={(e) => onSliderBeforeChange(e)}
        onChange={(e) => onSliderChange(e)}
        onAfterChange={(e) => onSliderFinishedChange(e)}
        min={rangeSliderMinimum}
        max={rangeSliderMaximum}
        disabled={rangeSliderMinimum === rangeSliderMaximum}
        ariaLabelForHandle={["maximum price"]}
      />
    </>
  );
};
InputPriceMax.whyDidYouRender = true;
export default InputPriceMax;
