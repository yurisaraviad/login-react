//import logo from './logo.svg';
//import './App.css';

import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from '../pages/Login';
import Menu from '../pages/Menu'


//3:31

function App() {

  // return(
  //   <BrowserRouter>
  //     <Switch>
  //       <Route exact path="/" component={Login}/>
  //     </Switch>
  //   </BrowserRouter>
  // )


  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </Router>
  )


}

export default App;
