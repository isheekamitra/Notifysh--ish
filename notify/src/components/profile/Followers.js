import { useSelector } from "react-redux";
import Followbtn from "../Followbtn";
import Usercard from "../Usercard";

const Followers = ({users,setshowfollowers}) => {
const {auth} = useSelector(state=>state)
    return (
        <div className="follow">
            <div className="follow_box">
             <h5 className="text-center">Followers</h5>
             <hr/>
             <div className="follow_content">
             {
                  users.map(user=>(
                      <Usercard
                          key={user._id}
                          setshowfollowers={setshowfollowers}
                          user={user} >
                           { auth.user._id!==user._id && <Followbtn user={user}/>}

                      </Usercard>
                  ))
             }
             </div>
             <div className="close" onClick={()=>setshowfollowers(false)}>
             &times;

             </div>
            </div>
        </div>

    );
}


export default Followers;