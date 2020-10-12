import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as WEBSOCKET_ACTIONS from './redux/actions/websocket/websocket';
// import createGlobalStyle from './fonts/fonts';
import './App.css';
import Header from './components/Header';
import Board from './components/scenes/Board';
import PSD from './components/PSD/Main';
import RegistrationForm from './components/RegistrationForm';
import LogInForm from './components/LogInForm';

function App() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.url);
  const [wsStatus, setWsStatus] = useState(0);

  useEffect(() => {
    let ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_PATH);
    ws.onopen = () => {
      console.log('ws opened');
      dispatch(WEBSOCKET_ACTIONS.RECORD_WEBSOCKET(ws));
    };
    ws.onclose = () => {
      dispatch(WEBSOCKET_ACTIONS.RECORD_WEBSOCKET(''));
      setWsStatus(wsStatus + 1);
    };

    ws.onmessage = function (event) {
      const data = JSON.parse(event.data);
      dispatch(WEBSOCKET_ACTIONS.WS_DISPATCH(data));
    };

    return () => {
      ws.close(); // переписать тут на обновление соединения
    };
  }, [wsStatus]);

  return (
    <Router>
      <main>
        <Header />
        <Switch>
          <Route exact path='/signIn'>
            <LogInForm />
          </Route>
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
