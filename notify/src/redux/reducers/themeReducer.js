import {GLOBALTYPES} from '../actions/globalTypes';
const initialstate=false
const themeReducer=(state=initialstate,action)=>{
 switch(action.type){
     case GLOBALTYPES.THEME:
         return action.payload;
         default:
             return state;
 }
}
export default themeReducer