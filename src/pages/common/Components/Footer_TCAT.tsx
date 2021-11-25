/* eslint-disable react/jsx-pascal-case */
import React from "react";
import {
  outputEnFr, 
  getPhoneNumber,
} from "../HelperFunctions";  
import FooterSubscribeForm_Tcat_hubspot from "./FooterSubscribeForm_Tcat_hubspot"; 
import ScrollTopButton from "./ScrollTopButton"; 

type Props_footer = {
  lang: string;
  currentCatClass: string;
};

export default class Footer_TCAT extends React.PureComponent<Props_footer> {
  curYear = new Date().getFullYear();

  scrollToTop = () => {
    //TODO: create this function
    return;
  };

  render() {
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
              this.props.lang
            )}
          </p>
          <p className="footer-phone">
            <a
              className="phonenumber-main"
              href={"tel:" + getPhoneNumber(this.props.currentCatClass)}
            >
              {getPhoneNumber(this.props.currentCatClass)}
            </a>
          </p>
         
         
          <FooterSubscribeForm_Tcat_hubspot 
          lang={this.props.lang} 
          currentCatClass={this.props.currentCatClass} />  
          
          <span>
            {outputEnFr(
              "\u00a9 " +
                this.curYear +
                " Toromont Industries Ltd. All Rights Reserved.",
              "\u00a9 " +
                this.curYear +
                " Toromont Cat - Tous droits réservés.",
              this.props.lang
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
              this.props.lang
            )}
          </a>{" "}
          <br />
          <a
            href="//www.toromont.com/policy.asp"
            target="_blank"
            rel="noopener noreferrer"
            className="policy-links" 
          >
            {outputEnFr(
              "Website Privacy Statement",
              "Politique de confidentialité",
              this.props.lang
            )}
          </a>
          <br />
          <a
            href={outputEnFr("https://www.toromontcat.com/redirect/aoda-statement",
            "https://www.toromontcat.com/redirect/aoda-statement-fr",
            this.props.lang       
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="policy-links" 
          >
            {outputEnFr(
              "Accessibility",
              "Accessibilité",
              this.props.lang
            )}
          </a>
        </div>
        <ScrollTopButton />
      </footer>
      
    );
  }
}
