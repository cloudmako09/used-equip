/* eslint-disable react/jsx-pascal-case */
import React from "react";
import PreNav from "../Navigation/PreNavigation";
import NavigationHeader from "../Navigation/NavigationHeader";

type props_PreNav = {
  lang;
  pageType: number;
  paramCategory: string;
  currentCatClass: string;
  jsonDataGroups;
};

const Header = ({
  lang,
  pageType,
  paramCategory,
  currentCatClass,
  jsonDataGroups,
}: props_PreNav) => {
  return (
    <>
      <PreNav
        lang={lang}
        pageType={pageType}
        currentCatClass={currentCatClass}
      />

      <NavigationHeader
        lang={lang}
        pageType={pageType}
        paramCategory={paramCategory}
        jsonDataGroups={jsonDataGroups}
      />
    </>
  );
};

export default Header;
