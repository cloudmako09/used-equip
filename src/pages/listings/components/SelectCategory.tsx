import React from "react"; 
import * as Types from '../../common/Types';
import {  outputEnFr, sortGroupsByDisplayName } from "../../common/HelperFunctions";
import { slug } from "../../common/SEO/SeoFunctions";  

type Props_SelectCategory={
    lang: string,
    filters: Types.searchFilters,
    onSearchFilterChange,
    jsonDataGroups
}

const SelectCategory = (props: Props_SelectCategory) => {


    const onCategoryChange = (e) => {
        const newCategory = e.target.value;

        const updatedSearchFilters: Types.searchFilters = {
            ...props.filters,
            category: newCategory
        };

        props.onSearchFilterChange(updatedSearchFilters);
    }



    const getCategoryDropdownOptions = () => {
        let selectOptions_fam = [<option value='' key='default'>{(props.lang === "en" ? "Search All Categories" : "Rechercher toutes les catégories")}</option>];
        const UsedData = sortGroupsByDisplayName(props.jsonDataGroups);
        Object.keys(UsedData).forEach(function (x) {  
            if (UsedData[x] == null) { return; }
            var famCount = UsedData[x].count;
            var famName = UsedData[x]['group-display-name'];
            var famCode = UsedData[x]['group-code']; 
           
                selectOptions_fam.push(
                    <option value={slug(famCode)} key={slug(famCode)} >
                        {famName} ({famCount})
                        </option>
                );
            
        });
        return selectOptions_fam;
    }

    return (
        <>
            <label htmlFor="product-family"> {outputEnFr("Category:", "Catégorie:", props.lang)}</label>
         
            <select id="product-family" name="product-family" 
            //@ts-ignore - due to value tag
            value={props.filters.category || ""} 
                onChange={(e) => onCategoryChange(e)} >
                {getCategoryDropdownOptions()}
            </select>
        </>
    );
}
SelectCategory.whyDidYouRender = true;
export default SelectCategory;