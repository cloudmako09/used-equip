/* eslint-disable react/jsx-pascal-case */
import React from "react";
import NavPhoneNum_Tcat from "../Components/NavPhoneNum_Tcat";
import LanguageSwitcher from "./Components/LanguageSwitcher";
import {
  IMAGES,
  isEnvironmentBFERENTAL,
  // isEnvironmentBFE,
  isEnvironmentBFE_or_BFERENTAL,
  isEnvironmentTCAT,
} from "../Constants";

type props_PreNav = {
  lang;
  pageType: number;
  currentCatClass: string;
};

class PreNav extends React.PureComponent<props_PreNav> {
  render() {
    console.log("Render NavigationHeader");
    return (
      <header>
        {isEnvironmentBFE_or_BFERENTAL ? (
          <img
            className="print-only"
            src={IMAGES.LOGO_BFE}
            alt="Battlefield Equipment Rentals"
          />
        ) : (
          <img
            className="print-only"
            src={IMAGES.LOGO_TCAT}
            alt="Toromont Cat"
          />
        )}

        <div id="prenav" className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="hidden-xs col-sm-2">&nbsp;</div>
              <div className="col-xs-12 col-sm-8 text-center">
                {isEnvironmentTCAT ? (
                  <NavPhoneNum_Tcat
                    lang={this.props.lang}
                    currentCatClass={this.props.currentCatClass}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="hidden-xs hidden-sm col-sm-2 text-right">
                <LanguageSwitcher
                  lang={this.props.lang}
                  pageType={this.props.pageType}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default PreNav;
