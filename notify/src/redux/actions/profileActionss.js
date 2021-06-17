  import {deletedata, GLOBALTYPES}  from './globalTypes'
import {getdataapi, patchdataapi} from '../../utils/fetchData'
import { imageupload } from '../../utils/imageupload'
import { createNotify, removeNotify } from '../actions/notifyAction'
export const PROFILE_TYPES={
    LOADING:'LOADING_PROFILE',
    GET_USER:'GET_PROFILE_USER',
    FOLLOW:'FOLLOW',
    UNFOLLOW:'UNFOLLOW',
    GET_ID:'GET_PROFILE_ID' ,
    GET_POSTS:'GET_PROFILE_POSTS',
    UPDATE_POST:'UPDATE_PROFILE_POST'
}
export const getprofileusers= ({id,auth})=> async(dispatch)=>{
  dispatch({type:PROFILE_TYPES.GET_ID,payload:id})
    try{
  
         dispatch({type:PROFILE_TYPES.LOADING,payload:true})
      
    const res= getdataapi(`/user/${id}`,auth.token)
    const res1= getdataapi(`/user_posts/${id}`,auth.token)
    const users= await res;
    const posts= await res1;
      dispatch({type:PROFILE_TYPES.GET_USER,
        payload:users.data})
      
      dispatch({type:PROFILE_TYPES.GET_POSTS,
        payload:{...posts.data, _id:id ,page:2}
      })
      
      
  
      dispatch({type:PROFILE_TYPES.LOADING,payload:false})
      
    }catch(err){
        dispatch({type:GLOBALTYPES.ALERT,
            payload:{error:err.response.data.msg}})
    }
 
}

export const upateprofileuser = ({userdata,avatar,auth})=> async (dispatch)=>{
  if(!userdata.fullname)
  return dispatch({type:GLOBALTYPES.ALERT,payload:{error:"Please add your full name"}})
  
  if(userdata.fullname.length>25)
  return dispatch ({type:GLOBALTYPES.ALERT,payload:{error:"Your full name is too long"}})

  if(userdata.story.length>200)
  return dispatch ({type:GLOBALTYPES.ALERT,payload:{error:"Your story is too long"}})
    try{
    let media;
    dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})


    if(avatar)
    media= await imageupload([avatar])
    const res= await patchdataapi('/user',{
      
      ...userdata,
      avatar:avatar? media[0].url: auth.user.avatar
    },auth.token)
    
     dispatch({
       type:GLOBALTYPES.AUTH,
       payload:{
         ...auth,
         user:{
           ...auth.user,
           ...userdata,
           avatar:avatar? media[0].url: auth.user.avatar
          
         }
       }
     })
    dispatch({type:GLOBALTYPES.ALERT,payload:{success:res.data.msg}}) 


    }catch(err){
        dispatch({type:GLOBALTYPES.ALERT,
            payload:{error:err.response.data.msg}})
    }
}

export const follow=({users,user,auth,socket})=>async(dispatch)=>{

   let newuser;
   if(users.every(item=>item._id!==user._id)){
     newuser ={...user,followers:[...user.followers,auth.user]}
   }else{
     users.forEach(item=>{
       if(item._id===user._id){
         newuser={...item,followers:[...item.followers,auth.user]}
       }

     })
   }
  
   dispatch({
     type:PROFILE_TYPES.FOLLOW,
     payload:newuser
   })

   dispatch({
    type:GLOBALTYPES.AUTH,
    payload:{
      ...auth,
      user:{...auth.user,following:[...auth.user.following,newuser]}
    }
  })

  
  try{
  const res=  await patchdataapi(`user/${user._id}/follow`,null,auth.token)
  socket.emit('follow',res.data.newuser)
  
        // Notify
        const msg = {
          id: auth.user._id,
          text: 'has started following you.',
          recipients: [newuser._id],
          url: `/profile/${auth.user._id}`,
      }

      dispatch(createNotify({msg, auth, socket}))

  }catch(err){
    dispatch({type:GLOBALTYPES.ALERT,
        payload:{error:err.response.data.msg}})
}
 
}

export const unfollow=({users,user,auth,socket})=>async(dispatch)=>{

  //   let newuser={...user,
  //     followers:deletedata(user.followers,auth.user._id)
     
  //  }

   let newuser;
   if(users.every(item=>item._id!==user._id)){
     newuser ={...user,followers:deletedata(user.followers,auth.user._id)
     }
   }else{
     users.forEach(item=>{
       if(item._id===user._id){
         newuser={...item,followers:deletedata(item.followers,auth.user._id)
         }
       }

     })
   }


    dispatch({type:PROFILE_TYPES.UNFOLLOW,payload:newuser})

    dispatch({
     type:GLOBALTYPES.AUTH,
     payload:{
       ...auth,
       user:{...auth.user,
        following:deletedata(auth.user.following,newuser._id)}
     }
   })
   
 
   try{
   const res= await patchdataapi(`user/${user._id}/unfollow`,null,auth.token)
   socket.emit('unFollow',res.data.newuser)
         // Notify
         const msg = {
          id: auth.user._id,
          text: 'has started to follow you.',
          recipients: [newuser._id],
          url: `/profile/${auth.user._id}`,
      }

      dispatch(removeNotify({msg, auth, socket}))
  }catch(err){
    dispatch({type:GLOBALTYPES.ALERT,
        payload:{error:err.response.data.msg}})
}
  
 }

