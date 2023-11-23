import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import decode from 'jwt-decode'
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { LOGOUT } from '../../constant/actionTypes';

import useStyles from './styles'


const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch()

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logOut = useCallback(() => {
        dispatch({ type: LOGOUT });
        history.push('/');
        setUser(null);
    }, [dispatch, history]);

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
        }
    }, [user?.token, logOut]);

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to='/' className={classes.brandContainer} >
                <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
                <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar
                            className={classes.purple}
                            alt={user?.result.name}
                            src={user?.result.imageUrl}
                        >
                            {user?.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">
                            {user?.result.name}
                        </Typography>
                        <Button
                            variant='contained'
                            className={classes.logout}
                            color="secondary"
                            onClick={logOut}
                        >
                            Log Out
                        </Button>
                    </div>
                ) : (
                    <Button
                        component={Link}
                        to="/auth"
                        variant='contained'
                        color='primary'
                    >
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar