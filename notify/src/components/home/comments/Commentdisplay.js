import { useEffect, useState } from "react";
import Commentcard from "./Commentcard";

const Commentdisplay = ({comment,post,replycm}) => {
  const [showrep,setshowrep]=useState([])
  const [next,setnext]=useState(1)
  useEffect(()=>{
      setshowrep(replycm.slice(replycm.length-next))
  },[replycm,next])
    return (
        <div className="comment_display">
  <Commentcard comment={comment} post={post} commentId={comment._id}>
  <div className="pl-4">
{
    showrep.map((item,index)=>(
        item.reply && <Commentcard
        key={index}
        comment={item}
        post={post}
        commentId={comment._id}
        />
    ))
}
{
                replycm.length-next>0
                ?<div style={{cursor:'pointer',color:'crimson'}} 
                onClick={()=>setnext(next+10)}>
                See more comments...
                </div>
                :
                replycm.length>1 && 
                <div style={{cursor:'pointer',color:'crimson'}}
                  onClick={()=>setnext(1)}
                >
                Hide comments...
                </div>
            }
</div>
</Commentcard>
        </div>
        
    );
}


export default Commentdisplay;