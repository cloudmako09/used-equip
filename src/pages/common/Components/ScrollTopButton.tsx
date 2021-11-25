import React, { useState } from "react";

const ScrollTopButton = (props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const scrollAmountPx = 125; //amount in px user scrolls before button shows

  function detectVisibility() {
    // When the user scrolls down from the top of the document, show the button
    if (
      document.body.scrollTop > scrollAmountPx ||
      document.documentElement.scrollTop > scrollAmountPx
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  function scrollToTop() {
    const el = document.getElementById("prenav"); //uses prenav element since it's at very top
    el && el.scrollIntoView({ behavior: "smooth" });
  }

  window.onscroll = function () {
    detectVisibility();
  };

  return isVisible ? (
    <button
      className="fade-in"
      onClick={() => scrollToTop()}
      id="scrollTopBtn"
      title="Go to top"
    >
      <i className="fa fa-angle-up">
        <span className="sr-only">Back to top</span>
      </i>
    </button>
  ) : (
    <></>
  );
};
ScrollTopButton.whyDidYouRender = true;
export default ScrollTopButton;
