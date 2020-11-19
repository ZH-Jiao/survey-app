import React, { Component } from 'react';
import './App.css';
import { Route, HashRouter, Link} from "react-router-dom";
import Login from './components/login.js';
import Questionnaire from './components/questionnaire.js';
import Result from './components/result.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CssBaseline />
          <Container maxWidth="lg">
            <br/>
            <br/>
            <br/>
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
          </Container>

      </div>
    );
    
  }

}

export default App;
