/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { Link } from "react-router-dom";
import {
  isEnvironmentBFERENTAL,
  isEnvironmentBFE_or_BFERENTAL,
  isEnvironmentJOBSITE,
  IMAGES,
  URLFAVES_EN,
  URLFAVES_FR,
} from "../Constants";
import NavItems_TCAT from "./Components/NavItems_TCAT";
import NavItems_BFE from "./Components/NavItems_BFE";
import LanguageSwitcher from "./Components/LanguageSwitcher";
import FavouritesLinkMobile from "./Components/FavouritesLinkMobile";
import FavouritesNavPopup from "./Components/FavouritesNavPopup";
import _ from "lodash";

type Props_NavMenu = {
  lang: string;
  pageType: number;
  paramCategory: string;
  jsonDataGroups;
};
type State_NavMenu = {
  dropdownOpen: {
    heavyEquipList: boolean;
    favesPopup: boolean;
  };
};
export const dropdownIDs = {
  //helps with toggling
  heavyEquipList: 0,
  favesPopup: 1,
};
const mobileOnlyClass = "hidden-md hidden-lg";

class NavigationHeader extends React.PureComponent<
  Props_NavMenu,
  State_NavMenu
> {
  constructor(props) {
    super(props);
    console.log("Construct NavMenu", props);
    this.state = {
      dropdownOpen: {
        heavyEquipList: false,
        favesPopup: false,
      },
    };
  }

  openMobileMenu = () => {
    document.body.classList.toggle("openMenu");
  };

  handleClickOutsideDropdown = (id) => {
    let newState = { ...this.state };
    switch (id) {
      case dropdownIDs.favesPopup:
        newState.dropdownOpen = {
          ...this.state.dropdownOpen,
          favesPopup: false,
        };
        break;
      case dropdownIDs.heavyEquipList:
        newState.dropdownOpen = {
          ...this.state.dropdownOpen,
          heavyEquipList: false,
        };
        break;
    }
    //close dropdown if it is open - json stringify added for proper object comparison
    if (!_.isEqual(newState.dropdownOpen, this.state.dropdownOpen)) {
      this.setState(newState);
    }
  };

  handleForceOpenDropdown = (id: number) => {
    switch (id) {
      case dropdownIDs.favesPopup:
        this.setState({
          ...this.state,
          dropdownOpen: { ...this.state.dropdownOpen, favesPopup: true },
        });
        break;
      case dropdownIDs.heavyEquipList:
        this.setState({
          ...this.state,
          dropdownOpen: { ...this.state.dropdownOpen, heavyEquipList: true },
        });
        break;
    }
  };

  handleToggleDropdown = (id: number) => {
    let newState_dropdownOpen = this.state.dropdownOpen; //get old state

    let openOrClosed: boolean;

    //set the state in question to its opposite and the rest to false
    switch (id) {
      case dropdownIDs.favesPopup:
        openOrClosed = !this.state.dropdownOpen.favesPopup;
        //console.log("handleToggleDropdown id:"+id+" set to:"+openOrClosed);
        newState_dropdownOpen = {
          heavyEquipList: false,
          favesPopup: openOrClosed,
        };
        break;
      case dropdownIDs.heavyEquipList:
        openOrClosed = !this.state.dropdownOpen.heavyEquipList;
        // console.log("handleToggleDropdown id:"+id+" set to:"+openOrClosed);
        newState_dropdownOpen = {
          favesPopup: false,
          heavyEquipList: openOrClosed,
        };
        break;
    }

    this.setState({
      ...this.state,
      dropdownOpen: newState_dropdownOpen,
    });
  };

  getLogo =
    this.props.lang === "fr" ? (
      <Link to="/fr">
        {isEnvironmentBFE_or_BFERENTAL ? (
          <img
            src={IMAGES.LOGO_BFE_FR}
            alt="Location d’équipement Battlefield"
          />
        ) : isEnvironmentJOBSITE ? (
          <img
            src={IMAGES.LOGO_JOBSITE}
            alt="Location d'outils industriels Jobsite"
          />
        ) : (
          <img src={IMAGES.LOGO_TCAT} alt="Toromont Cat" />
        )}
      </Link>
    ) : (
      <Link to="/">
        {isEnvironmentBFE_or_BFERENTAL ? (
          <img src={IMAGES.LOGO_BFE} alt="Battlefield Equipment Rentals" />
        ) : isEnvironmentJOBSITE ? (
          <img
            src={IMAGES.LOGO_JOBSITE}
            alt="Jobsite Industrial Rental Services"
          />
        ) : (
          <img src={IMAGES.LOGO_TCAT} alt="Toromont Cat" />
        )}
      </Link>
    );

  render() {
    console.log("Render NavigationHeader");
    const isViewingFaves =
      this.props.paramCategory === URLFAVES_EN ||
      this.props.paramCategory === URLFAVES_FR;
    return (
      <header id="header-wrap">
        <div id="header" className="container">
          <div className="col-xs-10  col-md-2 h-logo">
            <div className="logotype">{this.getLogo}</div>
          </div>
          <div className="col-xs-2 col-md-10 h-menu">
            <nav>
              <i
                className="fa fa-bars mobileMenuNav mobileMenuSwitcher onlyMobileMenu"
                onClick={() => this.openMobileMenu()}
              ></i>
              <div
                className="nav-container container-fluid"
                style={{ padding: 0 }}
              >
                <i
                  className="fa fa-times close-menu mobileMenuSwitcher onlyMobileMenu"
                  onClick={() => this.openMobileMenu()}
                ></i>
                <ul className="nav navbar-nav navbar-main navbar-right">
                  {/*LOGO - MOBILE ONLY*/}
                  <div className={"logotype mobile " + mobileOnlyClass}>
                    {this.getLogo}
                  </div>

                  {/*LANG SWITCHER- MOBILE ONLY*/}
                  <li className={mobileOnlyClass}>
                    {isEnvironmentBFERENTAL ? (
                      ""
                    ) : (
                      <LanguageSwitcher
                        lang={this.props.lang}
                        pageType={this.props.pageType}
                      />
                    )}
                  </li>

                  {/*FAVOURITES - MOBILE ONLY*/}
                  <li
                    className={
                      isViewingFaves
                        ? mobileOnlyClass + " current"
                        : mobileOnlyClass
                    }
                  >
                    <FavouritesLinkMobile lang={this.props.lang} />
                  </li>

                  {isEnvironmentBFE_or_BFERENTAL || isEnvironmentJOBSITE ? (
                    <NavItems_BFE
                      lang={this.props.lang}
                      jsonDataGroups={this.props.jsonDataGroups}
                      dropdownOpenState={this.state.dropdownOpen}
                      pageType={this.props.pageType}
                      paramCategory={this.props.paramCategory}
                      handleToggleDropdown={this.handleToggleDropdown}
                      handleClickOutsideDropdown={
                        this.handleClickOutsideDropdown
                      }
                    />
                  ) : (
                    <NavItems_TCAT
                      lang={this.props.lang}
                      jsonDataGroups={this.props.jsonDataGroups}
                      dropdownOpenState={this.state.dropdownOpen}
                      pageType={this.props.pageType}
                      paramCategory={this.props.paramCategory}
                      handleToggleDropdown={this.handleToggleDropdown}
                      handleClickOutsideDropdown={
                        this.handleClickOutsideDropdown
                      }
                    />
                  )}

                  {/*FAVOURITES - DESKTOP ONLY*/}
                  <FavouritesNavPopup
                    id={dropdownIDs.favesPopup}
                    lang={this.props.lang}
                    isOpen={this.state.dropdownOpen.favesPopup}
                    isViewingFaves={isViewingFaves}
                    handleToggleDropdown={this.handleToggleDropdown}
                    handleClickOutsideDropdown={this.handleClickOutsideDropdown}
                    handleForceOpenDropdown={this.handleForceOpenDropdown}
                  />
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}
export default NavigationHeader;
