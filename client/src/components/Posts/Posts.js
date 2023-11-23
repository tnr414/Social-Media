import { CircularProgress, Grid } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import Post from './Post/Post'
import useStyles from './styles'

const Posts = ({ setCurrentId }) => {

    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();

    if (!posts && !isLoading) return 'NO Posts';

    return (
        isLoading ? <CircularProgress /> : (
            <Grid
                className={classes.container}
                container
                alignItems='stretch'
                spacing={3}
            >
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )

    )
}

export default Posts