import React, { useState } from 'react'
import { Avatar, Container, Paper, Typography, Grid, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import Icon from './Icon'
import useStyles from "./styles";
import Input from './Input';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AUTH } from '../../constant/actionTypes';
import { signIn, signUp } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();

    const [form, setForm] = useState(initialState);
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (ev) => {
        ev.preventDefault();

        if (isSignUp) {
            dispatch(signUp(form, history));
        } else {
            dispatch(signIn(form, history))
        }
    };

    const handleChange = (ev) => {
        setForm({ ...form, [ev.target.name]: ev.target.value });
    };

    const switchMode = () => {
        setForm(initialState);
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    const handleShowPassword = () => setShowPassword(prevShowPassword => !prevShowPassword);

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: AUTH, data: { result, token } });
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleError = (error) => {
        console.log(error);
        console.log('Google Sign Fail, Please try again later');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant='h5'>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input
                                    name="firstName"
                                    label="First Name"
                                    handleChange={handleChange}
                                    autoFocus
                                    half
                                />
                                <Input
                                    name="lastName"
                                    label="Last Name"
                                    handleChange={handleChange}
                                    half
                                />
                            </>
                        )}
                        <Input
                            name="email"
                            label="Email Address"
                            handleChange={handleChange}
                            type="email"
                        />
                        <Input
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignUp &&
                            <Input
                                name="confirmPassword"
                                label="Repeat Password"
                                handleChange={handleChange}
                                type="password"
                            />
                        }
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='outlined'
                        color='primary'
                        className={classes.submit}
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                </form>
                <GoogleLogin
                    clientId='98505133820-hn0ngefonpacl5tjtrofsj5nr0700t57.apps.googleusercontent.com'
                    render={(renderProps) => (
                        <Button
                            className={classes.googleButton}
                            color="primary"
                            fullWidth
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            variant="contained"
                            startIcon={<Icon />}
                        >
                            Google Sign In
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy="single_host_origin"
                />
                <Grid container justify='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignUp ? 'Already have an account ? Sign In' : "Don't have an account? Sign In"}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Auth