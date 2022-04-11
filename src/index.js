
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {NotFoundRoute} from "./NotFoundRoute";
import Login from "./Login";
import Applications from "./Applications";
import ApplicationDetail from "./ApplicationDetail";


// const root = ReactDOM.createRoot(document.getElementById("root"));
ReactDOM.render(
  <React.StrictMode>
      <Router>

          <Switch>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/applications" component={Applications}/>
              <Route exact path="/app/details" component={ApplicationDetail}/>
              <Route exact path="/" component={App}/>
              <Route exact path="*" component={NotFoundRoute}/>
          </Switch>

          <div className="position-static App my-5">
              <h2 className="" style={{fontSize:'14px'}}>Designed &amp; Developed by KWIZERA Emile</h2>
          </div>
      </Router>
  </React.StrictMode>,document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
