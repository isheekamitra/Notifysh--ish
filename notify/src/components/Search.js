import {useDispatch, useSelector} from 'react-redux';
import {  useState } from "react";
import { getdataapi } from '../utils/fetchData';
import {GLOBALTYPES} from '../redux/actions/globalTypes';

import Usercard from './Usercard';
const Search = () => {
    const [search,setsearch]=useState('')
    const [users,setusers] = useState([]);
    const {auth}= useSelector(state=>state)
    const dispatch = useDispatch();
   const [load,setload] = useState(false);
    const handlesearch=async(e)=>{
       e.preventDefault();
       if(!search)
       return;
       try{
           setload(true);
        const res=await  getdataapi(`search?username=${search}`,auth.token)
        setusers(res.data.users)
        setload(false)
       }catch(err){
      dispatch({type:GLOBALTYPES.ALERT,payload:{error:err.response.data.msg}})
            }
            }
    const handleclose= ()=>{
        setsearch('')
        setusers([])
    }
    return (
        <form className="search_form" onSubmit={handlesearch}>
             <input type="text" name="search" value={search} id="search" title="Enter to Search" 
             onChange={e=>setsearch(e.target.value.toLowerCase().replace(/ /g, ''))}/>

             <div className="search_icon" style={{opacity:search? 0 :0.3}}>
                 <span className="material-icons">search</span>
                 <span>Enter to Search</span>
                
             </div>
             
            <div className="close_search" onClick={handleclose}
            style={{opacity: users.length === 0 ? 0 : 1}} >
                &times;
            </div>
             <button type="submit" style={{display:'none'}}>Search</button> 

               {load && <img className="loading" src="https://thumbs.gfycat.com/SkinnySeveralAsianlion-max-1mb.gif"  alt="load"></img>}
           
             <div className="users">
                 {
                     search && users.map(user=>(
                        
                    <Usercard 
                    key={user._id} 
                    user={user} 
                    border="border"
                    handleclose={handleclose}
                     />
                     ))
                 }
             </div>
        </form>
    );
}


export default Search;
