import React, {useEffect} from 'react'
import useStyles from './Psstyles';
import {useDispatch, useSelector} from "react-redux"
import {allPosts} from "../actions/PostAction"
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post';

const Posts = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const postsSelector = useSelector(state=> state.getposts)
    const {posts} = postsSelector

    useEffect(() => {
      dispatch(allPosts())
    }, [dispatch])
    
    return (
      !posts.length ? <CircularProgress /> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6} md={6}>
              <Post post={post}/>
            </Grid>
          ))}
        </Grid>
    ))}

export default Posts
