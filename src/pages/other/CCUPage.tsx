import React from "react";
import { setBodyClass, outputEnFr } from "../common/HelperFunctions";
import * as Constants from "../common/Constants";
import CTASection from "../common/Sections/CTASection";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

type Props_CCUPage = {
    lang: string
}
export default class CCUPage extends React.PureComponent<Props_CCUPage> {

    render() {
        setBodyClass(["pgListing", "pgCCU"]);
        return (<>
            <Helmet>
                <link rel="canonical" href={Constants.DOMAINBASE + "/" + this.props.lang + "/"+Constants.URLCCU} />
            </Helmet>
            <div id="listing-header-title-wrap" className="container-fluid">
                <div className="container">
                    <div id="listing-header" className="row nopad">
                        <div className="col-xs-12 col-sm-8 col-md-8">
                            <h1 className="ccuPageTitle">
                                {outputEnFr("Cat Certified Used & CVA", "Équipement d'occasion certifié Cat et EVC", this.props.lang)}
                            </h1>
                            <h1 id="listingTitle">
                                {outputEnFr("Used heavy equipment you can rely on, value you can trust.",
                                    "De l’équipement lourd usagé fiable et une valeur sur laquelle vous pouvez compter.",
                                    this.props.lang)}
                            </h1>
                            <h2>
                                {outputEnFr("SHOPPING FOR USED EQUIPMENT? CHOOSE A MACHINE THAT PASSES OUR TOUGHEST TESTS.",
                                    "À LA RECHERCHE D’ÉQUIPEMENT USAGÉ? CHOISISSEZ UNE MACHINE QUI A PASSÉ LES TESTS LES PLUS EXIGEANTS.",
                                    this.props.lang)}
                            </h2>
                            <div id="CategoryFullDescription" className="copytext">

                                {this.props.lang === "en" ? <p>Before you put a Cat<sup>®</sup> Certified Used machine to work, we put it to the test.
                            Each low-hour, well-maintained model must survive a rigorous inspection that
                            includes up to 140 checkpoints before it can even receive a “certified” status.
                            Once a machine passes the test, we service it with Cat parts, complete all
                            required maintenance, back it with a Caterpillar warranty, and turn on the
                            connectivity (if&nbsp;equipped).</p> :
                                    <p>Avant de mettre au travail une machine usagée certifiée Cat<sup>®</sup>, nous la testons.
                        Chacun de nos modèles, à faible utilisation et entretenus régulièrement, doivent subir
                         une inspection rigoureuse qui comprend jusqu'à 140 points de contrôle avant que nous
                         puissions les considérer comme certifiés. Lorsqu’une machine passe ce test, nous la
                          réparons avec des pièces Cat authentiques, nous effectuons tous les entretiens requis,
                          nous fournissons une garantie Caterpillar et nous activons sa connectivité (le cas échéant).</p>}

                        {/*Button linking to machine listings */}
                        <div className="text-center">
                          <Link to={this.props.lang === "en" ? "/en/produits/?certified=1" : "/fr/produits/?certified=1"} >
                              
                            <div className="btn btn-default btn-styling-default"  style={{"padding":"10px 30px", "marginTop":"20px", "fontWeight":"bold"}}>

                            {this.props.lang === "en" ? "Discover our Cat certified" : "Voir nos Cat certifiés"}                                
                            </div>
                          </Link>
                          </div>

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
                        <h3>{outputEnFr("Cat Certified Used:", "Équipement d'occasion certifié Cat :", this.props.lang)}
                        </h3>
                        <h4>{outputEnFr("Proven reliability at unbeatable value", "Fiabilité garantie à une valeur imbattable", this.props.lang)}</h4>

                        <p>
                            {outputEnFr("Cat Certified Used machines are well-maintained, fully inspected, and ready to work.",
                                "Nos machines usagées certifiées Cat sont bien entretenues, entièrement inspectées et prêtes à travailler.", this.props.lang)}
                        </p><br />
                        {this.props.lang === "en" ?
                            <ul>
                                <li>Latest model, low-hour  </li>
                                <li> 140-point inspected  </li>
                                <li>Serviced with genuine Cat parts  </li>
                                <li>Activated Product Link  </li>
                                <li> Includes 1-year warranty (powertrain + hydraulics)  </li>
                            </ul>
                            :
                            <ul>
                                <li> Dernier modèle/peu d’heures </li>
                                <li>Inspection à 140 points </li>
                                <li>Entretenues avec des pièces Cat authentiques </li>
                                <li>Activation de Product Link </li>
                                <li>Comprend une garantie d’un an (groupe motopropulseur + hydraulique) </li>
                            </ul>
                        }
                        <br />

                        <h4>
                            {outputEnFr("For ultimate peace of mind, add a CVA", "Pour l’esprit tranquille, ajoutez une EVC", this.props.lang)}
                        </h4>
                        <p>
                            {outputEnFr("  A Toromont Cat Customer Value Agreement (CVA) is the easiest way to get the most value out of your machine over its lifespan. Choose the  “Do it yourself” maintenance to pick up your parts, or the “Do it for me” service to have our experts service your equipment on-site after-hours.",
                                "Une entente de valeur pour les clients de Toromont Cat (EVC) est la meilleure façon de tirer parti de votre machine pendant sa durée de vie. Choisissez l’entretien « Je le fais moi-même » pour les pièces prêtes à ramasser ou choisissez le service « Faites-le pour moi » afin que nos experts entretiennent votre équipement sur site hors des heures d'ouverture.",
                                this.props.lang)}

                        </p><br />
                        <p>{outputEnFr("Every CVA includes:", "Chaque EVC comprend :", this.props.lang)}</p><br />

                        {this.props.lang === "en" ?
                            <ul>
                                <li>Preventative maintenance parts </li>
                                <li>Annual TA1 inspections </li>
                                <li>Access to the Toromont Cat Hotline </li>
                                <li>Discounted ET and SIS software licenses </li>
                                <li>Extended warranty coverage
                            (powertrain + hydraulics) </li>
                                <li>And much more! </li>
                            </ul>
                            :
                            <ul>
                                <li>des pièces d'entretien préventif </li>
                                <li>des inspections annuelles TA1 </li>
                                <li>l'accès à la ligne d’assistance de Toromont Cat </li>
                                <li>des licences des logiciels ET et SIS à prix réduit </li>
                                <li>une prolongation de garantie (groupe motopropulseur + hydraulique) </li>
                                <li>et bien plus! </li>
                            </ul>
                        }

                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <img src={Constants.IMAGES.CCU1} className="ccuimage hidden-xs" alt="" />
                        <img src={Constants.IMAGES.CCU2} className="ccuimage hidden-xs" alt="" />
                        {/* <br/><br/>
                            <img src={Constants.IMAGES.CCU3} /> */}
                    </div>
                </div>
            </div>
            <CTASection
                lang={this.props.lang}
                curCategory={"CCU"}
                categoryClass={Constants.CLASS_HEAVY}
                heading={outputEnFr("Have questions on Cat Certified used machines? We can help!",
                    "Avez-vous des questions sur nos machines usagées certifiées? Nous pouvons vous aider!", this.props.lang)}
                subheading={
                    outputEnFr("To learn more about any of our CCU machines, connect with us using the form below.",
                        "Pour en savoir plus sur l'une de nos machines usagées certifiées, contactez-nous en remplissant le formulaire ci-dessous.",
                        this.props.lang)}
            />

        </>
        )
    }
}