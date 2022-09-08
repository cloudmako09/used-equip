import React from "react";
import { isEnvironmentJOBSITE } from "../../common/Constants";
import { outputEnFr, getPhoneNumber } from "../../common/HelperFunctions";

type Props_CtaSectionHeader = {
  lang: string;
  currentCatClass: string;
};

const CtaSectionHeader = (props: Props_CtaSectionHeader) => {
  const btnPhone = (
    <a
      href={"tel:" + getPhoneNumber(props.currentCatClass)}
      className="btn btn-default top-phone phonenumber-main"
    >
      <i className="fa fa-phone" aria-hidden="true"></i> &nbsp;{" "}
      {getPhoneNumber(props.currentCatClass)}{" "}
    </a>
  );

  const btnForm = (
    <a href="#form" className="btn btn-primary btn-top-email">
      <i className="fa fa-question-circle"></i> &nbsp;
      <span className="data-fr" data-fr="Demande d'information">
        {outputEnFr("Contact Us", "Demande d'information", props.lang)}
      </span>
    </a>
  );

  return (
    <div className="ctabuttons">
      {btnPhone}
      {!isEnvironmentJOBSITE ? (
        <>
          <p className="op-hours">
            {outputEnFr(
              "Operating Hours: Monday to Friday 8:00am – 5:00pm",
              "Heures d’ouverture : du lundi au vendredi de 8h00 à 17h00",
              props.lang
            )}
          </p>
        </>
      ) : (
        ""
      )}

      {btnForm}
    </div>
  );
};
CtaSectionHeader.whyDidYouRender = true;
export default CtaSectionHeader;
