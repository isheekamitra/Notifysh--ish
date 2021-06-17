import { useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {DISCOVER_TYPES, getdiscoverposts} from '../redux/actions/discoverActions'
import Photothumb from '../components/Photothumb'
import Loadmorebtn from '../components/Loadmorebtn';
import { getdataapi } from '../utils/fetchData';
const Discover = () => {
    const {auth,discover} = useSelector(state=>state)
    const dispatch =  useDispatch()
    const [load,setload]= useState(false)

    useEffect(()=>{
    if(!discover.firstload)
       dispatch(getdiscoverposts(auth.token))
    },[dispatch,auth.token,discover.firstload])

   const  handleloadmore=async()=>{
       setload(true)
       const res= await getdataapi(`post_discover?num=${discover.page*3}`,auth.token)
       dispatch({type:DISCOVER_TYPES.UPDATE_POSTS,payload:res.data})
       setload(false)
   }
    return (<div>
        {
            discover.loading
            ?<img className="d-block mx-auto my-4" style={{height:'60px', width:'60px'}} src="https://thumbs.gfycat.com/SkinnySeveralAsianlion-max-1mb.gif"  alt="load"></img>
            : <Photothumb posts={discover.posts} result={discover.result} />
        }
        {
            load && <img className="d-block mx-auto my-4" style={{height:'60px', width:'60px'}} src="https://thumbs.gfycat.com/SkinnySeveralAsianlion-max-1mb.gif"  alt="load"></img>
        }
         {
              !discover.loading && 
              <Loadmorebtn result={discover.result} page={discover.page}
                load={load} handleloadmore={ handleloadmore}
              />
         }
         
        
    </div>);
}



export default Discover;