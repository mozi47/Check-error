import React, { useState } from 'react';
import { Button, Paper,Typography, Container } from '@material-ui/core';
import {useDispatch,use} from "react-redux";
import { TextField } from '@material-ui/core';
import useStyles from './Astyle';
import {sendEmailAction} from "../actions/PostAction"

const Contact = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [postData, setPostData] = useState({
      name:"",
      email:"",
      message:""
  })

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(sendEmailAction(postData))
    setPostData({
      name:"", email:"", message:""
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">Contact US</Typography>
            <TextField name="name" variant="outlined" label="name" fullWidth value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
            <TextField name="email" variant="outlined" label="email" fullWidth value={postData.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })} />
            <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>SEND</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Contact;