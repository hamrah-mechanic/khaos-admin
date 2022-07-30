import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Khaos } from 'khaos-admin';
function App() {
  return (
    <Khaos appConfig={{ root: '', authenticate: true }}>
      <div></div>
    </Khaos>
  );
}

export default App;
