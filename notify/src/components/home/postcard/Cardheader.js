import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {GLOBALTYPES} from '../../../redux/actions/globalTypes'
import { deletepost } from '../../../redux/actions/postActions';
import {BASE_URL} from '../../../utils/config'
const Cardheader = ({post}) => {
    const {auth,theme,socket} = useSelector(state=>state)
    const dispatch= useDispatch()
    const history= useHistory();
    const handleeditpost=()=>{
       
         dispatch({type:GLOBALTYPES.STATUS,payload:{...post,onEdit:true}})
    }
    const handledeletepost=()=>{
        if(window.confirm('Are you sure you want to delete this post?')){
            dispatch(deletepost({post,auth,socket}))
            return history.push('/')
        }
      
    }
    const handlecopylink=()=>{
        navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
    }
    return (
        <div className="card_header">
        <div className="d-flex">
            <img src={post.user.avatar} height="50px" width="50px" alt="kk" style={{ borderRadius: 50,margin:10,objectFit:'contain',filter:theme?'invert(1)':'invert(0)'}} ></img>
            <div className="card_name">
             <h6>
                 <Link to={`/profile/${post.user._id}`} className="text-dark">
                     {post.user.username}
                 </Link>
             </h6>
             <small className="text-muted">
             {moment(post.createdAt).fromNow()}
             </small>
            </div>
        </div>
             <div className="nav-item dropdown">
                 <span className="material-icons" id="more_link" data-toggle="dropdown">
                     more_horiz
                 </span>
                 <div className="dropdown-menu">
                {
                  auth.user._id===post.user._id && 
                  <>
                  <div className="dropdown-item" onClick={handleeditpost}>
                      <span className="material-icons">create</span> Edit Post
                  </div> 
                  <div className="dropdown-item" onClick={handledeletepost}>
                      <span className="material-icons">delete_outline</span> Remove Post
                  </div>

                  </>
                }
                <div className="dropdown-item"  onClick={handlecopylink}>
                      <span className="material-icons">content_copy</span> Copy Link
                  </div>
                 </div>
             </div>
        </div>
    );
}


export default Cardheader;