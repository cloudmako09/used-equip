import React from "react";
import {
  isEnvironmentBFE,
  isEnvironmentBFERENTAL,
  isEnvironmentJOBSITE,
} from "../../common/Constants";
import { outputEnFr } from "../../common/HelperFunctions";

const fadeInClass = navigator.userAgent === "ReactSnap" ? "fade-in" : "";

const IntroText = ({ lang }) => {
  return (
    <div className={fadeInClass}>
      <h1 id="largeh1">
        {isEnvironmentBFE
          ? outputEnFr(
              "Battlefield Used Equipment",
              "Location d’équipement Battlefield",
              lang
            )
          : isEnvironmentBFERENTAL
          ? outputEnFr(
              "Rental Fleet Sell-Off",
              "Vente de flotte de location",
              lang
            )
          : outputEnFr(
              "Used Tools & Equipment",
              "Outils & Équipements d'Occasion",
              lang
            )}
      </h1>
      <h2>
        {isEnvironmentBFE
          ? outputEnFr(
              "A complete line of Used Cat Compact Equipment for your needs.",
              "Une gamme complète d'équipements compacts Cat d'occasion pour vos besoins.",
              lang
            )
          : isEnvironmentBFERENTAL || isEnvironmentJOBSITE
          ? outputEnFr(
              "A complete line of rental fleet items for your needs.",
              "Une gamme complète d'articles de flotte de location pour vos besoins.",
              lang
            )
          : outputEnFr(
              "A complete line of used equipment for your needs.",
              "Une gamme complète d'équipement usagé pour tous vos besoins.",
              lang
            )}
      </h2>

      <span className="wehaveitall ">
        {outputEnFr("We have it all.", "Tout est là.", lang)}
      </span>
      <br />
    </div>
  );
};

export default IntroText;
