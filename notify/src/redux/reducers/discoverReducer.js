import { DISCOVER_TYPES } from '../actions/discoverActions';
const initialstate={
    loading:false,
    posts:[],
    result:9,
    page:2,
    firstload:false
}
const discoverreducer = (state=initialstate,action) => {
    switch (action.type){
        case DISCOVER_TYPES.LOADING:
            return {
                ...state,
                loading:action.payload
            }
         case DISCOVER_TYPES.GET_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result,
                firstload:true
            }
            case DISCOVER_TYPES.UPDATE_POSTS:
                return {
                    ...state,
                    posts: action.payload.posts,
                    result: action.payload.result,
                    page:state.page+1
                }
        default:
            return state;
    }
}


export default discoverreducer;