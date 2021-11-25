import React from "react";
import { outputEnFr } from "../../HelperFunctions";
import { Link } from "react-router-dom";

type props_FavouritesLinkMobile = {
  lang: string;
};

const FavouritesLinkMobile = (props: props_FavouritesLinkMobile) => {
  return (
    <Link
      to={outputEnFr("/en/favourites", "/fr/favoris", props.lang)}
      className="cart"
    >
      <i className="fa fa-star"></i>
      &nbsp;{outputEnFr("My Favourites", "Mes favoris", props.lang)}
      &nbsp;
      <span className="badge" id="count-cart-mobile">
        0
      </span>
    </Link>
  );
};
FavouritesLinkMobile.whyDidYouRender = true;
export default FavouritesLinkMobile;
