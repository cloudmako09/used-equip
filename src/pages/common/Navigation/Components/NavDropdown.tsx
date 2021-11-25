import React, { useRef, useEffect } from "react";
import { type_linkList } from "../../Types";
import { Link } from "react-router-dom";
import { PageTypes } from "../../Constants";

type Props_NavDropdown = {
  id: number;
  isOpen: boolean;
  linkName: string;
  fallbackUrl: string;
  pageType: number;
  paramCategory: string;
  dropdownList: type_linkList[] | null;
  handleToggleDropdown;
  handleClickOutsideDropdown;
};

const NavDropdown = (props: Props_NavDropdown) => {
  function useOutsideDetection(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          //function that updates state passed from parent
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

  const topLinkIsCurrent = () => {
    return (
      (props.dropdownList &&
        props.dropdownList.find(function (o) {
          return o.groupCodeSlug === props.paramCategory;
        })) ||
      (props.fallbackUrl.includes("/" + props.paramCategory) &&
        props.pageType !== PageTypes.Details)
    );
  };

  const getDropdownClass = () => {
    return topLinkIsCurrent() ? "dropdown hasCurrent" : "dropdown";
  };

  return props.dropdownList ? (
    <li ref={wrapperRef} className={getDropdownClass()}>
      <button onClick={() => props.handleToggleDropdown(props.id)} tabIndex={0}>
        {props.linkName}
        <span className="caret"></span>
      </button>
      <ul className={"dropdown-menu " + (props.isOpen ? "open" : "closed")}>
        {props.dropdownList ? (
          props.dropdownList.map((link, i) => {
            return (
              <li
                key={i}
                className={
                  props.paramCategory === link.groupCodeSlug ? "current" : ""
                }
              >
                <Link
                  onClick={() => props.handleToggleDropdown(props.id)}
                  to={link.linkUrl}
                >
                  {link.linkText}
                </Link>
              </li>
            );
          })
        ) : (
          <></>
        )}
      </ul>
    </li>
  ) : (
    <li className={topLinkIsCurrent() ? "current" : ""}>
      <Link to={props.fallbackUrl}>{props.linkName}</Link>
    </li>
  );
};
NavDropdown.whyDidYouRender = true;
export default NavDropdown;
