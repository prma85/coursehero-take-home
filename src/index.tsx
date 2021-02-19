import "bootstrap/dist/css/bootstrap.min.css";
import { render } from "react-dom";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";

import App from "./App";
import AppWithApi from "./AppWithApi";

const rootElement = document.getElementById("root");

const RouteWrapper = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/withapi" component={AppWithApi} />
      <Route
        component={() => (
          <div className="App">
            <h1>404: Page not found!</h1>
            <Link to="/">Go back to home</Link>
          </div>
        )}
      />
    </Switch>
  </Router>
);
render(<RouteWrapper />, rootElement);
