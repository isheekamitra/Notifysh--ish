import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createcomment } from "../../redux/actions/commentAction";
import Icons from '../Icons';
const Inputcomment = ({children,post,onreply,setonreply}) => {
    const[content,setcontent]= useState('')
    const {auth,socket,theme} = useSelector(state=>state)
    const dispatch= useDispatch()
    const handlesubmit=(e)=>{
     e.preventDefault()
      if(!content.trim())  //The trim() method removes whitespace from both ends of a string.
    {
        if(setonreply)
        return setonreply(false)
        return
    }
      setcontent('')
      const newcomment={
          content,
          likes:[],
          user:auth.user,
          createdAt: new Date().toISOString(),  //The toISOString() method returns a string in simplified extended ISO format (ISO 8601), which is always 24 or 27 characters long (YYYY-MM-DDTHH:mm:ss.sssZ
          reply: onreply && onreply.commentId,
          tag: onreply && onreply.user
      }
      dispatch(createcomment({post,newcomment,auth,socket}))
      if(setonreply)
      return setonreply(false)
    }
    return (
        <form className="card-footer comment_input" onSubmit={handlesubmit}>
          {children}
          <input type="text" placeholder="Add your comments..."
          value={content} onChange={e=>setcontent(e.target.value)} 
          style={{filter: theme ? 'invert(1)' : 'invert(0)',
                           color:theme?'white':'#111',
                           background: !theme?'white':'#111'
                    }} 
          ></input>
          <Icons setContent={setcontent} content={content} theme={theme}/>
          <button type="submit" className="postbtn">
              Post
          </button>
        </form>
    );
}



export default Inputcomment;
