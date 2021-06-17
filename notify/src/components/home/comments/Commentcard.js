import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import Likebtn from '../../Likebtn'
import Commentmenu from './Commentmenu';
import { likecomment, unlikecomment, updatecomment } from '../../../redux/actions/commentAction';
import Inputcomment from '../Inputcomment'
const Commentcard = ({children,comment,post,commentId}) => {
    const[content,setcontent]=useState('')
    const [readmore,setreadmore]=useState(false)
    const [islike,setislike]= useState(false)
    const [loadlike,setloadlike]=useState(false)
    const [onedit,setonedit]=useState(false)
    const [onreply,setonreply]=useState(false)
    
    const {auth}= useSelector(state=>state)
    const dispatch=useDispatch()
    useEffect(()=>{
        setcontent(comment.content)
        setislike(false)
        setonreply(false)
        if(comment.likes.find(like=>like._id===auth.user._id)){
            setislike(true)
        }

    },[comment,auth.user._id])
    const handleupdate=()=>{
        if(comment.content!==content){
            dispatch(updatecomment({comment,post,content,auth}))
            setonedit(false)

        }else{
            setonedit(false)
        }
    }
  

    const handlelike=async()=>{
        if(loadlike)
        return;
        setislike(true)
        setloadlike(true)
        await dispatch(likecomment({comment,post,auth}))
        setloadlike(false);
    }
    const handleunlike=async()=>{
        if(loadlike)
        return;
        setislike(false)
        setloadlike(true)
        await dispatch(unlikecomment({comment,post,auth}))
        setloadlike(false)
    }
    const {theme} = useSelector(state=>state)
     const handlereply=()=>{
      if(onreply)
      return setonreply(false)
      setonreply({...comment,commentId})
     }
    const stylecard={
        opacity: comment._id? 1 :0.5,
        pointerEvents:comment._id? 'inherit':'none'
    }
    return (
        <div className="comment_card mt-2" style={stylecard}>
            <Link className="d-flex text-dark " to={`/profile/${comment.user._id}`}>
            <img src={comment.user.avatar} height="25px" width="25px" style={{borderRadius:50, objectFit:'cover' ,margin:5,filter:theme?'invert(1)':'invert(0)'}} alt="img" />
            <h6 className='mx-1'>{comment.user.username}</h6>
            </Link>
            <div className="comment_content">
                <div className="flex-fill"
                    style={{filter: theme ? 'invert(1)' : 'invert(0)',
                           color:theme?'white':'#111'
                    }} 
                >
                {
                    onedit
                    ? <textarea rows="5" value={content} 
                    onChange={e=>setcontent(e.target.value)} />
                    :  <div>
                    {
                        comment.tag && comment.tag._id!==comment.user._id
                        && <Link to={`/profile/${comment.tag._id}`} className="mr-1">
                            @{comment.tag.username} 
                        </Link>
                    }
                     <span>
                        {
                            content.length<100? content:
                            readmore? content+ ' ' : content.slice(0,100)+ '....'
                        }
                    </span>
                    {
                        content.length>=100 &&
                        <span className="readmore" onClick={()=>setreadmore(!readmore)}>
                            {readmore? 'Hide Content' : 'Read More'}
                        </span>
                    }
                </div>
                }
               


                <div style={{cursor:'pointer'}} >
                    <small className="text-muted mr-3">
                        {moment(comment.createdAt).fromNow()}
                    </small>
                    <small className=" font-weight-bold mr-3">
                        {comment.likes.length} likes
                    </small>
                    {
                        onedit
                        ?  <>
                        <small className=" font-weight-bold mr-3" onClick={handleupdate}>
                        Update
                       </small>
                       <small className=" font-weight-bold mr-3" onClick={()=>setonedit(false)}>
                        Cancel
                      </small>
                           </>
                        :   <small className=" font-weight-bold mr-3"
                           onClick={handlereply}
                        >
                            {onreply? 'cancel':'reply'}
                           </small>
                    }
               
                  
                  
                </div>
                    
                </div>
         
            <div className="d-flex align-items-center mx-2" style={{cursor:'pointer'}}>

                <Commentmenu post={post} comment={comment} setonedit={setonedit}/>
                <Likebtn 
                islike={islike} handlelike={handlelike} handleunlike={handleunlike}/>
            </div>
            </div>
           {
               onreply && 
               <Inputcomment post={post} onreply={onreply} setonreply={setonreply}>
                    <Link to={`/profile/${onreply.user._id}`} className='mr-1'>
                        @{onreply.user.username} :
                    </Link>
               </Inputcomment>
           }
           {children}
        </div>
    )
} 


export default Commentcard;