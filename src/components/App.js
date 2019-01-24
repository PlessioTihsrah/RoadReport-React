import React from "react";
import { Router, Route, Switch } from 'react-router-dom';
import Header from "./Header";
import Home from "./Home";
import View from "./View";
import Login from "./Login";
import Report from "./Report";
import ViewOne from "./ViewOne";
import history from '../history';

class App extends React.Component {
    render() {
        return(
            <div>
                <Router history={history}>
                <div>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/view" exact component={View} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/report" exact component={Report} />
                    <Route path ="/viewOne/:id" exact component={ViewOne} />
                </Switch>
                </div>
                </Router>
            </div>
            
            );
    }
}

export default App;