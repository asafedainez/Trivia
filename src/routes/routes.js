import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/login/Login';
import Game from '../pages/game/Game';
import Config from '../pages/config/Config';
import FeedbackGame from '../pages/feedbackGame/FeedbackGame';
import Ranking from '../pages/ranking/Ranking';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/config" component={ Config } />
        <Route path="/feedback" component={ FeedbackGame } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}

export default Routes;