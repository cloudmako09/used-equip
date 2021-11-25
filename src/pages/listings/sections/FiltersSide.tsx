import React from "react";
import * as Types from '../../common/Types';
import Collapse from "@kunukn/react-collapse";
import { outputEnFr} from "../../common/HelperFunctions";
import SelectCategory from "../components/SelectCategory";
import CheckboxCertified from "../components/CheckboxCertified";
import SelectManufacturer from "../components/SelectManufacturer";
import InputYearMinMax from "../components/InputYearMinMax";
import InputHoursMax from "../components/InputHoursMax";
import InputPriceMax from "../components/InputPriceMax";
import SelectProvinceAndCity from "../components/SelectProvinceAndCity";
import SelectClass from "../components/SelectClass";
import { isEnvironmentTCAT } from "../../common/Constants";



export type Props_FiltersSide = {
    lang: string,
    filters: Types.searchFilters,
    onSearchFilterChange,
    handleUpdateCatClass,
    jsonDataGroups,
    famData,
    searchResults,
    onClearFilters,
    filtersOpenMobile: boolean
    toggleFiltersOpenMobile
}

class FiltersSide extends React.PureComponent<Props_FiltersSide> {

    render() { 
        return (   <>
            <p className="morefilterslink" onClick={(e) => this.props.toggleFiltersOpenMobile(e)}
                style={this.props.filters.viewDeals || this.props.filters.viewFaves ? { display: "none" } : {}}>
                <span>
                    {this.props.filtersOpenMobile ?
                        outputEnFr("Hide search filters", "Masquer les filtres de recherche", this.props.lang) :
                        outputEnFr("Show advanced filters", "Afficher les filtres de recherche", this.props.lang)}
                </span> &nbsp;
            {this.props.filtersOpenMobile ? <i className="fa fa-angle-up"></i> : <i className="fa fa-angle-down"></i>}
            </p>
            <Collapse isOpen={this.props.filtersOpenMobile} className="collapse-css-transition collapse-mobile-only">
                <div id="advancedFilters">
                    <div id="filtersSection" style={this.props.filters.viewDeals || this.props.filters.viewFaves ? { display: "none" } : {}}>
                        <div className="col-filters">
                            {isEnvironmentTCAT ?
                                <SelectClass
                                    lang={this.props.lang}
                                    filters={this.props.filters}
                                    onSearchFilterChange={this.props.onSearchFilterChange}
                                    handleUpdateCatClass={this.props.handleUpdateCatClass}
                                /> : null}

                            <SelectCategory
                                lang={this.props.lang}
                                filters={this.props.filters}
                                onSearchFilterChange={this.props.onSearchFilterChange}
                                jsonDataGroups={this.props.jsonDataGroups}
                            />

                            <CheckboxCertified
                                lang={this.props.lang}
                                filters={this.props.filters}
                                onSearchFilterChange={this.props.onSearchFilterChange} />

                            <SelectManufacturer
                                lang={this.props.lang}
                                filters={this.props.filters}
                                onSearchFilterChange={this.props.onSearchFilterChange}
                            />

                            <InputYearMinMax
                                lang={this.props.lang}
                                filters={this.props.filters}
                                onSearchFilterChange={this.props.onSearchFilterChange}
                                famData={this.props.famData}
                                showSlider={true}
                            />

                            <InputHoursMax
                                lang={this.props.lang}
                                filters={this.props.filters}
                                onSearchFilterChange={this.props.onSearchFilterChange}
                                famData={this.props.famData}
                                showSlider={true} />

                            <InputPriceMax
                                lang={this.props.lang}
                                filters={this.props.filters}
                                onSearchFilterChange={this.props.onSearchFilterChange}
                                famData={this.props.famData}
                            />

                            <SelectProvinceAndCity
                                lang={this.props.lang}
                                filters={this.props.filters}
                                onSearchFilterChange={this.props.onSearchFilterChange}
                                famData={this.props.famData} />


                            <button tabIndex={0} id="clearFilters" className="btn btn-default clearFilters"
                                onClick={() => this.props.onClearFilters()} >
                                {outputEnFr("Clear all search filters", "Effacer tous les filtres", this.props.lang)}
                            </button>


                        </div>

                    </div>
                </div>
            </Collapse>

        </> 
        )
    }

}
export default FiltersSide;