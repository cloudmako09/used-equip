import React, { useState, useEffect } from "react";
import * as Types from "../../common/Types";
import { outputEnFr, ConverterNumber } from "../../common/HelperFunctions";
import { Range } from "rc-slider";
import _ from "lodash";

type Props_InputYearMinMax = {
  lang: string;
  filters: Types.searchFilters;
  onSearchFilterChange;
  showSlider: boolean;
  famData?; //only needed for slider value/listing page
  onKeyPress?; //only needed for home page
};

const InputYearMinMax = (props: Props_InputYearMinMax) => {
  const currentYear = new Date().getFullYear();
  let oldestModelYear = 1960; //default
  if (props.famData && props.showSlider) {
    const oldestModel = _.minBy(props.famData, function (o) {
      return o.year;
    });
    if (typeof oldestModel != "undefined") {
      oldestModelYear = oldestModel.year;
    }
  }
  let rangeSliderMinimum = ConverterNumber(oldestModelYear);
  let rangeSliderMaximum = currentYear;

  const defaultSliderValueMin = props.filters.yearMin || rangeSliderMinimum;
  const defaultSliderValueMax = props.filters.yearMax || rangeSliderMaximum;

  const [textInputValueMin, setTextInputValueMin] = useState(
    ConverterNumber(props.filters.yearMin)
  );
  const [textInputValueMax, setTextInputValueMax] = useState(
    ConverterNumber(props.filters.yearMax)
  );
  const [sliderCurrentValueMin, setSliderCurrentValueMin] = useState(
    defaultSliderValueMin
  );
  const [sliderCurrentValueMax, setSliderCurrentValueMax] = useState(
    defaultSliderValueMax
  );
  const [isUserUpdatingSlider, setIsUserUpdatingSlider] = useState(false); //prevents issues from category changing

  useEffect(() => {
    //update values from prop change, mainly url change from going back/forward in browser
    //update yearMin
    setTextInputValueMin(ConverterNumber(props.filters.yearMin));
    setSliderCurrentValueMin(props.filters.yearMin || defaultSliderValueMin);
    //update yearMax
    setTextInputValueMax(ConverterNumber(props.filters.yearMax));
    setSliderCurrentValueMax(props.filters.yearMax || defaultSliderValueMax);
  }, [
    props.filters.yearMin,
    props.filters.yearMax,
    props.famData,
    defaultSliderValueMin,
    defaultSliderValueMax,
  ]);

  /*text box updates*/
  const onYearMinChange = (e) => {
    const newYearMin = e.target.value;
    console.log("onYearMinChange", newYearMin);
    setTextInputValueMin(newYearMin); //update its own value
    setSliderCurrentValueMin(newYearMin); //update slider to match typed value

    const updatedSearchFilters: Types.searchFilters = {
      ...props.filters,
      yearMin: newYearMin,
    };
    props.onSearchFilterChange(updatedSearchFilters); //update filters parent state
  };

  const onYearMaxChange = (e) => {
    let newYearMax = e.target.value;

    setTextInputValueMax(newYearMax); //update its own value
    setSliderCurrentValueMax(newYearMax); //update slider to match typed value

    const updatedSearchFilters: Types.searchFilters = {
      ...props.filters,
      yearMax: newYearMax,
    };
    props.onSearchFilterChange(updatedSearchFilters); //update filters parent state
  };

  /*slider updates*/
  function onSliderBeforeChange(value) {
    setIsUserUpdatingSlider(true);
  }
  function onSliderChange(value) {
    const newMin = value[0];
    const newMax = value[1];
    if (isUserUpdatingSlider) {
      setSliderCurrentValueMin(newMin); //update its own value
      setSliderCurrentValueMax(newMax); //update its own value
      setTextInputValueMin(ConverterNumber(newMin)); //update text input to match slider value
      setTextInputValueMax(ConverterNumber(newMax)); //update text input to match slider value
    }
  }

  function onSliderFinishedChange(value) {
    const newMin = value[0];
    const newMax = value[1];
    const minYearChanged: boolean = newMin !== props.filters.yearMin;
    const maxYearChanged: boolean = newMax !== props.filters.yearMax;
    if (minYearChanged || maxYearChanged) {
      console.log("slider change:", value); //eslint-disable-line
      let updatedSearchFilters: Types.searchFilters = {
        ...props.filters,
      };
      if (minYearChanged) {
        console.log("Min year updated: " + newMin);
        setTextInputValueMin(newMin);
        updatedSearchFilters.yearMin = newMin;
      }
      if (maxYearChanged) {
        console.log("Max year updated: " + newMax);
        setTextInputValueMax(newMax);
        updatedSearchFilters.yearMax = newMax;
      }
      props.onSearchFilterChange(updatedSearchFilters);
    }
    setIsUserUpdatingSlider(false);
  }

  return (
    <>
      <label
        htmlFor="product-yearmin"
        className="data-fr"
        data-fr="Année du modèle:"
      >
        {outputEnFr("Model year:", "Année du modèle:", props.lang)}
      </label>
      <br />
      <input
        id="product-yearmin"
        name="product-yearmin"
        type="number"
        className="form-control"
        placeholder="Minimum"
        onChange={(e) => onYearMinChange(e)}
        onKeyPress={props.onKeyPress ? (e) => props.onKeyPress(e) : undefined}
        value={textInputValueMin || ""}
      />

      <input
        id="product-yearmax"
        name="product-yearmax"
        type="number"
        className="form-control"
        aria-label="product year max"
        value={textInputValueMax || ""}
        placeholder="Maximum"
        onKeyPress={props.onKeyPress ? (e) => props.onKeyPress(e) : undefined}
        onChange={(e) => onYearMaxChange(e)}
      />
      {props.showSlider ? (
        <Range
          defaultValue={[sliderCurrentValueMin, sliderCurrentValueMax]}
          value={[sliderCurrentValueMin, sliderCurrentValueMax]}
          allowCross={false}
          onBeforeChange={(e) => onSliderBeforeChange(e)}
          onChange={(e) => onSliderChange(e)}
          onAfterChange={(e) => onSliderFinishedChange(e)}
          min={rangeSliderMinimum}
          max={rangeSliderMaximum}
          ariaLabelGroupForHandles={["min model year", "max model year"]}
        />
      ) : (
        <></>
      )}
    </>
  );
};
InputYearMinMax.whyDidYouRender = true;
export default InputYearMinMax;
