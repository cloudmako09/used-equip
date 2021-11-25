import React from "react";
import { setBodyClass, outputEnFr } from "../common/HelperFunctions";
import * as Constants from "../common/Constants";
import CTASection from "../common/Sections/CTASection";
import { Helmet } from "react-helmet";
import { getMetaTitle, getSeoContentByCatCode } from "../common/SEO/SeoFunctions";
import { types_seoData } from "../common/Types";
 
type Props_ConsignmentPage = {
    lang: string
}
export default class ConsignmentPage extends React.PureComponent<Props_ConsignmentPage> {



    getMetaDescTag = () => {
        const seoText: types_seoData = getSeoContentByCatCode(Constants.URLCONSIGNMENT);
        const metaText =
            this.props.lang === "fr" ? seoText.FR.Meta : seoText.EN.Meta;
        return metaText;
    }
    getMetaTitleTag = () => {
        const categoryName = this.getCategoryDisplayName();
        return getMetaTitle(categoryName, this.props.lang);
    }
    getCategoryDisplayName = () => {
        const seoText: types_seoData = getSeoContentByCatCode(Constants.URLCONSIGNMENT);
        const categoryName = this.props.lang === "fr" ? seoText.FR.Name : seoText.EN.Name;
        return categoryName;
    }

    render() {
        setBodyClass(["pgListing", "pgConsignment"]);
        return (<>
            <Helmet>
                <meta
                    name="description"
                    content={this.getMetaDescTag()}
                />
                <title>{this.getMetaTitleTag()}</title>
                <link rel="canonical" href={Constants.DOMAINBASE + "/" + this.props.lang + "/" + Constants.URLCONSIGNMENT} />
            </Helmet>
            <div id="listing-header-title-wrap" className="container-fluid">
                <div className="container">
                    <div id="listing-header" className="row nopad">
                        <div className="col-xs-12 col-sm-8 col-md-8">
                            <h1 className="ccuPageTitle">
                                {outputEnFr("Machine Consignment",
                                    "Programme de consignation d'équipement", this.props.lang)}
                            </h1>
                            <h2>
                                {outputEnFr("Toromont Cat Equipment Consignment: We do the marketing, you get the sale.",
                                    "Programme de consignation d'équipement Toromont Cat : Nous faisons la promotion, vous profitez de la vente.", this.props.lang)}
                            </h2>
                            <div id="CategoryFullDescription" className="copytext">
                                {this.props.lang === "en" ?
                                    <p>
                                        Don’t let the competitor dictate the selling price of your machine.
                                        Our consignment program gives you an easy and reliable way to get fair
                                        market value for your used heavy equipment, with no risk and no rush.
                                </p> :
                                    <p>
                                        Ne laissez pas votre concurrent déterminer le prix de vente de votre machine. Notre programme de consignation vous offre un moyen simple et fiable d'obtenir la juste valeur marchande de votre équipement lourd usagé, sans risque et sans stress.
                                </p>}
                            </div>
                        </div><div id="col-cta" className="col-xs-12 col-sm-4 col-md-4">
                            <div className="ctabuttons">
                                <a href={"tel:" + Constants.PHONENUMBERS.HEAVY_TCAT}
                                    className="btn btn-default top-phone phonenumber-main">
                                    <i className="fa fa-phone" aria-hidden="true"></i> &nbsp;
                                        {Constants.PHONENUMBERS.HEAVY_TCAT} </a>
                                <a href="#form" className="btn btn-primary btn-top-email">
                                    <i className="fa fa-question-circle"></i> &nbsp;

                                               {outputEnFr("Contact Us", "Demande d'information", this.props.lang)}


                                </a></div></div></div></div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-8 copytext">
                        <br />


                        {this.props.lang === "en" ? <>
                            <h4>
                                Toromont Cat Equipment Consignment includes:
                                 </h4>
                            <ul>
                                <li>No-charge equipment inspection</li>
                                <li>Our experienced sales force works to sell your machine</li>
                                <li>Promotion through our 33 locations across Eastern Canada</li>
                                <li>Listing on used.toromontcat.com </li>
                            </ul> </> : <>
                                <h4>
                                    Notre programme de consignation d'équipement Toromont Cat inclut les avantages suivants&nbsp;:
                                 </h4>
                                <ul>
                                    <li>Inspection gratuite de l'équipement</li>
                                    <li>Notre équipe des ventes expérimentée travaille pour vendre votre machine</li>
                                    <li>Promotion de votre équipement dans nos 33 succursales dans l'Est du Canada</li>
                                    <li>Affichage sur used.toromontcat.com/fr</li>
                                </ul></>}

                        <br />
                        <p>
                            {outputEnFr(" Take control of your used equipment sale to get the highest return on your investment.",
                                "Prenez le contrôle de votre vente d'équipement usagé pour obtenir le meilleur rendement sur investissement.",
                                this.props.lang)}

                        </p>
                        <br />

                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <img src={Constants.IMAGES.ConsigmentImage} className="hidden-xs" alt="" />
                        {/* <br/><br/>
                            <img src={Constants.IMAGES.CCU2} /> */}
                        {/* <br/><br/>
                            <img src={Constants.IMAGES.CCU3} /> */}
                    </div>
                </div>
            </div>
            <CTASection
                lang={this.props.lang}
                curCategory={outputEnFr("Machine Consignment",
                "Programme de consignation d'équipement", this.props.lang)}
                categoryClass={Constants.CLASS_HEAVY}
                heading={outputEnFr("Need your used equipment on the consignment program?",
                    "Vous souhaitez mettre une machine en consignation?", this.props.lang)}
                subheading={
                    outputEnFr("Entrust us with your machine, and we'll take care of the rest.",
                        "Confiez-nous votre machine et nous nous occuperons du reste.",
                        this.props.lang)}
            />
        </>
        )
    }
}