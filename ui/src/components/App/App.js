import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Feed from '../Feed/Feed';
import Login from '../Login/Login';
import './App.css';

function App() {
    return (
        <div className="page-container">
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/feed" component={Feed} />
            </Switch>
        </div>
    );
}

export default App;
