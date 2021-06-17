import { useEffect, useState } from "react";
import { getdataapi } from "../../utils/fetchData";
import Loadmorebtn from "../Loadmorebtn";
import Photothumb from "../Photothumb";
import {PROFILE_TYPES} from '../../redux/actions/profileActionss'

const Posts = ({auth,id,dispatch,profile}) => {
    const [posts,setposts]=useState([])
    const [result,setresult]=useState(9)
    const [page,setpage]= useState(0)
    const [load,setload]=useState(false)
    useEffect(()=>{
     profile.posts.forEach(data=>{
         if(data._id===id)
     {  setposts(data.posts)
        setresult(data.result)
        setpage(data.page)
     }
    })
    },[profile.posts,id])

    const  handleloadmore=async()=>{
     setload(true)
     const res = await getdataapi(`user_posts/${id}?limit=${page*9}`,auth.token)
     const newdata={...res.data,page:page+1,_id:id}
     dispatch({type:PROFILE_TYPES.UPDATE_POST,payload:newdata})
     setload(false)
    }
    return (
        <div >
        
       <Photothumb posts={posts} result={result}/>
       {
            load && <img className="d-block mx-auto my-4" style={{height:'60px', width:'60px'}} src="https://thumbs.gfycat.com/SkinnySeveralAsianlion-max-1mb.gif"  alt="load"></img>
        }
    
              <Loadmorebtn result={result} page={page}
                load={load} handleloadmore={ handleloadmore}
              />
         
         
        </div>
    )

}


export default Posts;