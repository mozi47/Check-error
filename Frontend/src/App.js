import React from 'react'
import "./index.css"
import useStyles from './Styles';
import { Route, Switch } from "react-router-dom";
import { Container } from '@material-ui/core';
import Navbar from './component/Navbar';
import Home from "./component/Home";
import Auth from "./component/Auth";

const App = () => {
    const classes = useStyles()

    return (
    <Container maxWidth="lg">
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/auth" component={Auth}/>
      </Switch>
    </Container>
    )
}

export default App
