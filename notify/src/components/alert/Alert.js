import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import Toast from "./Toast";
import {GLOBALTYPES} from '../../redux/actions/globalTypes';

const Notifi = () => 
{   const {alert}=useSelector(state=>state)
const dispatch= useDispatch();
   
    return (<div>
 
        {alert.loading &&<Loading/>}

      {alert.error&&<Toast 
      msg={{title:'Error',body:alert.error}}
       handleshow={()=>dispatch({type:GLOBALTYPES.ALERT,payload:{}})}
       bgcolor="bg-danger"/>}

      {alert.success&&<Toast
            msg={{title:'Success',body:alert.success}}
       handleshow={()=>dispatch({type:GLOBALTYPES.ALERT,payload:{}})}
       bgcolor="bg-success"
      />}
    </div>);
}



export default Notifi;