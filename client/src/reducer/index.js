import { combineReducers } from 'redux';
import auth from './auth';
import chat from './chat';
import admin from './admin';
import profile from './profile';

export default combineReducers({
    auth,
    chat,
    admin,
    profile
});