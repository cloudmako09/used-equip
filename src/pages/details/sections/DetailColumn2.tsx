import React from "react";
import {
  isEnvironmentBFERENTAL,
  isEnvironmentJOBSITE,
} from "../../common/Constants";
import { outputEnFr, getPhoneNumber } from "../../common/HelperFunctions";
import { Type_jsonModelDetails } from "../../common/Types";
import FaveAddRemoveButton from "../components/FaveAddRemoveButton";

type Props_DetailColumn2 = {
  lang: string;
  currentCatClass: string;
  jsonDataProduct: Type_jsonModelDetails | undefined;
  inspectionReportAvailable: boolean;
};

const DetailColumn2 = (props: Props_DetailColumn2) => {
  if (props.jsonDataProduct == null) {
    return <></>;
  }

  let DetailColumnHtml = {
    comments: outputEnFr(
      "No comments listed for this product.",
      "Aucun commentaire sur ce produit.",
      props.lang
    ),
    features: (
      <p>
        {outputEnFr(
          "No features listed for this product.",
          "Aucune caractéristique répertoriée pour ce produit.",
          props.lang
        )}
      </p>
    ),
  };

  /*comments*/
  if (
    props.jsonDataProduct.comments !== null &&
    props.jsonDataProduct.comments !== ""
  ) {
    DetailColumnHtml.comments = props.jsonDataProduct.comments;
  }

  /*features*/
  if (
    props.jsonDataProduct.features != null &&
    props.jsonDataProduct.features[0] != null
  ) {
    DetailColumnHtml.features = (
      <ul className="data_features">
        {props.jsonDataProduct.features.map((feature, i) => {
          return <li key={i}>{feature.text}</li>;
        })}
      </ul>
    );
  }
  return (
    <>
      <div className="ctabuttons">
        <a
          href={"tel:" + getPhoneNumber(props.currentCatClass)}
          className="btn btn-default top-phone phonenumber-main"
        >
          {/* onclick="gtag('event', 'Click Phone', {'event_category': 'Contact', 'event_label': document.title})" */}
          <i className="fa fa-phone" aria-hidden="true"></i> &nbsp;{" "}
          {getPhoneNumber(props.currentCatClass)}
        </a>
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
        {/* onclick="gtag('event', 'Click Phone', {'event_category': 'Contact', 'event_label': document.title})" */}

        <a href="#form" className="btn btn-primary hide-print">
          {/*  onclick="gtag('event', 'Inquire about product', 
            {'event_category': 'Engagement', 'event_label': document.title})" */}
          <i className="fa fa-question-circle"></i> &nbsp;
          {outputEnFr(
            "Inquire about this product",
            "Demande d'information",
            props.lang
          )}{" "}
        </a>

        <br />
        <FaveAddRemoveButton
          lang={props.lang}
          jsonDataProduct={props.jsonDataProduct}
        />

        {props.inspectionReportAvailable ? (
          <a id="viewInspBtn" href="#inspection" className="btn btn-primary">
            <i className="fa fa-list-ul"></i>
            <span>
              {outputEnFr(
                "View inspection report",
                "Voir le rapport d'inspection",
                props.lang
              )}
            </span>
          </a>
        ) : null}

        <br />
        {isEnvironmentBFERENTAL || isEnvironmentJOBSITE ? (
          ""
        ) : (
          <>
            <div id="top-comments">
              <h3>{outputEnFr("Comments:", "Commentaires:", props.lang)}</h3>

              <p>{DetailColumnHtml.comments}</p>
            </div>
            <div id="top-features">
              <h3>
                {" "}
                {outputEnFr("Features:", "Caractéristiques:", props.lang)}{" "}
              </h3>

              {DetailColumnHtml.features}
            </div>
          </>
        )}
      </div>
    </>
  );
};
DetailColumn2.whyDidYouRender = true;
export default DetailColumn2;
