import React from "react";
import * as Types from '../../common/Types'; 
import SelectManufacturer from "../../listings/components/SelectManufacturer";
import InputHoursMax from "../../listings/components/InputHoursMax";
import InputYearMinMax from "../../listings/components/InputYearMinMax";
import Collapse from "@kunukn/react-collapse";

type Props_AdvancedFilters = {
    lang: string,
    filters: Types.searchFilters,
    onSearchFilterChange,
    open:boolean,
    handleKeyPressSubmitSearch
}

class AdvancedFilters extends React.PureComponent <Props_AdvancedFilters> { 
      
    render(){
    return (
    <Collapse  isOpen={this.props.open}> 
        <div id="advancedFilters" className="row" > 
            <div id="col-make" className="col-xs-12 col-sm-4 col-filters"> 
                <SelectManufacturer
                lang={this.props.lang}
                filters={this.props.filters}
                onSearchFilterChange={this.props.onSearchFilterChange}
                onKeyPress={this.props.handleKeyPressSubmitSearch} 
                />
            </div >
            <div
                id="col-hours"
                className="col-xs-12 col-sm-4 col-filters"
            > 
                 <InputHoursMax
                      lang={this.props.lang}
                      filters={this.props.filters}
                      onSearchFilterChange={this.props.onSearchFilterChange}
                      onKeyPress={this.props.handleKeyPressSubmitSearch}
                      showSlider={false} />
            </div>
            <div
                id="col-year"
                className="col-xs-12 col-sm-4 col-filters"
            >
                 <InputYearMinMax                     
                    lang={this.props.lang}
                    filters={this.props.filters}
                    onSearchFilterChange={this.props.onSearchFilterChange} 
                    onKeyPress={this.props.handleKeyPressSubmitSearch}
                    showSlider={false}
                    /> 
            </div>
        </div>
        </Collapse>
    )}
}
export default AdvancedFilters;