/* eslint-disable react/jsx-pascal-case */
import React from "react";
import IntroSection from "./sections/IntroSection";
import CategorySection from "./sections/CategorySection";
import { setBodyClass } from "../common/HelperFunctions";
import SeoTextSection_TCAT from "./sections/SeoTextSectionToromontCat";
import SeoTextSectionBattlefield from "./sections/SeoTextSectionBattlefield";
import SeoTextSectionJobsite from "./sections/SeoTextSectionJobsite";
import { Helmet } from "react-helmet";
import {
  DOMAINBASE,
  isEnvironmentBFE_or_BFERENTAL,
  isEnvironmentJOBSITE,
} from "../common/Constants";
import "../../css/homepage.scss";

type Props_Home = {
  lang: string;
  jsonDataGroups;
};

export default class HomePage extends React.PureComponent<Props_Home> {
  getSeoTextSection = () => {
    if (isEnvironmentBFE_or_BFERENTAL) {
      return <SeoTextSectionBattlefield lang={this.props.lang} />;
    } else if (isEnvironmentJOBSITE) {
      return <SeoTextSectionJobsite lang={this.props.lang} />;
    } else {
      return <SeoTextSection_TCAT lang={this.props.lang} />;
    }
  };

  render() {
    console.log("Render HomePage", this.props);
    isEnvironmentBFE_or_BFERENTAL
      ? setBodyClass(["pgHome", "bfetheme"])
      : isEnvironmentJOBSITE
      ? setBodyClass(["pgHome", "jobsite-theme"])
      : setBodyClass(["pgHome"]);
    return (
      <>
        <Helmet>
          <link
            rel="canonical"
            href={this.props.lang === "fr" ? DOMAINBASE + "/fr" : DOMAINBASE}
          />
        </Helmet>
        <IntroSection
          lang={this.props.lang}
          jsonDataGroups={this.props.jsonDataGroups}
        />
        <CategorySection
          lang={this.props.lang}
          jsonDataGroups={this.props.jsonDataGroups}
        />
        {this.getSeoTextSection()}
      </>
    );
  }
}
