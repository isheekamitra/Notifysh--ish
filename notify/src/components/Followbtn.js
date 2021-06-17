import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../redux/actions/profileActionss";

const Followbtn = ({user}) => {
    const [followed,setfollowed] = useState(false)
    const {auth,profile,socket} = useSelector(state=>state)
    const dispatch = useDispatch()

    const[load,setload]=useState(false)

    useEffect(()=>{
        if(auth.user.following.find(item=>item._id===user._id)){
            setfollowed(true)
    }
    return()=>setfollowed(false)
    },[auth.user.following,user._id])
    const handlefollow = async()=>{
        if(load)
        return;
        setfollowed(true)
        setload(true)
        await dispatch(follow({users:profile.users,user,auth,socket}))
        setload(false)
    }
    const handleunfollow = async()=>{
        if(load)
        return;
        setfollowed(false)
        setload(true)
        await dispatch(unfollow({users:profile.users,user,auth,socket}))
        setload(false)
    }
    return (
        <>
        {
            followed 
            ?<button className="btn btn-outline-danger "
            onClick={handleunfollow}>Unfollow</button>
            : <button className="btn btn-outline-info "
            onClick={handlefollow}>Follow</button>
        }
        </>
    );
}


export default Followbtn;