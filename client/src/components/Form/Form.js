import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64'
import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts';
import { useHistory } from 'react-router-dom';

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    });
    const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null))
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) {
            setPostData(post);
        }
    }, [post])

    const handleSubmit = async (ev) => { 
        ev.preventDefault();
        if (currentId === 0) {
            dispatch(createPost({ ...postData, name: user?.result?.name }, history));

        } else {
            dispatch(updatePost(currentId, {  ...postData, name: user?.result?.name }));
        }
        clear();
     };

    const clear = () => {
        setCurrentId(0);
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
        })
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper} >
                <Typography variant='h6' align='center'>
                    Please Sign In to create own memories and like other memories
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                <Typography variant='h6'>
                    {currentId ? `Editing ${post.title}` : 'Creating a memory'}
                </Typography>
    
                <TextField
                    name='title'
                    variant='outlined'
                    label='Title'
                    fullWidth
                    value={postData.title}
                    onChange={(ev) => setPostData({ ...postData, title: ev.target.value })}
                />

                <TextField
                    name='message'
                    variant='outlined'
                    label='Message'
                    fullWidth
                    multiline
                    rows={4}
                    value={postData.message}
                    onChange={(ev) => setPostData({ ...postData, message: ev.target.value })}
                />

                <TextField
                    name='tags'
                    variant='outlined'
                    label='Tags (comma seperated)'
                    fullWidth
                    value={postData.tags}
                    onChange={(ev) => setPostData({ ...postData, tags: ev.target.value.split(',') })}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type='submit'
                    fullWidth
                >
                    Submit
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={clear}
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    )
}

export default Form