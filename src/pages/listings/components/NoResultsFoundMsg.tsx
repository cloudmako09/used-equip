import React from "react";
import { outputEnFr } from "../../common/HelperFunctions";

type Props_NoResultsFoundMsg = {
  lang: string;
  onClearFilters;
};

const NoResultsFoundMsg = ({
  lang,
  onClearFilters,
}: Props_NoResultsFoundMsg) => {
  return (
    <div id="searchwarning">
      <p>
        {outputEnFr(
          "No products found, please adjust your search or check back later for new machines.",
          "0 produits trouvés, veuillez ajuster votre recherche",
          lang
        )}
      </p>
      <br />
      <button
        tabIndex={0}
        className="btn btn-default clearFilters"
        onClick={() => onClearFilters()}
      >
        {outputEnFr(
          "Clear all search filters",
          "Effacer tous les filtres",
          lang
        )}
      </button>
    </div>
  );
};

export default NoResultsFoundMsg;
