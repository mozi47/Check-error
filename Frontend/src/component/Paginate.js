import React,{useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { allPosts } from "../actions/PostAction";
//import {Pagination} from "react-bootstrap"
import Pagination from "@material-ui/lab/Pagination"
import PaginationItem from "@material-ui/lab/PaginationItem"
import {LinkContainer} from "react-router-bootstrap"
import { Link} from 'react-router-dom';

const Paginate = ({page}) => {
    const dispatch = useDispatch()
    const pagedata = useSelector((state)=>state.getposts)
    const {totalPosts} = pagedata
    useEffect(()=>{
        dispatch(allPosts("",page))
    },[dispatch,page])
    
    return (
        totalPosts > 1 && (
            <Pagination 
            count={totalPosts}
            page={Number(page)} 
            variant="outlined" 
            color="secondary"
            renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/posts/${item.page}`}
                  {...item}
                  />
                  )} 
            />   
        )
    )
}

export default Paginate
