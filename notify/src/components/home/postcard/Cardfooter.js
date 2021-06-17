import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { likepost, unlikepost,savePost, unSavePost} from '../../../redux/actions/postActions';
import Likebtn from '../../Likebtn';
import Sharemodel from '../../Sharemodel';
import {BASE_URL} from '../../../utils/config'



const Cardfooter = ({post}) => {
  const[islike,setislike]=useState(false)
  const[loadlike,setloadlike]=useState(false)
  const [isshare,setisshare]=useState(false)
  const {auth,theme,socket} =useSelector(state=>state)
  const [saved, setSaved] = useState(false)
  const [saveLoad, setSaveLoad] = useState(false)
  const dispatch= useDispatch()
//likes
  useEffect(()=>{
    if(post.likes.find(like=>like._id===auth.user._id)){
      setislike(true)
    }
    else{
      setislike(false)
    }
  },[post.likes,auth.user._id])
  const handlelike=async()=>{
    if(loadlike)
    return;
    setislike(true)
    setloadlike(true)
    await dispatch(likepost({post,auth,socket}))
    setloadlike(false)
  }
  const handleunlike=async()=>{
    if(loadlike)
    return;
    setislike(false)
    setloadlike(true)
    await dispatch(unlikepost({post,auth,socket}))
    setloadlike(false)
    
  }
// Saved
useEffect(() => {
  if(auth.user.saved.find(id => id === post._id)){
      setSaved(true)
  }else{
      setSaved(false)
  }
},[auth.user.saved, post._id])
const handleSavePost = async () => {
  if(saveLoad) return;
  
  setSaveLoad(true)
  await dispatch(savePost({post, auth}))
  setSaveLoad(false)
}

const handleUnSavePost = async () => {
  if(saveLoad) return;

  setSaveLoad(true)
  await dispatch(unSavePost({post, auth}))
  setSaveLoad(false)
}


    return (
      <div className="card_footer">
        <div className="card_icon_menu">
          
            <div >
            
            <Likebtn islike={islike}
              handlelike={handlelike}
              handleunlike={handleunlike}
            />
              <Link to={`/post/${post._id}`} className="text-dark">
              <i className="far fa-comment"/>
              </Link>
              <img src='https://image.flaticon.com/icons/png/512/1933/1933005.png' height="18px" style={{margin:2}} alt="send"
                onClick={()=>setisshare(!isshare)}
              />
              </div>
         
              {
                    saved 
                    ?  <i className="fas fa-bookmark text-dark"
                    onClick={handleUnSavePost} />

                    :  <i className="far fa-bookmark"
                    onClick={handleSavePost} />
                }
              </div>
           
            <div className="d-flex justify-content-between">
            <h6 style={{padding:'0 25px', cursor:'pointer'}}>{post.likes.length} likes</h6>
            <h6 style={{padding:'0 25px', cursor:'pointer'}}>{post.comments.length} comments</h6>
        
          </div>
          {
            isshare && <Sharemodel url={`${BASE_URL}/post/${post._id}`} theme={theme}/>
          }
        </div>
      
    );
}


export default Cardfooter;