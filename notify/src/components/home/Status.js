import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Status = () => {
    const {auth,theme} = useSelector(state=>state)
    const dispatch = useDispatch();
    return (
        <div className="status my-3 d-flex">
 <img src={auth.user.avatar} alt="avatar" className="avatar"
           style={{filter:theme?'invert(1)':'invert(0)'}}
          ></img>
          <button className="statusnbtn flex-fill"
          onClick={()=>dispatch({type:GLOBALTYPES.STATUS,payload:true})}
          >
              {auth.user.username}, what are you thinking?
          </button>
        </div>
    );
}



export default Status;