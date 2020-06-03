import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Speakers from "./pages/Speakers/Speakers";
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Events from "./pages/Events/Events";
import Contact from "./pages/Contact/Contact";

ReactDOM.render(
    <div style={{ position: 'absolute', top: 0, width: '100%' }}>
    <Router>
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
              key={location.key}
              timeout={300}
              classNames='fade'
          >
            <Switch location={location}>
              <Route component={Events} path="/events" />
              <Route component={Contact} path="/contact" />
              <Route component={Speakers} path="/speakers" />
              <Route component={App} path="/" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />
    </Router>
    </div>, document.getElementById('root'));
