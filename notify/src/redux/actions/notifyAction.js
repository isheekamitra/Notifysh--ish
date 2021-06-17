  
import { deletedataapi, getdataapi, patchdataapi, postdataapi } from '../../utils/fetchData'
import { GLOBALTYPES } from './globalTypes'

export const NOTIFY_TYPES={
    GET_NOTIFIES:'GET_NOTIFIES',
    CREATE_NOTIFY:'CREATE_NOTIFY',
    REMOVE_NOTIFY:'REMOVE_NOTIFY',
    UPDATE_NOTIFY:'UPDATE_NOTIFY',
    UPDATE_SOUND:'UPDATE_SOUND',
    DELETE_ALL_NOTIFIES:'DELETE_ALL_NOTIFIES'
}
export const createNotify = ({msg, auth, socket}) => async (dispatch) => {
    try {
        const res = await postdataapi('notify', msg, auth.token)

        socket.emit('createNotify', {
            ...res.data.notify,
            user: {
                username: auth.user.username,
                avatar: auth.user.avatar
            }
        })
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const removeNotify = ({msg, auth, socket}) => async (dispatch) => {
    try {
       await deletedataapi(`notify/${msg.id}?url=${msg.url}`, auth.token)
     
        
       socket.emit('removeNotify', msg)
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const getnotifies=(token) => async (dispatch) => {
    try {
        const res = await getdataapi('notifies',token)
       dispatch({type:NOTIFY_TYPES.GET_NOTIFIES,payload:res.data.notifies})
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}


export const isReadnotify = ({msg, auth}) => async (dispatch) => {
    dispatch({type: NOTIFY_TYPES.UPDATE_NOTIFY, payload: {...msg, isRead: true}})
    try {
        await patchdataapi(`/isreadnotifiy/${msg._id}`, null, auth.token)
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const deleteAllNotifies = (token) => async (dispatch) => {
    dispatch({type: NOTIFY_TYPES.DELETE_ALL_NOTIFIES, payload: []})
    try {
        await deletedataapi('deleteAllNotify', token)
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}