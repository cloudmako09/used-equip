import React, { useEffect, useRef } from "react";
import { outputEnFr } from "../../HelperFunctions";
import { Link } from "react-router-dom";

type Props_FavesPopup = {
  id: number;
  lang: string;
  isOpen: boolean;
  isViewingFaves: boolean;
  handleToggleDropdown;
  handleClickOutsideDropdown;
  handleForceOpenDropdown;
};

const FavouritesNavPopup = (props: Props_FavesPopup) => {
  //detect change to favorites, on change force open by changing open state
  window.addEventListener("DOMContentLoaded", (event) => {
    var favesDropdown = document.getElementById("show-cart");
    let loadedFirstTime = false; //avoids open on page load
    if (favesDropdown != null) {
      var observerOptions = {
        childList: true,
      };
      var observer = new MutationObserver(function (event) {
        if (loadedFirstTime) {
          props.handleForceOpenDropdown(props.id);
        } else {
          loadedFirstTime = true;
        }
      });
      observer.observe(favesDropdown, observerOptions);
    }
  });

  function useOutsideDetection(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.handleClickOutsideDropdown(props.id);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideDetection(wrapperRef);
  const viewingClass = props.isViewingFaves ? "hasCurrent" : "";
  return (
    <>
      <span ref={wrapperRef}>
        <li
          id="desktop-favourites-link"
          className={"hidden-xs hidden-sm " + viewingClass}
        >
          <button
            tabIndex={0}
            className="cart"
            onClick={() => props.handleToggleDropdown(props.id)}
          >
            <i className="fa fa-star"></i>&nbsp;             
              {outputEnFr("My Favourites", "Mes favoris", props.lang)}             
            &nbsp;
            <span className="badge" id="count-cart">
              0
            </span>
          </button>
        </li>
        <div
          id="favesDropdown"
          className={"shopping-cart " + (props.isOpen ? "open" : "closed")}
        >
          <div className="shopping-cart-items show-cart">
            <ul id="show-cart">
              <li>
                <span className="item-name"></span>
              </li>
            </ul>
          </div>
          <div id="cartDropdownBtns">
            <button id="clear-cart" className="clrlist">
              {outputEnFr("Clear list", "Effacer la liste", props.lang)}
            </button>
            <Link
              to={outputEnFr("/en/favourites", "/fr/favoris", props.lang)}
              rel="nofollow"
              onClick={() => props.handleToggleDropdown(props.id)}
            >
              <span id="print2" className="gtlist">
                {outputEnFr(
                  "View my favourites",
                  "Voir mes favoris",
                  props.lang
                )}
              </span>
            </Link>
          </div>
          <div id="cartEmptyMsg">
            <p>
              {outputEnFr(
                "No favourites added to list.",
                "Pas de favoris ajoutés à la liste",
                props.lang
              )}
            </p>
          </div>
        </div>
      </span>
    </>
  );
};
FavouritesNavPopup.whyDidYouRender = true;
export default FavouritesNavPopup;
