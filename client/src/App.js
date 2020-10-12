import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as WEBSOCKET_ACTIONS from './redux/actions/websocket/websocket';

import './App.css';
import Header from './components/Header';
import Board from './components/scenes/Board';
import PSD from './components/PSD/Main';
import RegistrationForm from './components/RegistrationForm';

function App() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.url);

  useEffect(() => {
    let ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_PATH);
    ws.onopen = () => {
      console.log('ws opened');
      dispatch(WEBSOCKET_ACTIONS.RECORD_WEBSOCKET(ws));
    };
    ws.onclose = () => (window.location = '/');

    ws.onmessage = function (event) {
      const data = JSON.parse(event.data);
      dispatch(WEBSOCKET_ACTIONS.WS_DISPATCH(data));
    };

    return () => {
      ws.close(); // переписать тут на обновление соединения
    };
  }, []);

  return (
    <Router>
      <main>
        <Header />
        <Switch>
          <Route exact path='/signUp'>
            <RegistrationForm />
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
      </main>
    </Router>
  );
}

export default App;
