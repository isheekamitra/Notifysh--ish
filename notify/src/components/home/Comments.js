import { useEffect, useState } from "react";
import Commentdisplay from "./comments/Commentdisplay";

const Comments = ({post}) => {
    const[comments,setcomments]= useState([])
    const[showcomments,setshowcomments]= useState([])
    const [next,setnext]=useState(2)
    const [replycomment,setreplycomment]= useState([])
    useEffect(()=>{
      const newcom=post.comments.filter(cm=>!cm.reply)
      setcomments(newcom)
      setshowcomments(newcom.slice(newcom.length-next))
    },[post.comments,next])

    useEffect(()=>{
       const newrep=post.comments.filter(cm=>cm.reply)
       setreplycomment(newrep)
    },[post.comments])
    return  (
        <div className="comments">
            {
            showcomments.map((comment,index)=>(
                    <Commentdisplay key={index} comment={comment} post={post} 
                    replycm={replycomment.filter(item=>item.reply===comment._id)}
                     />
                ))
            }
            {
                comments.length-next>0
                ?<div className="p-2 border-top" style={{cursor:'pointer',color:'crimson'}} 
                onClick={()=>setnext(next+10)}>
                See more comments...
                </div>
                :
                comments.length>2 && 
                <div className="p-2 border-top" style={{cursor:'pointer',color:'crimson'}}
                  onClick={()=>setnext(2)}
                >
                Hide comments...
                </div>
            }
        </div>
    );
}


export default Comments;