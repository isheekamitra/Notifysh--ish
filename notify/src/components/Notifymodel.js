import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from 'moment';
import { isReadnotify, NOTIFY_TYPES,deleteAllNotifies } from "../redux/actions/notifyAction";
const Notifymodel = () => {
    const {auth,notify,theme}= useSelector(state=>state)
    const dispatch= useDispatch()
    const handleisread=(msg)=>{
        dispatch(isReadnotify({msg,auth}))
    }
    const handlesound=()=>{
       dispatch({type:NOTIFY_TYPES.UPDATE_SOUND,payload: !notify.sound})
    }
    const handledeleteall=()=>{
        const newarr= notify.data.filter(item=>item.isRead===false)
        if(newarr.length===0)
        return dispatch(deleteAllNotifies(auth.token))
        if(window.confirm(`You have ${newarr.length} unread notifications. Are you sure you want to delete them all?`)){
            return dispatch(deleteAllNotifies(auth.token))
        }
    }
    return (
        <div style={{minWidth:'280px'}}>
            <div className='d-flex justify-content-between align-items-center px-3'>
                <h3>Notification</h3>
                {
                    notify.sound
                    ? <i className="fas fa-bell text-danger
                    " style={{fontSize:'1.2rem',cursor:'pointer'}}
                        onClick={handlesound}
                    />
                    : <i className="fas fa-bell-slash text-danger
                    " style={{fontSize:'1.2rem',cursor:'pointer'}}
                    onClick={handlesound}
                    />
                }
            </div>
            <hr className='mt-0'/>
            {
                notify.data.length===0 &&
                <img src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/71a10621034171.562fa9db406f1.gif' alt="hi" className="w-100"/>
            }
            <div style={{maxHeight:'calc(100vh - 200px',overflow:'auto'}}>
            {
                notify.data.map((msg,index)=>(

                      <div key={index} className='px-2 mb-3'>
                      <Link to={`${msg.url}`} className='d-flex text-dark align-items-center'
                      onClick={()=>handleisread(msg)}
                      >
                      <img src={msg.user.avatar} alt="avatar" className="avatar"
                            style={{filter:theme?'invert(1)':'invert(0)'}}></img>
                     <div className="flex-fill mx-1">
                         <div>
                             <strong className='mr-1'>{msg.user.username}</strong>
                             <span>{msg.text}</span>

                         </div>
                         {msg.content && <small>{msg.content.slice(0,20)}...</small>}
                     </div>
                     <div style={{width:'30px'}}>
                         {msg.image &&  <img src={msg.image} alt="avatar" className="avatar"
                            style={{filter:theme?'invert(1)':'invert(0)'}}></img> }
                     </div>
                      </Link>
                      <small className='text-muted d-flex justify-content-between px-2'>
                          {moment(msg.createdAt).fromNow()}
                          {
                              !msg.isRead && <i className='fas fa-circle text-primary'/>
                          }
                      </small>
                      </div>
                ))
            }

            </div>
            <hr className='my-1'/>
            <div className='text-right text-danger mr-2' style={{cursor:'pointer'}}
            onClick={handledeleteall}
            >
                Delete All
            </div>
        </div>
    );
}



export default Notifymodel;