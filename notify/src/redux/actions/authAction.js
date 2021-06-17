import {GLOBALTYPES} from './globalTypes';
import { postdataapi } from "../../utils/fetchData"
import valid from '../../utils/valid';


export const login=(data)=>async(dispatch)=>{
  try{
     dispatch({type:GLOBALTYPES.ALERT,
     payload:{loading:true}})
     const res=await postdataapi('login',data);
     dispatch({type:GLOBALTYPES.AUTH,
     payload:{
       token:res.data.access_token,
       user:res.data.user
     }})
    //  console.log(res);
    localStorage.setItem('firstlogin',true);
    dispatch({type:GLOBALTYPES.ALERT,
    payload:{success:res.data.msg}})
  }catch(err){
    dispatch({type:GLOBALTYPES.ALERT,
    payload:{error:err.response.data.msg}})
  }
}
export const resfreshtoken=()=>async(dispatch)=>{
  const firstlogin=localStorage.getItem("firstlogin")
  if(firstlogin){
    dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})
    try{
    const res=await postdataapi('refresh_token');
    dispatch({type:GLOBALTYPES.AUTH,
    payload:{
      token:res.data.access_token,
      user:res.data.user
    }})
    dispatch({type:GLOBALTYPES.ALERT,payload:{}})
    }catch(err){
    dispatch({type:GLOBALTYPES.ALERT,
    payload:{error:err.response.data.msg}})
  }
  }
}
export const register=(data)=>async (dispatch)=>{
  const check= valid(data);
  if(check.errLength>0)
    return dispatch({type:GLOBALTYPES.ALERT,payload:check.errMsg})
  
  try{
    dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})
     const res=await postdataapi('register',data)
    //  console.log(res);
    dispatch({type:GLOBALTYPES.AUTH,
      payload:{
        token:res.data.access_token,
        user:res.data.user
      }})
       console.log(res);
     localStorage.setItem('firstlogin',true);
     dispatch({type:GLOBALTYPES.ALERT,
     payload:{success:res.data.msg}})
  
   
 
  }catch(err){
    dispatch({type:GLOBALTYPES.ALERT,

    payload:
    {error:err.response.data.msg
    }
  })
  }
}

export const logout = ()=>async (dispatch)=>{
  try{
      localStorage.removeItem('firstlogin');
      await postdataapi('logout')
      window.location.href='/'
  }catch(err){
    dispatch({type:GLOBALTYPES.ALERT,

    payload:
    {error:err.response.data.msg
    }
  })
  }
}