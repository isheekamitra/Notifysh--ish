import { deletedataapi, getdataapi, patchdataapi, postdataapi } from "../../utils/fetchData"
import { imageupload } from "../../utils/imageupload"
import { createNotify, removeNotify } from "./notifyAction"
import { GLOBALTYPES } from "./globalTypes"

export const POST_TYPES={
    CREATE_POST:'CREATE_POST',
    LOADING_POST:'LOADING_POST',
    GET_POSTS:'GET_POSTS',
    UPDATE_POST:'UPDATE_POST',
    GET_POST:'GET_POST',
    DELETE_POST:'DELETE_POST'
}
export const createpost=({content,image,auth,socket})=>async(dispatch)=>{
    let media=[]
    try{
      dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})
      if(image.length>0)
      media=await imageupload(image)
      const res=await postdataapi('posts',{content,images:media},auth.token)
    dispatch({type:POST_TYPES.CREATE_POST,
      payload:{...res.data.newpost,user:auth.user}
    })
      dispatch({type:GLOBALTYPES.ALERT,payload:{loading:false}})
        //Notify
    const msg={
      id:res.data.newpost._id,
      text:'added a new post.',
      recipients:res.data.newpost.user.followers,
      url:`/post/${res.data.newpost._id}`,
      content,
      image:media[0].url
 }
 dispatch(createNotify({msg, auth, socket}))
    }catch(err){
    dispatch({type:GLOBALTYPES.ALERT,payload: {error:err.response.data.msg}}

   )}
}
export const getpost=(token)=>async(dispatch)=>{
 try{
  dispatch({type:POST_TYPES.LOADING_POST,payload:true})
  const res= await getdataapi('posts',token)


  dispatch({
    type:POST_TYPES.GET_POSTS,
    payload:{...res.data,page:2}
  })
  dispatch({type:POST_TYPES.LOADING_POST,payload:false})
  }catch(err){
  dispatch({type:GLOBALTYPES.ALERT,

  payload:
  {error:err.response.data.msg
  }
})
}
}
export const updatepost=({content,image,auth,status})=>async(dispatch)=>{
  let media=[]
  const imgnewurl = image.filter(img=>!img.url)
  const imgoldurl = image.filter(img=>img.url)
 
  if(status.content===content && imgnewurl.length===0 && imgoldurl.length===status.images.length)
  return;
  try{
    dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})
    if(imgnewurl.length>0)
    media=await imageupload(imgnewurl)
     const res= await patchdataapi(`post/${status._id}`,{
       content,images:[...imgoldurl,...media]

     },auth.token)
  
 // console.log(res);
    dispatch({
      type:POST_TYPES.UPDATE_POST,
      payload:res.data.newpost
    })
     dispatch({type:GLOBALTYPES.ALERT,payload:{success:res.data.msg}})
  
   }catch(err){
   dispatch({type:GLOBALTYPES.ALERT,
 
   payload:
   {error:err.response.data.msg
   }
 })
 }
 }
 export const likepost=({post,auth,socket})=>async(dispatch)=>{
  
  const newpost={...post,likes:[...post.likes,auth.user]}
  dispatch({type:POST_TYPES.UPDATE_POST,payload:newpost})
  socket.emit('likePost',newpost)
  try{
   await patchdataapi(`post/${post._id}/like`,null,auth.token)
    //Notify
    const msg={
      id:auth.user._id,
      text:'Liked your post.',
      recipients:[post.user._id],
      url:`/post/${post._id}`,
      content:post.content,
      image:post.images[0].url

    }
    dispatch(createNotify({msg,auth,socket}))

  }
   catch(err){
   dispatch({type:GLOBALTYPES.ALERT,
 
   payload:
   {error:err.response.data.msg
   }
 })
 }
 }
 export const unlikepost=({post,auth,socket})=>async(dispatch)=>{
   console.log({post})
  const newpost={...post,likes: post.likes.filter(like=>like._id !==auth.user._id)}
  console.log({newpost});
  dispatch({type:POST_TYPES.UPDATE_POST,payload:newpost})
  socket.emit('unLikePost',newpost)
  try{
   
   await patchdataapi(`post/${post._id}/unlike`,null,auth.token)
   //Notify
   
   const msg={
    id:auth.user._id,
    text:'Disliked your post.',
    recipients:[post.user._id],
    url:`/post/${post._id}`,
    

  }
    dispatch(removeNotify({msg,auth,socket}))

  }
   catch(err){
   dispatch({type:GLOBALTYPES.ALERT,
 
   payload:
   {error:err.response.data.msg
   }
 })
 }
 }
 export const getposts=({detailpost,id,auth})=>async(dispatch)=>{
   if(detailpost.every(post=>post._id!==id)){
     try{
const res=await getdataapi(`post/${id}`,auth.token)
   dispatch({type:POST_TYPES.GET_POST,payload:res.data.post})
     }
     catch(err){

   dispatch({type:GLOBALTYPES.ALERT,
   payload: {error:err.response.data.msg }})

   }

  }
 }
 export const deletepost=({post,auth,socket})=>async(dispatch)=>{
   dispatch({type:POST_TYPES.DELETE_POST,payload:post})
   try{
   const res=await deletedataapi(`post/${post._id}`,auth.token)

      //Notify
      const msg={
        id:post._id,
        text:'deleted a post.',
        recipients:res.data.newpost.user.followers,
        url:`/post/${post._id}`,
        
      }
        dispatch(removeNotify({msg,auth,socket}))
   
   
   } catch(err){

   dispatch({type:GLOBALTYPES.ALERT,
   payload: {error:err.response.data.msg }})

   }

 }

 export const savePost = ({post, auth}) => async (dispatch) => {
  const newUser = {...auth.user, saved: [...auth.user.saved, post._id]}
  dispatch({ type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})
  try {
    await patchdataapi(`savePost/${post._id}`, null, auth.token)
} catch (err) {
    dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {error: err.response.data.msg}
    })
}
 }
 export const unSavePost = ({post, auth}) => async (dispatch) => {
  const newUser = {...auth.user, saved: auth.user.saved.filter(id => id !== post._id) }
  dispatch({ type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})

  try {
      await patchdataapi(`unSavePost/${post._id}`, null, auth.token)
  } catch (err) {
      dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {error: err.response.data.msg}
      })
  }
}