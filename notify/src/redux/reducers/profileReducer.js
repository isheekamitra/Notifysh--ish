import { Editdata } from '../actions/globalTypes';
import {PROFILE_TYPES} from '../actions/profileActionss'

const initialstate={
    
    loading:false,
    ids:[],
    users:[],
    posts:[]
}

const profileReducer= (state=initialstate,action)=>{
    switch (action.type) {
        case PROFILE_TYPES.LOADING:
            return{
                ...state,
                loading:action.payload

            };
            case PROFILE_TYPES.GET_USER:
              
              return{
                ...state,
                users:[...state.users,action.payload.user]

            };
            case PROFILE_TYPES.FOLLOW:
              
                return{
                  ...state,
                  users:Editdata(state.users,action.payload._id,action.payload)
  
              };
              case PROFILE_TYPES.UNFOLLOW:
              
                return{
                  ...state,
                  users:Editdata(state.users,action.payload._id,action.payload)
  
              };
              case PROFILE_TYPES.GET_ID:
              
                return{
                  ...state,
                ids:[...state.ids,action.payload]
  
              };
              case PROFILE_TYPES.GET_POSTS:
              
                return{
                  ...state,
                posts:[...state.posts,action.payload]
  
              };
              case PROFILE_TYPES.UPDATE_POST:
              
                return{
                  ...state,
                posts:Editdata(state.posts,action.payload._id,action.payload)
  
              };
        default: return state;
        
    }
}
export default profileReducer