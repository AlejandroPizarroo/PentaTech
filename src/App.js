import './App.css';
import './app.scss';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './content/LandingPage';
import SearchPage from './content/SearchPage';
import LoginPage from './content/LoginPage';
import { Content} from 'carbon-components-react';
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
        <>
          <Content>
              <Switch>
                  <Route path="/loginpage" component={LoginPage} />
                  <Route exact path="/" component={LandingPage} />
                  <Route path="/searchpage" component={SearchPage} />
              </Switch>
          </Content>
        </>
    );
  }
}
export default App;
