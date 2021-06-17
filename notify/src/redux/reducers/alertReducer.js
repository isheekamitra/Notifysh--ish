import {GLOBALTYPES} from '../actions/globalTypes';
const initialstate={}
const alertReducer=(state=initialstate,action)=>{
 switch(action.type){
     case GLOBALTYPES.ALERT:
         return action.payload;
         default:
             return state;
 }
}
export default alertReducer
