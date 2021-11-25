import React from "react";
import { Link } from "react-router-dom";

type Props_NoResultsFamEmptyMsg = {
  lang: string 
}

const NoResultsFamEmptyMsg = (props: Props_NoResultsFamEmptyMsg) => {

  let viewAllBtnText;
  let viewAllBtnUrl;
  let textWarning;

  if (props.lang === "fr") {
    textWarning = "Aucun équipement n’est présentement disponible dans cette catégorie.";
    viewAllBtnUrl = "/fr/produits";
    viewAllBtnText = "Rechercher toutes les catégories";
  } else {
    textWarning = "No equipment is currently available in this category";
    viewAllBtnUrl = "/en/products";
    viewAllBtnText = " View all products";
  }


  return (
    <div id="searchwarning">
      <div className="emptycategory">
        <p> {textWarning}</p>
        <br />
        <Link to={viewAllBtnUrl} className="btn btn-default">
          {viewAllBtnText}
        </Link>
      </div>
    </div>
  )
}
NoResultsFamEmptyMsg.whyDidYouRender = true;
export default NoResultsFamEmptyMsg;