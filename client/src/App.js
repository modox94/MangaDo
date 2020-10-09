import React, { useRef, useState, useEffect } from 'react';

import './App.css';
import Board from './components/scenes/Board';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PSD from './components/PSD/Main';
import WSBord from './components/scenes/WSBord';

function App() {
  const [isPaused, setPause] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://http://localhost:3005//');
    ws.current.onopen = () => console.log('ws opened');
    ws.current.onclose = () => console.log('ws closed');

    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e) => {
      if (isPaused) return;
      const message = JSON.parse(e.data);
      console.log('e', message);
    };
  }, [isPaused]);
  return (
    <>
      <Router>
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
      <div>
        <button onClick={() => setPause(!isPaused)}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </>
  );
}

export default App;
