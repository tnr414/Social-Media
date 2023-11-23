import { CircularProgress, Divider, Paper, Typography } from '@material-ui/core'
import moment from 'moment';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';

import useStyle from './style';

const PostDetails = () => {
    const { posts, post, isLoading } = useSelector((state) => state.posts);
    const classes = useStyle();
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    }, [dispatch]);

    if (!post) return null;

    const openPost = (id) => history.push(`/posts/${id}`);

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);


    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        )
    }

    return (
        <Paper style={{ padding: '15px', borderRadius: '20px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant='h3' component="h2">{post.title}</Typography>
                    <Typography
                        gutterBottom
                        variant='h6'
                        component="h2"
                        color='textSecondary'
                    >
                        {post.tags.map(tag => `#${tag}`)}
                    </Typography>

                    <Typography
                        gutterBottom
                        variant='body1'
                        component="p"
                    >
                        {post.message}
                    </Typography>

                    <Typography variant='h6'>Created by: {post.name}</Typography>
                    <Typography variant='body1'>{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <CommentSection post={post} />
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img
                        className={classes.media}
                        src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                        alt={post.title}
                    />
                </div>
            </div>
            {!!recommendedPosts.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant='h5'>You might also like:</Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                            <div style={{ margin: '20px', cursor: 'pointer' }} key={_id} onClick={() => openPost(_id)}>
                                <Typography variant='h6' gutterBottom>{title}</Typography>
                                <Typography variant='subtitle2' gutterBottom>{name}</Typography>
                                <Typography variant='subtitle2' gutterBottom>{message}</Typography>
                                <Typography variant='subtitle1' gutterBottom>Likes: {likes.length}</Typography>
                                <img src={selectedFile} width="200px" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
    )
}

export default PostDetails