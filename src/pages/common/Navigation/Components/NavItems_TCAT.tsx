import React from "react";
import { outputEnFr, getCategoryLinks } from "../../HelperFunctions";
import NavDropdown from "../Components/NavDropdown";
import { dropdownIDs } from "../NavigationHeader";
import { Link } from "react-router-dom";
import { PageTypes, URLCCU, URLCONSIGNMENT } from "../../Constants";

type Props_NavItems = {
    lang: string,
    jsonDataGroups,
    dropdownOpenState,
    pageType: number,
    paramCategory: string,
    handleToggleDropdown,
    handleClickOutsideDropdown
}

const NavItems_TCAT = (props: Props_NavItems) => {

    return (<>

        {/*HEAVY EQUIPMENT CATEGORIES*/}
        <NavDropdown
            id={dropdownIDs.heavyEquipList}
            isOpen={props.dropdownOpenState.heavyEquipList}
            linkName={outputEnFr("Heavy Equipment", "Équipement lourd", props.lang)}
            fallbackUrl={outputEnFr("/en/products", "/fr/produits", props.lang)}
            dropdownList={getCategoryLinks(
                props.jsonDataGroups, props.lang
            )}
            pageType={props.pageType}
            paramCategory={props.paramCategory}
            handleToggleDropdown={props.handleToggleDropdown}
            handleClickOutsideDropdown={props.handleClickOutsideDropdown}
        />

        {/*CERTIFIED*/}
        <li className={props.pageType === PageTypes.CCU ? "current" : ""}>
            <Link to={outputEnFr("/en/"+URLCCU, "/fr/"+URLCCU, props.lang)} >
                {outputEnFr("Cat Certified", "Certifié Cat", props.lang)}
            </Link>
        </li>
        {/*CONSIGNATION*/}
        <li className={props.pageType === PageTypes.Consignment ? "current" : ""}>
            <Link to={outputEnFr("/en/"+URLCONSIGNMENT, "/fr/"+URLCONSIGNMENT, props.lang)} >
                {outputEnFr("Consignment", "Consignation", props.lang)}
            </Link>
        </li>

        {/*GENERATORS*/}
        <li className={props.paramCategory === "power-systems-production-d-energie" ? "current" : ""}>
            <Link to={outputEnFr("/en/power-systems-production-d-energie", "/fr/power-systems-production-d-energie", props.lang)} >
                {outputEnFr("Generators", "Groupes électrogènes", props.lang)}
            </Link></li>

        {/*DEALS*/}
        <li className={props.paramCategory === "deals" ? "current" : ""}>
            <Link to={outputEnFr("/en/deals", "/fr/deals", props.lang)} >
                {outputEnFr("Deals", "Aubaines", props.lang)}
            </Link></li>
    </>
    )
}
export default NavItems_TCAT;