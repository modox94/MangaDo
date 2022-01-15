import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as WEBSOCKET_ACTIONS from './redux/actions/websocket/websocket';

import './App.css';
import Header from './components/Header';
import Board from './components/scenes/Board';
import PSD from './components/PSD/Main';
import RegistrationForm from './components/RegistrationForm/index';
import LogInForm from './components/LogInForm/index';
import PrivateRoute from './components/PrivateRoute';
// import MainPage from './components/MainPage';

function App() {
  const dispatch = useDispatch();

  const [wsStatus, setWsStatus] = useState(0);

  useEffect(() => {
    let ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_PATH);
    ws.onopen = () => {
      console.log('ws opened');
      dispatch(WEBSOCKET_ACTIONS.RECORD_WEBSOCKET(ws));
    };
    ws.onclose = () => {
      console.log('ws closed', wsStatus);
      dispatch(WEBSOCKET_ACTIONS.RECORD_WEBSOCKET(''));
      setWsStatus(wsStatus + 1);
    };

    ws.onmessage = function (event) {
      const data = JSON.parse(event.data);
      dispatch(WEBSOCKET_ACTIONS.WS_DISPATCH(data));
    };

    return () => {
      ws.close();
    };
  }, [wsStatus]);

  return (
    <Router>
      <main>
        <Header />
        <Switch>
          <Route exact path='/'>
            {/* <MainPage /> */}
          </Route>
          <Route exact path='/signIn'>
            <LogInForm />
          </Route>
          <Route exact path='/signUp'>
            <RegistrationForm />
          </Route>

          <PrivateRoute exact path='/psd/:path'>
            <PSD />
          </PrivateRoute>

          <PrivateRoute exact path='/catalog'>
            <Board />
          </PrivateRoute>

          <PrivateRoute exact path='/catalog/:params'>
            <Board />
          </PrivateRoute>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
