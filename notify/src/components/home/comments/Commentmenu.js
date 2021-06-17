 import {useDispatch, useSelector} from 'react-redux';
import { deletecomment } from '../../../redux/actions/commentAction';
const Commentmenu = ({post,comment,setonedit}) => {
    const {auth,socket}= useSelector(state=>state)
    const dispatch= useDispatch()
    const handleremove=()=>{
        if(post.user._id===auth.user._id||comment.user._id===auth.user._id)
        dispatch(deletecomment({post,auth,comment,socket}))
    }
    const menuitem=()=>{
   return(
       <>
        <div className="dropdown-item" onClick={()=>setonedit(true)}>
      <span className="material-icons"  >
     create </span>Edit
     </div>
     <div className="dropdown-item">
      <span className="material-icons" onClick={handleremove} >
     delete_outline  </span>Remove
     </div>
     
       </>
   )
    }
    return (
        <div className="menu">
            {
                (post.user._id===auth.user._id||comment.user._id===auth.user._id) &&
                <div className="nav-item dropdown">
                    <span className="material-icons" id="morelink" data-toggle='dropdown' >
                    more_vert
                    </span>
                    <div className="dropdown-menu" aria-labelledby="morelink">
                        {
                            post.user._id===auth.user._id
                            ? comment.user._id===auth.user._id
                                ?menuitem()
                                 :  <div className="dropdown-item">
                                      <span className="material-icons" onClick={handleremove} >
                                        delete_outline
                                          </span>Remove
                                       </div>
                            : comment.user._id===auth.user._id && menuitem()
                        }
                    </div>
                </div>
            }
        </div>
    )
}


export default Commentmenu;