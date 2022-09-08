import React from "react";
import * as Types from "../../common/Types";
import SelectManufacturer from "../../listings/components/SelectManufacturer";
import InputHoursMax from "../../listings/components/InputHoursMax";
import InputYearMinMax from "../../listings/components/InputYearMinMax";
import Collapse from "@kunukn/react-collapse";

type Props_AdvancedFilters = {
  lang: string;
  filters: Types.searchFilters;
  onSearchFilterChange;
  open: boolean;
  handleKeyPressSubmitSearch;
};

const AdvancedFilters = ({
  lang,
  filters,
  onSearchFilterChange,
  open,
  handleKeyPressSubmitSearch,
}: Props_AdvancedFilters) => {
  return (
    <Collapse isOpen={open}>
      <div id="advancedFilters" className="row">
        <div id="col-make" className="col-xs-12 col-sm-4 col-filters">
          <SelectManufacturer
            lang={lang}
            filters={filters}
            onSearchFilterChange={onSearchFilterChange}
            onKeyPress={handleKeyPressSubmitSearch}
          />
        </div>
        <div id="col-hours" className="col-xs-12 col-sm-4 col-filters">
          <InputHoursMax
            lang={lang}
            filters={filters}
            onSearchFilterChange={onSearchFilterChange}
            onKeyPress={handleKeyPressSubmitSearch}
            showSlider={false}
          />
        </div>
        <div id="col-year" className="col-xs-12 col-sm-4 col-filters">
          <InputYearMinMax
            lang={lang}
            filters={filters}
            onSearchFilterChange={onSearchFilterChange}
            onKeyPress={handleKeyPressSubmitSearch}
            showSlider={false}
          />
        </div>
      </div>
    </Collapse>
  );
};

export default AdvancedFilters;
