import { combineReducers } from 'redux';
import auth from './auth';
import chat from './chat';
import channel from './channel';
import admin from './admin';
import profile from './profile';

export default combineReducers({
    auth,
    chat,
    channel,
    admin,
    profile
});