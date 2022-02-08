import axios from "axios";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_PROFILE,
    AUTH_FAIL,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS
} from './types';
import Cookies from "js-cookie";
import { setTokenHeader } from "../utils/setTokenHeader";

// 'Authorisation': `Bearer ${Cookies.get('token')}`
// Auth Profile

export const getLoggedProfile = () => async dispatch => {
    try {
        if (Cookies.get('token'))
            setTokenHeader(Cookies.get('token'));
        const res = await axios.get('http://localhost:4000/api/users/me');
        console.log('LoggedIn: ', res.data);
        dispatch({
            type: AUTH_PROFILE,
            payload: res.data
        })
    }catch(err) {
        console.log(err);
        dispatch({
            type: AUTH_FAIL
        })
    }
}

// Register User
export const register = ({ username, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('http://localhost:4000/api/users/register', {
            username,
            email,
            password,
        }, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        })
    }catch(err) {
        console.log(err.message);
        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

// Login User

export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('http://localhost:4000/api/users/login', {
            email,
            password
        }, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(getLoggedProfile());
    }catch(err) {
        console.log(err.response.data.error);
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// Logout User
export const logout = () => async dispatch => {
    try {
        dispatch({
            type: LOGOUT_SUCCESS,
        })
    }catch(err) {
        console.log(err);
        dispatch({
            type: LOGOUT_FAIL
        })
    }
}