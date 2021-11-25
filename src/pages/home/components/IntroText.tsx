import React from "react";
import {
  isEnvironmentBFE,
  isEnvironmentBFERENTAL,
} from "../../common/Constants";
import { outputEnFr } from "../../common/HelperFunctions";

const fadeInClass = navigator.userAgent === "ReactSnap" ? "fade-in" : "";

class IntroText extends React.PureComponent<{ lang: string }> {
  render() {
    return (
      <div className={fadeInClass}>
        <h1 id="largeh1">
          {isEnvironmentBFE
            ? outputEnFr(
                "Battlefield Used Equipment",
                "Location d’équipement Battlefield",
                this.props.lang
              )
            : isEnvironmentBFERENTAL
            ? outputEnFr(
                "Rental Fleet Sell-Off",
                "Vente de flotte de location",
                this.props.lang
              )
            : outputEnFr(
                "Used Heavy Equipment",
                "Équipement lourd usagé",
                this.props.lang
              )}
        </h1>
        <h2>
          {isEnvironmentBFE
            ? outputEnFr(
                "A complete line of Used Cat Compact Equipment for your needs.",
                "Une gamme complète d'équipements compacts Cat d'occasion pour vos besoins.",
                this.props.lang
              )
            : isEnvironmentBFERENTAL
            ? outputEnFr(
                "A complete line of rental fleet items for your needs.",
                "Une gamme complète d'articles de flotte de location pour vos besoins.",
                this.props.lang
              )
            : outputEnFr(
                "A complete line of used equipment for your needs.",
                "Une gamme complète d'équipement usagé pour tous vos besoins.",
                this.props.lang
              )}
        </h2>

        <span className="wehaveitall ">
          {outputEnFr("We have it all.", "Tout est là.", this.props.lang)}
        </span>
        <br />
      </div>
    );
  }
}
export default IntroText;
