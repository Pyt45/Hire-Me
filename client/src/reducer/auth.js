import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_PROFILE,
    AUTH_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from "../actions/types";
import Cookies from "js-cookie";

const initialState = {
    token: Cookies.get('token'),
    isLogged: false,
    loading: true,
    user: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case AUTH_PROFILE:
            return {
                ...state,
                isLogged: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
                isLogged: true,
                loading: false,
            }
        case LOGIN_SUCCESS:
            Cookies.set('token', payload.token)
            return {
                ...state,
                ...payload,
                isLogged: true,
                loading: false,
            }
        case LOGOUT_SUCCESS:
            Cookies.remove('token');
            return {
                token: null,
                isLogged: false,
                loading: false,
                user: null,
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_FAIL:
        case LOGOUT_FAIL:
            Cookies.remove('token');
            return {
                ...state,
                isLogged: false,
                token: null,
                loading: false,
            }
        default:
            return state;
    }
}