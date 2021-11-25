import React from "react";
import { setBodyClass, outputEnFr } from "../common/HelperFunctions";
import { Link } from "react-router-dom";
import { PARAMS } from "../common/Constants";
import { Helmet } from "react-helmet";

type Props_EmailConfirm = {
    lang: string,
    urlParams: string[]
}
class EmailConfirm extends React.PureComponent<Props_EmailConfirm> {

    render() {
        setBodyClass(["pgListing", "pgEmailConfirm"]);
        const isFooterSubscribe = (this.props.urlParams[PARAMS.FORM] === "footer");

        console.log("Rendering EmailConfirm Page", isFooterSubscribe);

        return (<>
            <Helmet>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div style={{ height: "50px" }}>&nbsp;</div>
                        <h1>
                            {outputEnFr("Thank you!", "Merci !", this.props.lang)}

                        </h1> <br />
                        <h2>

                            {isFooterSubscribe ?
                                outputEnFr("You are now subscribed to email updates from Toromont Cat.",
                                    "Vous êtes maintenant inscrit aux mises à jour par courriel de Toromont Cat.",
                                    this.props.lang)
                                :
                                outputEnFr(<>Thank you for contacting Toromont Cat. <br />One of our equipment specialists will be in touch with you soon.</>,
                                    <>Merci d’avoir contacté Toromont Cat. <br />Un de nos spécialistes en équipement communiquera avec vous sous peu.</>,
                                    this.props.lang)
                            }
                            <br /> <br />
                            <Link to="/" className="btn btn-default">
                                &laquo; Back to Toromont Cat Used Equipment</Link>
                        </h2>

                        <div style={{ height: "150px" }}>&nbsp;</div>


                    </div>
                </div>

            </div>

        </>
        )
    }
}
export default EmailConfirm;