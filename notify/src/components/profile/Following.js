import { useSelector } from "react-redux";
import Followbtn from "../Followbtn";
import Usercard from "../Usercard";

const Following = ({users,setshowfollowing}) => {
const {auth} = useSelector(state=>state)
    return (
        <div className="follow">
            <div className="follow_box">
             <h5 className="text-center">Following</h5>
             <hr/>

             {
                  users.map(user=>(
                      <Usercard
                          key={user._id}
                          setshowfollowing={setshowfollowing}
                          user={user} >
                           { auth.user._id!==user._id && <Followbtn user={user}/>}

                      </Usercard>
                  ))
             }
             <div className="close" onClick={()=>setshowfollowing(false)}>
             &times;

             </div>
            </div>
        </div>

    );
}


export default Following;