import React from "react";
import { outputEnFr } from "../HelperFunctions";
import { isEnvironmentBFERENTAL, PHONENUMBERS } from "../Constants";
import ScrollTopButton from "./ScrollTopButton";

type Props_footer = {
  lang: string;
};

const Footer_Battlefield = ({ lang }: Props_footer) => {
  const curYear = new Date().getFullYear();

  return (
    <footer>
      <a id="to-top" href="#header-top" aria-label="back to top">
        <i className="fa fa-chevron-up" aria-hidden="true"></i>
      </a>
      <div className="footer">
        <p className="havequestions">
          {outputEnFr(
            "Have questions? Call our used equipment specialists today!",
            "Vous avez des questions? Appelez notre spécialiste en équipement usagé aujourd'hui",
            lang
          )}
        </p>
        <p className="footer-phone" style={{ marginBottom: "50px" }}>
          {isEnvironmentBFERENTAL ? (
            <a
              className="phonenumber-main"
              href={"tel:" + PHONENUMBERS.BFERENTAL}
            >
              {PHONENUMBERS.BFERENTAL}
            </a>
          ) : (
            <a className="phonenumber-main" href={"tel:" + PHONENUMBERS.BFE}>
              {PHONENUMBERS.BFE}
            </a>
          )}
        </p>
        <span>
          {outputEnFr(
            "Operating Hours: Monday to Friday 8:00am – 5:00pm",
            "Heures d’ouverture : du lundi au vendredi de 8h00 à 17h00",
            lang
          )}
        </span>
        <br />
        <span>
          {outputEnFr(
            "\u00a9 " +
              curYear +
              " Battlefield Equipment Rentals. All Rights Reserved.",
            "\u00a9 " +
              curYear +
              " Battlefield Equipment Rentals - Tous droits réservés.",
            lang
          )}
        </span>
        <br />
        <br />
        <a
          href="//www.toromont.com/copyright.asp"
          target="_blank"
          rel="noopener noreferrer"
          className="policy-links"
        >
          {outputEnFr(
            "Copyright Information & Legal Notice",
            "Information de droits d'auteur et mentions légales",
            lang
          )}
        </a>{" "}
        <br />
        <a
          href="//www.toromont.com/policy.asp"
          target="_blank"
          rel="noopener noreferrer"
          className="data-fr policy-links"
          data-fr="Politique de confidentialité"
        >
          {outputEnFr(
            "Website Privacy Statement",
            "Politique de confidentialité",
            lang
          )}
        </a>
        <br />
        <a
          href={outputEnFr(
            "https://www.toromont.com/accessibility/",
            "https://www.toromont.com/accessibility/",
            lang
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="policy-links"
        >
          {outputEnFr("Accessibility", "Accessibilité", lang)}
        </a>
      </div>
      <ScrollTopButton />
    </footer>
  );
};

export default Footer_Battlefield;
