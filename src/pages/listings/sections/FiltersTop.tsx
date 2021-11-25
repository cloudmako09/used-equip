import React from "react";
import * as Types from '../../common/Types';
import * as Constants from '../../common/Constants'
import Pagination from "react-js-pagination";
import { outputEnFr } from "../../common/HelperFunctions";
import SelectSortOrder from "../components/SelectSortOrder";
import InputKeywordSearch from "../components/InputKeywordSearch";

type Props_FiltersTop = {
  lang: string,
  pagingState: Types.pagingState,
  filters: Types.searchFilters,
  onPageChange,
  onSearchFilterChange
}

class FiltersTop extends React.PureComponent<Props_FiltersTop> { 
 
  showingProductsText = () => {
    let textCountShowingProducts = "0";
    if (this.props.pagingState.totalItems > 0){
      textCountShowingProducts =  this.props.pagingState.startAtItem +" - "+Math.min(this.props.pagingState.endAtItem,this.props.pagingState.totalItems);
    } 
      return(<>
            {outputEnFr("Showing products ", "Afficher les produits ",this.props.lang)}
            <span className="data_countShowingProducts">{textCountShowingProducts} </span>
            {outputEnFr("out of", "sur",this.props.lang)}
            <span className="data_countTotalProducts"> {this.props.pagingState.totalItems}</span>
            </>      
      );
  }  
render(){  
  return ( 
    <>
      <div className="showhidefilters">
        <div className="row"> 
          <div id="keyword-searchwrap-top" className="col-xs-12 col-sm-6 col-md-6 col-lg-6">

            <InputKeywordSearch lang={this.props.lang} filters={this.props.filters} onSearchFilterChange={this.props.onSearchFilterChange} />

            <p className="itemcount mobileonly hidden-sm hidden-md hidden-lg">
                {this.showingProductsText()}
            </p>


          </div>
          <div id="pages-sorter-top" className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div id="list-pages" className="list-pages light-theme simple-pagination" style={(this.props.pagingState.numPages<=1 ? {display: "none"}:{})}>
              <Pagination
                activePage={this.props.pagingState.curPage}
                itemsCountPerPage={Constants.ITEMSPERPAGE}
                totalItemsCount={this.props.pagingState.totalItems}
                pageRangeDisplayed={3}
                onChange={this.props.onPageChange}
                hideFirstLastPages={true}
                innerClass="ul-pagination"
              />
            </div>
            <SelectSortOrder  lang={this.props.lang} filters={this.props.filters} onSearchFilterChange={this.props.onSearchFilterChange} />

          </div>
          <div className="col-xs-12 desktoponly hidden-xs">
          <p className="itemcount">
                  {this.showingProductsText()}
                  </p>
          </div>
        </div>
      </div>
    </>
  );

}
} 
export default FiltersTop;