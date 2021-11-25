import React from "react"; 
import { getPathLanguageChanged } from "../../SEO/SeoFunctions"; 
import { withRouter } from "react-router-dom";

type props_LanguageSwitcher = {
  lang: string,
  pageType: number,
  history? //from withRouter
} 
class LanguageSwitcher extends React.PureComponent<props_LanguageSwitcher>{
   
render(){
  console.log("Rendering LanguageSwitcher");
  return (
    <div className="langswitcher">
      <em className="fa fa-globe"></em>&nbsp;{" "}
      <a 
        href={getPathLanguageChanged("en", this.props.pageType, this.props.history.location.pathname, this.props.history.location.search)}
        className={this.props.lang === "en" ? "currentlang" : ""}
      >
        EN
                    </a>
      {" / "}
      <a
        href={getPathLanguageChanged("fr", this.props.pageType, this.props.history.location.pathname, this.props.history.location.search)}
        className={this.props.lang === "fr" ? "currentlang" : ""}
      >
        FR
                  </a>
    </div>
  );
}

}
export default withRouter(LanguageSwitcher);