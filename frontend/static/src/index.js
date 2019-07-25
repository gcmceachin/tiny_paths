import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.css';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import LoginForm from './components/LoginForm';
import SignupForm from "./components/SignupForm";
import Home from "./components/Home";
import Trail from "./components/Trail";
import TrailList from "./components/TrailList";
import SimpleMap from "./components/GoogleMap";
// import CurrentLocation from "./components/Map";

ReactDOM.render(<BrowserRouter>
    <BaseLayout>
        <Switch>
            <Route path='/signup/' component={SignupForm}/>
            <Route path='/login/' component={LoginForm}/>
            <Route path='/trails/:id/' component={Trail}/>
            <Route path='/trails/' component={TrailList}/>
            <Route path='/SimpleMap/' component={SimpleMap}/>
            {/*<Route path='/maplocation/'component={CurrentLocation}/>*/}
            <Route exact path='/' component={Home}/>
        </Switch>
    </BaseLayout>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();