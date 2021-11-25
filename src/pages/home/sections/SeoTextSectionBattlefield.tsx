import React from "react";
import { outputEnFr } from "../../common/HelperFunctions";
import * as Constants from "../../common/Constants";

const SeoTextSectionBattlefield = (props: { lang: string }) => {
  return (
    <section>
      <div id="ironclad-section" className="container-fluid">
        <div className="container ">
          <div id="smartreasons" className="col-xs-12 text-center">
            <h3>
              {outputEnFr(
                "UNBEATABLE VALUE",
                "UNE VALEUR IMBATTABLE",
                props.lang
              )}
            </h3>
            <br />
            <img
              src={Constants.IMAGES.HOME_UNBEATABLEVALUE}
              alt={outputEnFr(
                " UNBEATABLE VALUE",
                "UNE VALEUR IMBATTABLE",
                props.lang
              )}
            />
            <div className="unbeatValText">
              <div className="text1">
                <h5>
                  {outputEnFr(
                    "Superior repair service",
                    "Service de réparation hors pair",
                    props.lang
                  )}
                </h5>
              </div>
              <div className="text2">
                <h5>
                  {outputEnFr(
                    "Tons of parts",
                    "Pièces en abondance",
                    props.lang
                  )}
                </h5>
              </div>
              <div className="text3">
                <h5>
                  {" "}
                  {outputEnFr(
                    "Huge inventory",
                    "Inventaire imposant",
                    props.lang
                  )}
                </h5>
              </div>
            </div>
          </div>
          <div className="col-xs-12">
            <p>
              {Constants.isEnvironmentBFERENTAL
                ? outputEnFr(
                    "Battlefield Equipment Rentals offers a wide range of quality, low-hour used machines for sale at great prices. All of our equipment has been regularly serviced by our Factory Trained Technicians and has undergone a strict maintenance schedule. Battlefield Equipment Rentals sells thousands of brand name products and is the authorized distributor for such brands as Caterpillar, Spectra Precision / Trimble, Wacker Neuson, Stihl, Honda, SkyJack, Genie, Husqvarna, Atlas Copco, Bosch, Gorman-Rupp, as well as many others.",
                    "Location d’équipement Battlefield offre à prix avantageux une large gamme de machines d’occasion de qualité avec peu d’heures d’utilisation. Tous nos équipements font l’objet d’un entretien régulier par nos techniciens formés en usine selon un programme de maintenance rigoureux. Location d’équipement Battlefield procure des produits de marque de confiance et est le distributeur autorisé de produits Caterpillar, Spectra Precision/Trimble, Wacker Neuson, STIHL, Honda, SkyJack, Genie, Huqsvarna, Atlas Copco, Bosch, Godwin, entre autres.",
                    props.lang
                  )
                : outputEnFr(
                    "At Battlefield Equipment Rentals, you will find the largest inventory of used Cat equipment in Eastern Canada. From construction to paving and crushing to forestry, our unbeatable selection offers increased value and top-notch performance in all types of environments. Battlefield Equipment Rentals is your authorized Caterpillar Dealer in Manitoba, Ontario, Quebec, New Brunswick, Nova Scotia, P.E.I., Newfoundland and Labrador, and Nunavut.",
                    "Chez Battlefield Equipment Rentals, vous trouverez le plus grand inventaire d’équipement usagé Cat dans l’est du Canada. Que ce soit pour des applications de construction, de pavage, de concassage ou forestières, notre sélection d’équipement offre une valeur accrue et une performance inégalée dans tous les types d’environnements. Battlefield Equipment Rentals est votre concessionnaire Caterpillar autorisé au Manitoba, en Ontario, au Québec, au Nouveau-Brunswick, en Nouvelle-Écosse, à l’Île-du-Prince-Édouard, à Terre-Neuve et Labrador et au Nunavut.",
                    props.lang
                  )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
SeoTextSectionBattlefield.whyDidYouRender = true;
export default SeoTextSectionBattlefield;
