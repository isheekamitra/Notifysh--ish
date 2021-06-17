import { useEffect, useState } from "react";
import { getdataapi } from "../../utils/fetchData";
import Loadmorebtn from "../Loadmorebtn";
import Photothumb from "../Photothumb";
import {GLOBALTYPES} from '../../redux/actions/globalTypes'

const Saved = ({auth,dispatch}) => {
    const [saveposts,setsaveposts]=useState([])
    const [result,setresult]=useState(9)
    const [page,setpage]= useState(2)
    const [load,setload]=useState(false)
    useEffect(()=>{
   setload(true)
   getdataapi('getSavePosts',auth.token)
   .then(res=>{setsaveposts(res.data.savePosts)
                 setresult(res.data.result)
                 setload(false)
   }
   )
   .catch(err=>{
       dispatch({type:GLOBALTYPES.ALERT,payload: {error:err.response.data.msg}})
   })
   return ()=>setsaveposts([])
    },[dispatch,auth.token])

    const  handleloadmore=async()=>{ 
     setload(true)
     const res = await getdataapi(`getSavePosts?limit=${page*9}`,auth.token)
     setsaveposts(res.data.savePosts)
     setresult(res.data.result)
     setpage(page+1)
     setload(false)
    }
    return (
        <div >
        
        <Photothumb posts={saveposts} result={result}/>
       {
            load && <img className="d-block mx-auto my-4" style={{height:'60px', width:'60px'}} src="https://thumbs.gfycat.com/SkinnySeveralAsianlion-max-1mb.gif"  alt="load"></img>
        }
    
              <Loadmorebtn result={result} page={page}
                load={load} handleloadmore={ handleloadmore}
              />
          
         
        </div>
    )

}


export default Saved;