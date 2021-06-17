import {GLOBALTYPES} from '../actions/globalTypes';
const initialstate={}
const authReducer=(state=initialstate,action)=>{
 switch(action.type){
     case GLOBALTYPES.AUTH:
         return action.payload;
         default:
             return state;
 }
}
export default authReducer