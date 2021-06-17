import { useDispatch, useSelector } from "react-redux"
import { deleteMessages } from "../../redux/actions/messageAction"
import Times from './Times'

const MsgDisplay = ({user,msg,theme,data}) => {
    
    const {auth} = useSelector(state=>state)
    const dispatch= useDispatch()
    const imageshow=(src)=>{
        return(
            <img 
            src={src} alt="img" className="img-thumbnail"
            style={{filter:theme?'invert(1)':'invert(0)'}}
            />
        )
    }
    const videoshow=(src)=>{
        return(
            <video controls
            src={src} alt="img" className="img-thumbnail"
            style={{filter:theme?'invert(1)':'invert(0)'}}
            />
        )
    }

    
    const handleDeleteMessages = () => {
        if(!data) return;
        
        if(window.confirm('Do you want to delete?')){
            dispatch(deleteMessages({msg, data, auth}))
        }
    }
    return (
        <>
        <div className="chat_title">
        <img src={user.avatar} alt="avatar" className="avatar"
               style={{filter:theme?'invert(1)':'invert(0)'}}
          ></img>
          <span>{user.username}</span>
        </div>
        <div className='you_content'>
        {user._id===auth.user._id 
        &&
        <i className='fas fa-trash text-danger' 
          onClick={handleDeleteMessages}
        />
        }
    
        <div>
        {
            msg.text && 
            <div className="chat_text"
             style={{
                              filter: theme ? 'invert(1)' : 'invert(0)'
                            
                              }}
            >
            {msg.text}
        </div>    
        }

        {
            msg.media.map((item,index)=>(
                <div key={index}>
                       {
                           item.url.match(/video/i)
                           ? videoshow(item.url)
                         :imageshow(item.url)
                       }
                </div>
            ))
        }
        </div>
         
         {
             msg.call &&
             <button className='btn d-flex align-items-center py-3' style={{background:'#eee',borderRadius:'10px'}}>
                   <span className='material-icons font-weight-bold mr-1'
                   style={{fontSize:'2.5rem', color:msg.call.times===0?'crimson':'green',
                   filter:theme? 'invert(1)':'invert(0)'}}
                   
                   >
                      {
                          msg.call.times===0
                          ?msg.call.video ? 'videocam_off':'phone_disabled'
                          :msg.call.video?'video_camera_front':'call'
                      }
                   </span>
                   <div className="text-left">
                            <h6>{msg.call.video ? 'Video Call' : 'Audio Call'}</h6>
                            <small>
                                {
                                    msg.call.times > 0 
                                    ? <Times total={msg.call.times} />
                                    : new Date(msg.createdAt).toLocaleTimeString()
                                }
                            </small>
                        </div>
             </button>
         }
       </div>
        <div className="chat_time">
            {new Date(msg.createdAt).toLocaleString()}
        </div>
        </>
    );
}



export default MsgDisplay;