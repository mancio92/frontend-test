import React, { useEffect } from 'react';
import './App.css';
import Shows from '../containers/Shows';
import UploadShow from '../containers/UploadShow';
//--------------------------  Route Import -----------------------------------
import {Redirect, Route, Router as BrowserRouter, Switch, useHistory} from 'react-router-dom';

const PublicRoute = props => <Route {...props} />;


const App = () => {
  const history = useHistory();

  //------------------------------------ Rendering ----------------------------------------------
    return (
      <div className= 'App'>
        <BrowserRouter history={history} basename={'/'}>
          <Switch>
            <PublicRoute path="/" exact render={() => <Shows /> }  />
            <PublicRoute path="/show/create" exact render={() => <UploadShow /> }  />
            <PublicRoute path="/show/edit/:id" exact render={() => <UploadShow /> }  />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }


export default App;
