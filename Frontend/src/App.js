import React from 'react'
import "./index.css"
import useStyles from './Styles';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Posts from './component/Posts';
import Form from './component/Form';
import memories from './images/memories.png';

const App = () => {
    const classes = useStyles()

    return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
    )
}

export default App
