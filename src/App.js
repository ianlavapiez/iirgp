import React, { Fragment, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import GlobalStyle from "./global.styles";
import { Spinner } from "./components";
import { LoginPage } from "./pages/auth";
const FourOFourPage = React.lazy(() => import("./pages/404"));

const App = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route component={LoginPage} exact path="/" />
          <Route exact path="/login" render={() => <Redirect to="/" />} />
          <Route component={FourOFourPage} />
        </Switch>
      </Suspense>
    </Fragment>
  );
};

export default App;
