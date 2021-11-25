import * as Types from '../../common/Types';
import * as Constants from '../../common/Constants'
import { ConverterNumber } from '../../common/HelperFunctions';
let currentDealsArray;
if (Constants.isEnvironmentTCAT){  
    //fetch text file of deals serial numbers - toromont only
  fetch('/dealslist.txt')
    .then(response => response.text())
    .then((text) => { 
      currentDealsArray=text;
  }); 
}


export function isCurrentDeal(serialnum, stocknum): boolean { 
  //checks list of models from txt file and returns if found
  if (currentDealsArray){
    const isCurrentDeal = (currentDealsArray.indexOf(serialnum) > -1 || currentDealsArray.indexOf(stocknum) > -1); 
    return isCurrentDeal || false; 
  }
  return false; 
}

export const setUpPaging = (curPage, itemCount) => {
  curPage = ConverterNumber(curPage) || 1;
  const itemsPerPg = Constants.ITEMSPERPAGE;
  if (itemCount <= itemsPerPg) { curPage = 1; console.log("Changing curpage to 1"); }
  const endAtItem = itemsPerPg * curPage;

  let paging: Types.pagingState = {
    curPage: curPage,
    numPages: Math.ceil(itemCount / itemsPerPg),
    endAtItem: endAtItem,
    startAtItem: (endAtItem - itemsPerPg) + 1,
    totalItems: itemCount
  }
  return paging;
}

export function getBodyClassNames(filters) {
  let bodyClassNames: string[] = ["pgListing"];
  if (Constants.isEnvironmentBFE_or_BFERENTAL) {
    bodyClassNames.push("bfetheme");
  }
  if (filters.viewFaves) {
    bodyClassNames.push("viewFaves");
  }
  if (filters.viewDeals) {
    bodyClassNames.push("viewDeals");
  }
  return bodyClassNames;
}


