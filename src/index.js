import "./js_vanilla/wdyr";
import React from "react";
import { render } from "react-dom";

import TagManager from "react-gtm-module";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  isEnvironmentTCAT,
  isEnvironmentBFE_or_BFERENTAL,
  isEnvironmentJOBSITE,
} from "./pages/common/Constants";

let tagManagerArgs;
if (isEnvironmentBFE_or_BFERENTAL) {
  tagManagerArgs = {
    gtmId: "GTM-3L4L",
  };
} else if (isEnvironmentTCAT) {
  tagManagerArgs = {
    gtmId: "GTM-PB9SM93",
  };
} else if (isEnvironmentJOBSITE) {
  tagManagerArgs = {
    gtmId: "GTM-NNBKST2",
  };
}

/*Initialize GTM only in production and not scan from reactSnap*/
// const production = process.env.NODE_ENV === "production";
if (navigator.userAgent !== "ReactSnap") {
  TagManager.initialize(tagManagerArgs);
}
// Render the jsx, will overwrite html rendered by react-snap
render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
