import * as Types from '../../common/Types'; 
import { slug } from '../../common/SEO/SeoFunctions';
import * as Constants from '../../common/Constants';
import _ from 'lodash';

export default function getAllProductsFromCategory (filters:Types.searchFilters, jsonDataGroups){
  //console.log("getAllProductsFromCategory()",filters); 

  const VIEWALLPRODUCTS = (filters.category===Constants.ALLFAMSWORD_EN || filters.category===Constants.ALLFAMSWORD_FR || filters.category===Constants.URLPOWER_SLUG || filters.category===null);
  
  //filter only current category class - TCAT ONLY
  // let UsedData = _.filter(jsonDataGroups, function (o) {
  //   var checkClass1 = o.equipments[0]['product-family-categories']['category-class']['name'];
  //   var checkClass2 = o.equipments[0]['product-family-categories'].category.name;
  //   return (
  //     isEnvironmentBFE ||
  //     getCategoryClassFromValue(checkClass1) === filters.categoryClass ||
  //     getCategoryClassFromValue(checkClass2) === filters.categoryClass
  //   )
  // });
  let UsedData=jsonDataGroups;
  let FamData=[];
  //set famData list (single category)
  if (!VIEWALLPRODUCTS){
    FamData = _.filter(UsedData, function (o) {
      return (
        o['group-code'] === filters.category ||
        slug(o['group-code']) === slug(filters.category)
      )
    });
    if (typeof FamData != "undefined" && typeof FamData[0] != "undefined") {
      FamData = FamData[0]['equipments'];
    }
  } 

  //set current list 
  if (VIEWALLPRODUCTS || filters.viewFaves || filters.viewDeals || !filters.category) {
    //set AllData list (all categories)
    let AllData = [];
    for (var i = 0; i < UsedData.length; i++) { //combine all groups into one array
      AllData = AllData.concat(UsedData[i]['equipments']);
    }
    UsedData = AllData;
  } else {
    UsedData = FamData;
  }  
  return UsedData;
}  