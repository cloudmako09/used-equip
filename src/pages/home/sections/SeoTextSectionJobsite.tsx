import React from "react";
import { outputEnFr } from "../../common/HelperFunctions";
import * as Constants from "../../common/Constants";

const SeoTextSectionJobsite = (props: { lang: string }) => {
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
              {Constants.isEnvironmentJOBSITE
                ? outputEnFr(
                    "Jobsite Industrial Rental Services offers a wide range of quality used tools and equipment for sale at great prices. All of our equipment has been regularly serviced by our Factory Trained Technicians and has undergone a strict maintenance schedule. Jobsite Industrial Rental Services sells thousands of brand name products and is the authorized distributor for such brands as Lincoln Electric, Greenlee, Rigid, Sumner, RAD, Enerpac, Genie, Eagle Pro, as well as many others.",
                    "Location d’outils industriels Jobsite offrent une vaste gamme d'outils et d'équipements d'occasion de qualité à vendre à des prix avantageux. Tous nos équipements ont été régulièrement entretenus par nos techniciens formés en usine et ont fait l'objet d'un programme d'entretien strict. Location d’outils industriels Jobsite vend des milliers de produits de marque et est le distributeur autorisé de marques telles que Lincoln Electric, Greenlee, Rigid, Sumner, RAD, Enerpac, Genie, Eagle Pro, ainsi que de nombreuses autres.",
                    props.lang
                  )
                : outputEnFr(
                    "At Jobsite Industrial Rental Services, you will find the largest inventory of used Cat equipment in Eastern Canada. From construction to paving and crushing to forestry, our unbeatable selection offers increased value and top-notch performance in all types of environments. Jobsite Industrial Rental Services is your authorized Caterpillar Dealer in Manitoba, Ontario, Quebec, New Brunswick, Nova Scotia, P.E.I., Newfoundland and Labrador, and Nunavut.",
                    "Chez Jobsite Industrial Rental Services, vous trouverez le plus grand inventaire d’équipement usagé Cat dans l’est du Canada. Que ce soit pour des applications de construction, de pavage, de concassage ou forestières, notre sélection d’équipement offre une valeur accrue et une performance inégalée dans tous les types d’environnements. Jobsite Industrial Rental Services est votre concessionnaire Caterpillar autorisé au Manitoba, en Ontario, au Québec, au Nouveau-Brunswick, en Nouvelle-Écosse, à l’Île-du-Prince-Édouard, à Terre-Neuve et Labrador et au Nunavut.",
                    props.lang
                  )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
SeoTextSectionJobsite.whyDidYouRender = true;
export default SeoTextSectionJobsite;
