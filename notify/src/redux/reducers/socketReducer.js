import {GLOBALTYPES} from '../actions/globalTypes';
const initialstate=false
const socketReducer=(state=initialstate,action)=>{
 switch(action.type){
     case GLOBALTYPES.SOCKET:
         return action.payload;
         default:
             return state;
 }
}
export default socketReducer