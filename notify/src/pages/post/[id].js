import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getposts } from "../../redux/actions/postActions";
import PostCard from '../../components/PostCard';



const Post= () => {
    const {id}= useParams();
    const[post,setpost]=useState([])
    const{auth,detailpost}= useSelector(state=>state)
    const dispatch= useDispatch()
    useEffect(()=>{
        dispatch(getposts({detailpost,id,auth}))
        if(detailpost.length>0)
        {
            const newarr=detailpost.filter(post=>post._id===id)
            setpost(newarr)
        }
    },[detailpost,dispatch,id,auth])
        return (
           <div className="posts">
               {
                   post.length===0 && 
                   <img className="d-block mx-auto my-4" src="https://thumbs.gfycat.com/SkinnySeveralAsianlion-max-1mb.gif" width="70px" height="70px"  alt="load"></img>
               }
               {
                   post.map(item=>(
                       
                       <PostCard key={item._id} post={item}/>
                   ))
               }
           </div>
        );
}


export default Post