import React,{Fragment} from 'react'
import { Container, Grow, Grid } from '@material-ui/core';
import Posts from './Posts';
import Form from './Form';
import Paginate from './Paginate';

const Home = ({match}) => {
    const page = match.params.page
    //console.log(match.params.page)
    //const classes = useStyles()
    return (
      <Fragment>
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
        <Paginate page={page} />
      </Fragment>
    )
}

export default Home
