// src/routes.js
import React from 'react';
import { Switch, Router, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import About from './components/About';
import NotFound from './components/NotFound';

const Routes = (props) => (
	<BrowserRouter>
	  	<Route path="/" exact component={App} />
		<Route path="/about" component={About} />
	    <Route component={NotFound} />
  	</BrowserRouter>
);

export default Routes;