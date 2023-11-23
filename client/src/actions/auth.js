import { AUTH } from '../constant/actionTypes';
import * as api from '../api/index'

export const signIn = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        router.push('/');
    } catch (error) {
        console.log(error);
    }
};

export const signUp = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signUP(formData);
        dispatch({ type: AUTH, data });
        router.push('/');
    } catch (error) {
        console.log(error);
    }
};