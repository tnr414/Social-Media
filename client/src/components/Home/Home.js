import React, { useState } from 'react'
import { Grow, Container, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input';
import { useHistory, useLocation } from 'react-router-dom'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import Pagination from '../Pagination/Pagination'
import { useDispatch } from 'react-redux'
import { getPostsBySearch } from '../../actions/posts'

import useStyle from './style'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const classes = useStyle();
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const handleKeyPress = (ev) => {
        if (ev.keyCode === 13) {
            searchPost();
        }
    };

    const handleAdd = (tag) => { setTags([...tags, tag]) };

    const handleDelete = (tagToDelete) => { setTags(tags.filter((tag) => tag !== tagToDelete)) };

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/')
        }
    }

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid container justify='spcae-between' alignItems='stretch' spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color='inherit'>
                            <TextField
                                onKeyDown={handleKeyPress}
                                name="search"
                                variant='outlined'
                                label="Search Memories"
                                fullWidth
                                value={search}
                                onChange={(ev) => setSearch(ev.target.value)}
                            />

                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                label="Search Tags"
                                variant='outlined'
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                            />
                            <Button
                                onClick={searchPost}
                                className={classes.searchButton}
                                variant="contained"
                                color="primary"
                            >
                                Search
                            </Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>
                        )}

                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home