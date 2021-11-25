import React from "react";
import { outputEnFr } from "../../common/HelperFunctions";

type Props_NoResultsFoundMsg = {
  lang: string,
  onClearFilters
}

class NoResultsFoundMsg extends React.PureComponent<Props_NoResultsFoundMsg> {

  render() {
    return (
      <div id="searchwarning">
        <p>
          {outputEnFr("No products found, please adjust your search or check back later for new machines.", 
          "0 produits trouvés, veuillez ajuster votre recherche", this.props.lang)}
        </p>
        <br />
        <button tabIndex={0} className="btn btn-default clearFilters" onClick={() => this.props.onClearFilters()}>
          {outputEnFr("Clear all search filters", "Effacer tous les filtres", this.props.lang)}
        </button>
      </div>
    )
  }
}
export default NoResultsFoundMsg;