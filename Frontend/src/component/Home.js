import React from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Posts from './Posts';
import Form from './Form';

const App = () => {
    //const classes = useStyles()
    return (
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
    )
}

export default App
