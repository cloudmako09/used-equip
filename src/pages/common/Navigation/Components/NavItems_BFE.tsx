import React from "react";
import { isEnvironmentBFERENTAL, isEnvironmentJOBSITE } from "../../Constants";
import { outputEnFr, getCategoryLinks } from "../../HelperFunctions";
import NavDropdown from "../Components/NavDropdown";
import { dropdownIDs } from "../NavigationHeader";

type Props_NavItems = {
  lang: string;
  jsonDataGroups;
  dropdownOpenState;
  pageType: number;
  paramCategory: string;
  handleToggleDropdown;
  handleClickOutsideDropdown;
};

const NavItems_BFE = (props: Props_NavItems) => {
  return (
    <>
      {/*ALL CATEGORIES*/}
      {isEnvironmentBFERENTAL ? (
        <NavDropdown
          id={dropdownIDs.heavyEquipList}
          isOpen={props.dropdownOpenState.heavyEquipList}
          paramCategory={props.paramCategory}
          linkName={outputEnFr(
            "Rental Fleet Products",
            "Vente de flotte de location",
            props.lang
          )}
          pageType={props.pageType}
          fallbackUrl={outputEnFr("/en/products", "/fr/produits", props.lang)}
          dropdownList={getCategoryLinks(props.jsonDataGroups, props.lang)}
          handleToggleDropdown={props.handleToggleDropdown}
          handleClickOutsideDropdown={props.handleClickOutsideDropdown}
        />
      ) : isEnvironmentJOBSITE ? (
        <NavDropdown
          id={dropdownIDs.heavyEquipList}
          isOpen={props.dropdownOpenState.heavyEquipList}
          paramCategory={props.paramCategory}
          linkName={outputEnFr(
            "Used Tools & Equipment",
            "Outils & Équipements d'Occasion",
            props.lang
          )}
          pageType={props.pageType}
          fallbackUrl={outputEnFr("/en/products", "/fr/produits", props.lang)}
          dropdownList={getCategoryLinks(props.jsonDataGroups, props.lang)}
          handleToggleDropdown={props.handleToggleDropdown}
          handleClickOutsideDropdown={props.handleClickOutsideDropdown}
        />
      ) : (
        <NavDropdown
          id={dropdownIDs.heavyEquipList}
          isOpen={props.dropdownOpenState.heavyEquipList}
          paramCategory={props.paramCategory}
          linkName={outputEnFr(
            "Used Compact Equipment",
            "Équipement d'occasion compact",
            props.lang
          )}
          pageType={props.pageType}
          fallbackUrl={outputEnFr("/en/products", "/fr/produits", props.lang)}
          dropdownList={getCategoryLinks(props.jsonDataGroups, props.lang)}
          handleToggleDropdown={props.handleToggleDropdown}
          handleClickOutsideDropdown={props.handleClickOutsideDropdown}
        />
      )}
    </>
  );
};
export default NavItems_BFE;
