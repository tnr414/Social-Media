import { Button, TextField, Typography } from '@material-ui/core';
import React, { useRef, useState } from 'react'
import { commentPost } from '../../actions/posts';
import { useDispatch } from 'react-redux';
import useStyle from './style'

const CommentSection = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    const classes = useStyle();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post?.comments);
    const dispatch = useDispatch();
    const commentRef = useRef();

    const handleClick = async () => {
        const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));
        setComment('');
        setComments(newComments);
        commentRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'>Comments</Typography>
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            <strong>{c.split(': ')[0] }</strong>
                            {c.split(': ')[1]}
                        </Typography>
                    ))}
                    <div ref={commentRef} />
                </div>
                {user?.result?.name && (
                    <div style={{ width: '70%' }}>
                        <Typography variant='h6' gutterBottom>Write a comment</Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(ev) => setComment(ev.target.value)}
                        />
                        <br />
                        <Button
                            style={{ marginTop: '10px' }}
                            fullWidth
                            disabled={!comment.length}
                            color="primary"
                            variant='outlined'
                            onClick={handleClick}
                        >
                            Comment
                        </Button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default CommentSection