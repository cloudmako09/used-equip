import React from "react";
import * as Constants from '../../common/Constants';
import * as Types from '../../common/Types';
import {outputEnFr } from "../../common/HelperFunctions"; 

type Props_SelectClass={
    lang: string,
    filters: Types.searchFilters,
    onSearchFilterChange,
    handleUpdateCatClass
}

const SelectClass = (props:Props_SelectClass) => {


    const onClassChange = (e) => {
        const newClass = e.target.value;

        const updatedSearchFilters: Types.searchFilters = {
            ...props.filters,
            categoryClass: newClass,
            category:null
        };


        props.onSearchFilterChange(updatedSearchFilters);
        props.handleUpdateCatClass(newClass);
    }

    return (
        <>

            <label htmlFor="category-class" >
                {outputEnFr("Product family:", "Famille de produits:", props.lang)}
            </label>
            <select id="category-class" name="category-class" onChange={(e) => onClassChange(e)}
            
             //@ts-ignore - due to value tag
             value={props.filters.categoryClass}
            >

                <option value={Constants.CLASS_HEAVY}> {outputEnFr("Heavy Equipment", "Équipement lourd", props.lang)}</option>
                <option value={Constants.CLASS_POWER}>{outputEnFr("Generators", "Groupes électrogènes", props.lang)}</option>

            </select>

        </>
    );
}
SelectClass.whyDidYouRender = true;
export default SelectClass;