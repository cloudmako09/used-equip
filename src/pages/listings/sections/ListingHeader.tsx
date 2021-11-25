import React from "react";
import CtaSectionHeader from "./CtaSectionHeader";
import SeoTextHeader from "./SeoTextHeader";  

type Props_ListingHeader = {
  lang: string,
  currentCatClass:string,
  category:string|null
  //seoData:Types_SeoData
}



export default class ListingHeader extends React.PureComponent<Props_ListingHeader>{

  constructor(props){
    super(props)
    console.log("Construct ListingHeader ", props);
  }
 

  render(){
    return (
      <div id="listing-header-title-wrap" className="container-fluid">
        <div className="container">
          <div id="listing-header" className="row nopad">
            <div className="col-xs-12 col-sm-8 col-md-9">
              <SeoTextHeader
                lang={this.props.lang} 
                category={this.props.category}
                currentCatClass={this.props.currentCatClass}
              />
            </div>
            <div id="col-cta" className="col-xs-12 col-sm-4 col-md-3">
  
              <CtaSectionHeader 
                lang={this.props.lang}
                currentCatClass={this.props.currentCatClass}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
 
} 