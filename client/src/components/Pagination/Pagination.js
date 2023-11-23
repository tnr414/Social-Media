import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';

import useStyle from './style';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/posts';
import { Link } from 'react-router-dom';

const Paginate = ({page}) => {
    const classes = useStyle();
    const { numberOfPage } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (page) {
            dispatch(getPosts(page));
        }
    }, [dispatch, page]);

    return (
        <Pagination 
            classes={{ul: classes.ul}}
            count={numberOfPage}
            page={Number(page) || 1}
            variant='outlined'
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
  )
}

export default Paginate