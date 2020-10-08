import React from 'react';
import Header from './components/Header';
import ImagesContainer from './components/ImagesContainer';
import SidePanel from './components/SidePanel';

import './App.css';
import Board from './components/scenes/Board';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PSD from './components/PSD/Main';

function App() {
  return (
    // <div>
    //   <Header />
    //   <div className="wrapper">
    //     <ImagesContainer />
    //     <SidePanel />
    //   </div>
    // </div>
    <Router>
      <Switch>
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
