import React from 'react';
import Header from './components/Header';
import ImagesContainer from './components/ImagesContainer';
import SidePanel from './components/SidePanel';

import './App.css';
import Board from './components/scenes/Board';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PSD from './components/PSD/Main';
import WSBord from './components/scenes/WSBord';

function App() {
  return (
    <Router>
      <Link to='/WS'> WSsocketsTest</Link>

      <Switch>
        <Route exact path='/WS'>
          <WSBord />
        </Route>
        <Route exact path='/psd/:path'>
          <PSD />
        </Route>
        <Route exact path='/catalog'>
          <Board />
        </Route>
        <Route exact path='/catalog/:params'>
          <Board />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
