import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import Saved from '../../components/profile/Saved';
import { getprofileusers } from '../../redux/actions/profileActionss';
const Profile = () => {
  const {profile,auth} = useSelector(state=>state)
  const dispatch=useDispatch()
  const {id}= useParams()
  const [savetab,setsavetab]=useState(false)
  useEffect(()=>{

    if(profile.ids.every(item=>item!==id)){
    dispatch(getprofileusers({id,auth}))
    }
  },[id,auth,dispatch,profile.ids])
    return (
     <div className="profile">
    <Info auth={auth} profile={profile} dispatch={dispatch} id={id}/>
    {
      auth.user._id === id &&
      <div className="profile_tab">
      <button className={savetab?'':'active'} onClick={()=>setsavetab(false)}>Posts</button>
      <button className={savetab?'active':'' } onClick={()=>setsavetab(true)}>Saved</button>
      </div>
    }
    {
      profile.loading
      ? <img className="d-block mx-auto my-4" src="https://thumbs.gfycat.com/SkinnySeveralAsianlion-max-1mb.gif" width="70px" height="70px"  alt="load"></img>
      :  <>
       {
         savetab
         ?<Saved auth={auth} dispatch={dispatch}/>
         :<Posts  auth={auth} profile={profile} dispatch={dispatch} id={id}/>
       }
      </>
    }
  

    </div>
    )
}


 
export default Profile;