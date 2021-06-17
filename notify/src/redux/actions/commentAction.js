import { deletedataapi, patchdataapi, postdataapi } from "../../utils/fetchData"
import { deletedata, Editdata, GLOBALTYPES } from "./globalTypes"
import { createNotify, removeNotify } from "./notifyAction"
import { POST_TYPES } from "./postActions"

export const createcomment=({post,newcomment,auth,socket})=>async(dispatch)=>{

const newpost={...post,comments:[...post.comments,newcomment]}
 dispatch({type:POST_TYPES.UPDATE_POST,payload:newpost})
 try{
 const data={...newcomment,postId:post._id,postUserId:post.user._id}
 const res=await postdataapi('comment',data,auth.token)
 const newdata = {...res.data.newcomment,user:auth.user}
 const newpost={...post,comments:[...post.comments,newdata]}
 dispatch({type:POST_TYPES.UPDATE_POST,payload:newpost})
 
    // Socket
 socket.emit('createComment', newpost)

 //Notify
 const msg={
    id:res.data.newcomment._id,
    text:newcomment.reply?'mentioned you in a comment.':'has commented on your post.',
    recipients:newcomment.reply?[newcomment.tag._id]:[post.user._id],
    url:`/post/${post._id}`,
    content:post.content,
    image:post.images[0].url

  }
  dispatch(createNotify({msg,auth,socket}))
 
 }catch(err){
     dispatch({type:GLOBALTYPES.ALERT,payload:{error:err.response.data.msg}})
 }
}

export const updatecomment=({comment,post,content,auth})=>async(dispatch)=>{
 const newcomment=Editdata(post.comments,comment._id,{...comment,content})
 const newpost={...post,comments:newcomment}
 
 dispatch({type:POST_TYPES.UPDATE_POST,payload:newpost})

 try{
    patchdataapi(`comment/${comment._id}`,{content},auth.token)
 }catch(err){
     dispatch({type:GLOBALTYPES.ALERT,payload:{error:err.response.data.msg}})
 }

}

export const likecomment=({comment,post,auth})=>async(dispatch)=>{
  const newcomment={...comment,likes:[...comment.likes,auth.user]}
  const newcomments=Editdata(post.comments,comment._id,newcomment)
  const newpost={...post,comments:newcomments}
  
  dispatch({type:POST_TYPES.UPDATE_POST,payload:newpost})
  try{
   await patchdataapi(`comment/${comment._id}/like`,null,auth.token)
  }catch(err){
     dispatch({type:GLOBALTYPES.ALERT,payload:{error:err.response.data.msg}})
 }
}


export const unlikecomment=({comment,post,auth})=>async(dispatch)=>{
    const newcomment={...comment,likes: deletedata(comment.likes,auth.user._id) }
    const newcomments=Editdata(post.comments,comment._id,newcomment)
    const newpost={...post,comments:newcomments}
    
    dispatch({type:POST_TYPES.UPDATE_POST,payload:newpost})
    try{
  
        await patchdataapi(`comment/${comment._id}/unlike`,null,auth.token)
  
    }catch(err){
       dispatch({type:GLOBALTYPES.ALERT,payload:{error:err.response.data.msg}})
   }
  }

export const deletecomment=({post,auth,comment,socket})=>async(dispatch)=>{

    const deletearr=[...post.comments.filter(cm=>cm.reply===comment._id),comment]
    const newpost={
        ...post,
        comments:post.comments.filter(cm=>!deletearr.find(da=>cm._id===da._id))

    }
    
    dispatch({type:POST_TYPES.UPDATE_POST,payload:newpost})
    socket.emit('deleteComment', newpost)
    try{
        deletearr.forEach(item=>{
            deletedataapi(`comment/${item._id}`,auth.token)
            
      //Notify
      const msg={
        id:item._id,
        text:comment.reply?'mentioned you in a comment.':'has commented on your post.',
        recipients:comment.reply?[comment.tag._id]:[post.user._id],
        url:`/post/${post._id}`,
        
      }
        dispatch(removeNotify({msg,auth,socket}))
        })
    }catch(err){
        dispatch({type:GLOBALTYPES.ALERT,payload:{error:err.response.data.msg}})
    }
}