import {GLOBALTYPES} from '../actions/globalTypes';
const initialstate=false
const modalReducer=(state=initialstate,action)=>{
 switch(action.type){
     case GLOBALTYPES.MODAL:
         return action.payload;
         default:
             return state;
 }
}
export default modalReducer