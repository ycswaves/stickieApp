import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import BoardForm from './components/BoardForm';
import Board from './components/Board';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="create-board" component={BoardForm}/>
    <Route path="board/:id" component={Board} />
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
