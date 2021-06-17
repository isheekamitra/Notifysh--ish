import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

  const Usercard = ({children,user,border,handleclose,setshowfollowers,setshowfollowing,msg}) => {

    const handlecloseall=()=>{
       if(handleclose)
       handleclose()
       if(setshowfollowers)
       setshowfollowers(false)
       if(setshowfollowing)
       setshowfollowing(false)
    }
    const showMsg=(user)=>{
      return(
        <>
         <div style={{filter:theme?'invert(1)':'invert(0)',
                          color:theme?'white':''}}>
                {user.text}
              </div>
            {user.media.length>0 && <div>{user.media.length} <i className='fas fa-image'/></div>}
          {
            user.call &&
            <span className='material-icons'>
               {
                 user.call.times===0
                 ?user.call.video ? 'videocam_off':'phone_disabled'
                 :user.call.video?'video_camera_front':'call'
               }
            </span>
          }
        </>
      )
    }
    const {theme}=useSelector(state=>state)
    return (
        <div className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}>
        <div>
        <Link to={`/profile/${user._id}`} onClick={handlecloseall}
         className="d-flex p-2 align-items-center">
   <img src={user.avatar} alt="avatar" className="avatar"
               style={{  filter:theme?'invert(1)':'invert(0)'}}
          ></img>
          <div className="ml-1" style={{transform:'translateY(-2px)'}}>
              <span className="d-block">{user.username}</span>
            
              <small style={{opacity:0.7}}
              >
            {  
              msg
              ? showMsg(user)
              :user.fullname
            }
            </small>
          </div>
        </Link>
        </div>
          {children}
        </div>
    );
}


export default Usercard;