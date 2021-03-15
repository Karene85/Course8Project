import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './screens/login/Login';
import Home from './screens/home/Home';
import Profile from './screens/profile/Profile';

class Controller extends Component {

    constructor() {
        super();
        this.state = {
            accessToken: sessionStorage.getItem("access-token")
        }
        
        
    }

    render() {
        return (
            <Router>
                <div>
                <Route exact path='/' render={(props) => <Login {...props}></Login>}></Route>
                <Route path='/home' render={(props) => <Home {...props} accessToken={this.state.accessToken}></Home>}></Route>
                <Route path='/profile' render={(props) => <Profile {...props} accessToken={this.state.accessToken}></Profile>}></Route>
                </div>                
            </Router>
        );
    }
}

export default Controller;