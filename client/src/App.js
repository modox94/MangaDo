import React from 'react';
import Header from './components/Header';
import ImagesContainer from './components/ImagesContainer';
import SidePanel from './components/SidePanel';
import './App.css'

function App() {

  return (
    <div>
      
      <Header />
      <div className="wrapper">
        <ImagesContainer />
        <SidePanel />
      </div>

    </div>

  )

}

export default App;


