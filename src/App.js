import './App.css';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import Getroles from './component/Getroles';
import SignUp from './component/SignUp';
import GetCode from './component/GetCode';
import SetStatus from './component/SetStatus';

function App() {

const  [token,setToken]=useState('')

  return (
    <div className="App">
      <Getroles ></Getroles>
      <SignUp />
      <GetCode setToken={setToken} />
      <SetStatus  token ={token}/>
    </div>
  );
}

export default App;
