import {useDispatch, useSelector} from 'react-redux'
import Loadmorebtn from '../Loadmorebtn';
import PostCard from '../PostCard';
import { getdataapi } from '../../utils/fetchData';
import { useState } from 'react';
import { POST_TYPES } from '../../redux/actions/postActions';


const Posts = () => {
    const {homepost,auth,theme}= useSelector(state=>state)
    const dispatch= useDispatch()
    const [load,setload]=useState(false)
    const  handleloadmore=async()=>{
        setload(true)
        const res = await getdataapi(`posts?limit=${homepost.page*9}`,auth.token)
       dispatch({type:POST_TYPES.GET_POSTS,
        payload:{...res.data,page:homepost.page+1}
    })
        setload(false)
       }
    return (
        <div className="posts">
        
           {
               homepost.posts.map(post=>(
                     <PostCard key={post._id} post={post} theme={theme}/>
            
            
               ))
           }
           {
            load && <img className="d-block mx-auto my-4" style={{height:'60px', width:'60px'}} src="https://thumbs.gfycat.com/SkinnySeveralAsianlion-max-1mb.gif"  alt="load"></img>
        }
    
              <Loadmorebtn result={homepost.result} page={homepost.page}
                load={load} handleloadmore={ handleloadmore}
              />
        </div>
        
    );
}


export default Posts;