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
    this.updateData = this.updateData.bind(this);
    this.getData = this.getData.bind(this);
    this.state = {data: {}};
  }

  updateData(theData) {
    this.setState({data: theData});
  }

  getData() {
    return this.state.data;
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
                (<Questionnaire {...props} updateData = {this.updateData}/>)  
              }/>
              
              <Route path="/result" render={(props) =>
                (<Result {...props} getData = {this.getData}/>)  
              }/>
            </HashRouter>
          </Container>

      </div>
    );
    
  }

}

export default App;
