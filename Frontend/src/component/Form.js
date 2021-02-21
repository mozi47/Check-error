import axios from "axios";
import React, { useState, useEffect } from 'react';
import useStyles from './Fstyles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {createPostAction} from "../actions/PostAction";

const Form = () => {
  const classes = useStyles()
  const [postData, setPostData] = useState({
    creator:"", title:"", message:"", tags:"", selectedFile:""
  })
  const dispatch = useDispatch()

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(createPostAction(postData))
  }

  const FileHandler = async(e) =>{
    //setPostData({ ...postData, image: e.target.files[0]})
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("image", file)
    try {
      const config = {
        headers:{
          "Content-Type":"multipart/form-data"
        }
      }
      const {data} = await axios.post("/api/post/upload",formData,config) 
      setPostData({...postData, selectedFile:data})
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const clear = ()=>{
    setPostData({
      creator:"", title:"", message:"", tags:"", selectedFile:""
    })
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">Creating a Memory</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><TextField type="file"  onChange={FileHandler} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;