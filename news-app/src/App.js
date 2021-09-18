
import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News  from './component/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'


export default class App extends Component {
  
  render() {
    return (
      <div>
        <Router>
         
         <Navbar/>
          <Switch>
            <Route path="/general">< News  key="general" pageSize={6} country="in" category="general" /></Route>
            <Route path="/Business">< News  key="Business" pageSize={6} country="in" category="Business" /></Route>
            <Route path="/Technology">< News  key="Technology" pageSize={6} country="in" category="Technology" /></Route>
            <Route path="/Sports">< News  key="Sports" pageSize={6} country="in" category="Sports" /></Route>
            <Route path="/Health">< News  key="Health" pageSize={6} country="in" category="Health" /></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

