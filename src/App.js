import React, { Component } from 'react';
import './App.css';
import { Route, HashRouter, Link} from "react-router-dom";
import Login from './components/login.js';
import Questionnaire from './components/questionnaire.js';
import Result from './components/result.js';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <HashRouter>
          <Route exact path="/" render={(props) =>
            (<Login {...props}/>)  
          }/>

          <Route path="/questionnaire" render={(props) =>
            (<Questionnaire {...props}/>)  
          }/>
          
          <Route path="/result" render={(props) =>
            (<Result {...props}/>)  
          }/>
        </HashRouter>

      </div>
    );
    
  }

}

export default App;
