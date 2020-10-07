import React from 'react';
import Header from './components/Header';
import ImagesContainer from './components/ImagesContainer';
import SidePanel from './components/SidePanel';
import './App.css'
import Board from './components/scenes/Board';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

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
      <nav>
          <ul>
            <li>
              <Link to="/catalog">
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/catalog">
            <Board />
          </Route>
          <Route exact path="/catalog/:params">
            <Board />
          </Route>
        </Switch>
    </Router>

  )
}

export default App;


