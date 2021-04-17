import React, { useState, useEffect, Fragment } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button, TextField } from '@material-ui/core';
import { Link} from 'react-router-dom';
import memories from '../images/memories.png';
import useStyles from './Nstyle';
import {useHistory, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux"
import {allPosts} from "../actions/PostAction"

const Navbar = () => {
  const classes = useStyles();
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
  const [search,setSearch] = useState("");
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  const Logout = ()=>{
    dispatch({type:"LOGOUT"})
    history.push("/auth")
    setUser(null)
  }

  useEffect(() => {
    const token = user?.token
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location,search])

  const searchPost = () =>{
    if(search.trim()){
      dispatch(allPosts(search))
      history.push(`/search/${search}`)
    }else{
      history.push("/")
    }
  }

  return (
    <Fragment>
    <div className={classes.searchBar} color="inherit">
      <TextField name="search" variant = "outlined" label="Search Blog Post" className={classes.search} fullWidth value={search} onChange={(e)=>setSearch(e.target.value)}/>
      <Button onClick={searchPost} className={classes.searchbtn} variant="contained" color="primary">Search</Button>
    </div>
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={Logout}>Logout</Button>
          </div>
        ) : (
          <div className={classes.profile}>
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            <Button component={Link} to="/contact" variant="contained" color="primary">Contact US</Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
    </Fragment>
  );
};

export default Navbar 