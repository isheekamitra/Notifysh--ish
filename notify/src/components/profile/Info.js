import {useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import Editprofile from './Editprofile'
import Followbtn from '../Followbtn'
import Followers from './Followers'
import Following from './Following'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
const Info = ({id,auth,profile,dispatch}) => {
 
    const {theme} = useSelector(state=>state)
  
    const [userdata,setusedata] = useState([])
    const[oneedit,setonedit]=useState(false)
    const[showfollowers,setshowfollowers]=useState(false)
    const[showfollowing,setshowfollowing]=useState(false)
    useEffect(()=>{
        if(id===auth.user._id){
            setusedata([auth.user])
        }else{
            
          
            const newdta=profile.users.filter(user=>user._id === id)
            setusedata(newdta)
            
        
        }
    },[id, auth , dispatch ,profile.users])

    useEffect(()=>{
   if(showfollowers||showfollowing|| oneedit){
       dispatch({type:GLOBALTYPES.MODAL,payload:true})
   }
   else
   {
    dispatch({type:GLOBALTYPES.MODAL,payload:false})
   }

    },[showfollowing,showfollowers,oneedit,dispatch])
    return (
        <div className="info">
            {
                userdata.map(user=>(
                    
                    <div className="info_container" key={user._id}>
                   
                    
                    <img src={user.avatar} alt="avatar" className="avatar" 
           style={{  filter:theme?'invert(1)':'invert(0)', width:'150px',height:'150px'}}></img>
   <div className="info_content">
               <div className="info_content_title">
                   <h2>{user.username}</h2>
                   {
                       user._id===auth.user._id? <button className="btn btn-outline-info"
                   onClick={()=>setonedit(true)}
                   >Edit Profile</button>: <Followbtn user={user}/>
                   }
                  
               </div>
              
               <div className="follow_btn">
                   <span className="mr-4" onClick={()=>setshowfollowers(true)}> 
                       {user.followers.length} Followers
                   </span>
                   <span className="ml-4" onClick={()=>setshowfollowing(true)}>
                       {user.following.length} Followings
                   </span>
                   </div>
                   <h6>{user.fullname} <span className="text-danger">{user.mobile}</span></h6>
                   <p className="m-0">{user.address}</p>
                   <h6 className="m-0">{user.email}</h6>
                   <a href={user.website} target='_blank' rel="noreferrer">
                       {user.website}
                   </a>
                   <p>{user.story}</p>
                    </div>

                    {
                        oneedit && <Editprofile setonedit={setonedit}/>
                    }
                    {
                        showfollowers && <Followers users={user.followers} setshowfollowers={setshowfollowers}/>
                        
                    }
                    {
                        showfollowing&& <Following users={user.following} setshowfollowing={setshowfollowing}/>
                    }
                    </div>
                ))
            }
         

             

            </div>
    
    );
}


export default Info;