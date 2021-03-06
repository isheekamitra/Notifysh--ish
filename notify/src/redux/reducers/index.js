import {combineReducers} from 'redux';
import auth from './authReducer';
import alert from './alertReducer';
import theme from './themeReducer';
import profile from './profileReducer';
import status from './statusReducer';
import homepost from './postReducer';
import modal from './modalReducer';
import detailpost from './detailpostreducer';
import discover from './discoverReducer';
import suggestions from './suggestionReducer';
import socket from './socketReducer';
import notify from './notifyReducer';
import message from './messageReducer';
import online from './onlineReducer';
import call from './callReducer';
import peer from './peerReducer';
export default combineReducers({
    auth,
    alert,
    theme,
    profile,
    status,
    homepost,
    modal,
    detailpost,
    discover,
    suggestions,
    socket,
    notify,
    message,
    online,
    call,
    peer

})