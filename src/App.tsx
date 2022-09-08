import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import PageWrapper from "./PageWrapper";
import "./css/usedtheme.scss";
import {
  isEnvironmentBFE_or_BFERENTAL,
  isEnvironmentJOBSITE,
  PageTypes,
  URLCCU,
  URLCONSIGNMENT,
} from "./pages/common/Constants";

if (isEnvironmentBFE_or_BFERENTAL) {
  require("./css/battlefieldtheme.scss");
}
if (isEnvironmentJOBSITE) {
  require("./css/jobsite-theme.scss");
}
if (process.env.NODE_ENV === "production") {
  console.log = function () {}; //disable console messages in production
}

// export const history = createBrowserHistory({
//   basename: process.env.PUBLIC_URL
// });

const queryClient = new QueryClient();

function AppRouter() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route
            path="/:param_Lang(en|fr)/email"
            children={<PageWrapper pageType={PageTypes.EmailConfirm} />}
          />
          <Route
            path={"/:param_Lang(en|fr)/" + URLCONSIGNMENT}
            children={<PageWrapper pageType={PageTypes.Consignment} />}
          />
          <Route
            path={"/:param_Lang(en|fr)/" + URLCCU}
            children={<PageWrapper pageType={PageTypes.CCU} />}
          />
          <Route
            path="/:param_Lang(en|fr)/:param_Category/:param_Serial"
            children={<PageWrapper pageType={PageTypes.Details} />}
          />
          <Route
            path="/:param_Lang(en|fr)/:param_Category"
            children={<PageWrapper pageType={PageTypes.Listings} />}
          />
          <Route
            path="/:param_Lang(en|fr)"
            children={<PageWrapper pageType={PageTypes.Home} />}
          />
          <Route
            path="/updatesitemap"
            children={<PageWrapper pageType={PageTypes.UpdateSitemap} />}
          />
          <Route
            path="/"
            children={<PageWrapper pageType={PageTypes.Home} />}
          />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

AppRouter.whyDidYouRender = true;
export default AppRouter;
