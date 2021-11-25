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

type props_InputHoursMax = {
  lang: string;
  filters: Types.searchFilters;
  onSearchFilterChange;
  showSlider: boolean;
  famData?; //only needed for slider values/listing page
  onKeyPress?; //only needed for home page
};

const InputHoursMax = (props: props_InputHoursMax) => {
  let lowestHours = 0;
  let highestHours = 99999;
  if (props.famData && props.showSlider) {
    const highestHoursModel = _.maxBy(props.famData, function (o) {
      return o.hours;
    });
    const lowestHoursModel = _.minBy(props.famData, function (o) {
      if (o.hours && o.hours > -1) {
        return o.hours;
      }
    });
    if (typeof lowestHoursModel != "undefined") {
      lowestHours = lowestHoursModel.hours;
    }
    if (typeof highestHoursModel != "undefined") {
      highestHours = highestHoursModel.hours;
    }
  }
  const defaultSliderValue = props.filters.hoursMax || highestHours;

  const [textInputValue, setTextInputValue] = useState(
    ConverterNumber(props.filters.hoursMax)
  );
  const [isUserUpdatingSlider, setIsUserUpdatingSlider] = useState(false); //prevents issues from category changing
  const [sliderCurrentValue, setSliderCurrentValue] = useState(
    defaultSliderValue
  );

  const rangeSliderMinimum = lowestHours;
  const rangeSliderMaximum = highestHours;

  useEffect(() => {
    //update values from prop change, mainly url change from going back/forward in browser
    //update yearMax
    setTextInputValue(ConverterNumber(props.filters.hoursMax));
    setSliderCurrentValue(props.filters.hoursMax || highestHours);
  }, [props.filters.hoursMax, highestHours]);

  const onInputboxChange = (e) => {
    const newHoursMax = numberClean(e.target.value);
    setTextInputValue(newHoursMax); //update its own value
    setSliderCurrentValue(newHoursMax); //update slider to match typed value
    updateFilters(newHoursMax); //update filters parent state
  };

  function onSliderBeforeChange(value) {
    setIsUserUpdatingSlider(true);
  }
  function onSliderChange(value) {
    if (isUserUpdatingSlider) {
      //only change if customer controlling slider
      setSliderCurrentValue(value); //update its own value
      setTextInputValue(ConverterNumber(value)); //update text input to match slider value
    }
  }
  function onSliderFinishedChange(value) {
    updateFilters(value); //update filters parent state
    setIsUserUpdatingSlider(false);
  }

  const updateFilters = (newMaxHours) => {
    const updatedSearchFilters: Types.searchFilters = {
      ...props.filters,
      hoursMax: newMaxHours,
    };
    props.onSearchFilterChange(updatedSearchFilters);
  };

  return (
    <>
      <label htmlFor="product-hoursmax">
        {outputEnFr("Maximum hours:", "Maximum d'heures:", props.lang)}
      </label>

      <input
        id="product-hoursmax"
        name="product-hoursmax"
        type="text"
        className="form-control"
        placeholder={outputEnFr("Enter hours", "Entrer les heures", props.lang)}
        onChange={(e) => onInputboxChange(e)}
        onKeyPress={props.onKeyPress ? (e) => props.onKeyPress(e) : undefined}
        value={formatNumberText(textInputValue, props.lang) || ""}
      />
      {props.showSlider ? (
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
          ariaLabelForHandle={["maximum hours"]}
        />
      ) : null}
    </>
  );
};
InputHoursMax.whyDidYouRender = true;
export default InputHoursMax;
