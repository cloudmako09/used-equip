import React from "react";
import { getPathLanguageChanged } from "../../SEO/SeoFunctions";
import { withRouter } from "react-router-dom";

type props_LanguageSwitcher = {
  lang: string;
  pageType: number;
  history?; //from withRouter
};

const LanguageSwitcher = ({
  lang,
  pageType,
  history,
}: props_LanguageSwitcher) => {
  return (
    <div className="langswitcher">
      <em className="fa fa-globe"></em>&nbsp;{" "}
      <a
        href={getPathLanguageChanged(
          "en",
          pageType,
          history.location.pathname,
          history.location.search
        )}
        className={lang === "en" ? "currentlang" : ""}
      >
        EN
      </a>
      {" / "}
      <a
        href={getPathLanguageChanged(
          "fr",
          pageType,
          history.location.pathname,
          history.location.search
        )}
        className={lang === "fr" ? "currentlang" : ""}
      >
        FR
      </a>
    </div>
  );
};

export default withRouter(LanguageSwitcher);
