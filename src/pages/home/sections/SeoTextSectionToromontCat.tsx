import React from "react";
import { outputEnFr } from "../../common/HelperFunctions";
import * as Constants from '../../common/Constants';

const SeoTextSection_TCAT = (props:{lang:string}) => {
 
    return (
        <section>
            <div id="ironclad-section" className="container-fluid">
                <div className="container ">
                    <div id="smartreasons" className="col-xs-12 text-center">
                        <h3>{outputEnFr("UNBEATABLE VALUE","UNE VALEUR IMBATTABLE", props.lang)}</h3>
                        <br/>
                            <img src={Constants.IMAGES.HOME_UNBEATABLEVALUE} alt={outputEnFr(" UNBEATABLE VALUE","UNE VALEUR IMBATTABLE", props.lang)} />
              <div className="unbeatValText">
                                <div className="text1">
                                    <h5>{outputEnFr("Superior repair service","Service de réparation hors pair", props.lang)}</h5>
                                </div>
                                <div className="text2">
                                    <h5>{outputEnFr("Tons of parts","Pièces en abondance", props.lang)}</h5>
                                </div>
                                <div className="text3">
                                    <h5> {outputEnFr("Huge inventory","Inventaire imposant", props.lang)}</h5>
                                </div>
                            </div>
            </div>
                        <div className="col-xs-12">
                            <p>
                                {outputEnFr("At Toromont Cat, you will find the largest inventory of used Cat equipment in Eastern Canada. From construction to paving and crushing to forestry, our unbeatable selection offers increased value and top-notch performance in all types of environments. Toromont Cat is your authorized Caterpillar Dealer in Manitoba, Ontario, Quebec, New Brunswick, Nova Scotia, P.E.I., Newfoundland and Labrador, and Nunavut.",
                                    "Chez Toromont Cat, vous trouverez le plus grand inventaire d’équipement usagé Cat dans l’est du Canada. Que ce soit pour des applications de construction, de pavage, de concassage ou forestières, notre sélection d’équipement offre une valeur accrue et une performance inégalée dans tous les types d’environnements. Toromont Cat est votre concessionnaire Caterpillar autorisé au Manitoba, en Ontario, au Québec, au Nouveau-Brunswick, en Nouvelle-Écosse, à l’Île-du-Prince-Édouard, à Terre-Neuve et Labrador et au Nunavut.", props.lang)}

                            </p>


                        </div>

                    </div>
                </div>
      </section>
            );
}
SeoTextSection_TCAT.whyDidYouRender = true;
export default SeoTextSection_TCAT;