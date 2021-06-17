import { deletedata, Editdata } from '../actions/globalTypes';
import {POST_TYPES} from '../actions/postActions'
const initialstate={
    loading:false,
    posts:[],
    result:0,
    page:2
}
const postReducer=(state=initialstate,action)=>{
    switch(action.type){
        case POST_TYPES.CREATE_POST:
            return{
                ...state,
                posts:[action.payload,...state.posts]
            };
                case POST_TYPES.LOADING_POST:
                    return{
                        ...state,
                    loading:action.payload
                    };
                    case POST_TYPES.GET_POSTS:
                 
                        return{
                            ...state,
                        posts:action.payload.posts,
                        result:action.payload.result,
                        page:action.payload.page
                        };
                        case POST_TYPES.UPDATE_POST:
                 
                        return{
                            ...state,
                        posts:Editdata(state.posts,action.payload._id,action.payload)
                        };
                        case POST_TYPES.DELETE_POST:
                 
                            return{
                                ...state,
                            posts:deletedata(state.posts,action.payload._id)
                            };
            default: 
            return state;
    }
}
export default postReducer