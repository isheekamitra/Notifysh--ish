import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkimage } from "../../utils/imageupload";
import {GLOBALTYPES} from '../../redux/actions/globalTypes'
import { upateprofileuser } from "../../redux/actions/profileActionss";
const Editprofile = ({setonedit}) => {
    const initialstate= {
        fullname:'',mobile:'',address:'',website:'',story:'',
        gender:''
    }
    const [userdata,setusrdata]=useState(initialstate);
    const {fullname,mobile,address,website,story,gender}=userdata
    const [avatar,setavatar] = useState('')
    const {auth,theme} = useSelector(state=>state)
    const dispatch = useDispatch()

useEffect(()=>{
    setusrdata(auth.user)
},[auth.user])
    const changeavatar=(e)=>{
      const file = e.target.files[0]
      const err= checkimage(file)
      
if(err)
return dispatch({type:GLOBALTYPES.ALERT,payload:{error:err}})
      setavatar(file)
    }
    const handleinput=e=>{
        const {name,value}=e.target
        setusrdata({...userdata,[name]:value})
    }

    const handlesumbit=(e)=>{
      e.preventDefault();
      dispatch(upateprofileuser({userdata,avatar,auth}))
    }
    return (
     <div className="edit_profile">
         <button className='btn btn-danger btn_close'
         onClick={()=>setonedit(false)}
         >
             Close
         </button>
         
     <form onSubmit={handlesumbit}>
         <div className="info_avatar">
             <img src={avatar ? URL.createObjectURL(avatar):auth.user.avatar}
             alt="avatar" 
             style={{filter:theme?'invert(1)':'invert(0)'}}
             ></img>
             <span>
                 <i className="fas fa-camera"></i>
                 <p>Change</p>
                 <input type="file" name="file" id="file_up" accept="image/*"
                 onChange={changeavatar}></input>
             </span>
         </div>
         <div className="form-group">
             <label htmlFor="fullname">Full Name</label>
             <div className="position-relative">
                 <input type="text" className="form-control" id="fullname"
                 name="fullname" value={fullname} onChange={handleinput}
                 />
                 <small className="text-danger position-absolute"
                 style={{top:'50%',right:'5px',transform:'translateY(-50%)'}}
                 >
                     {fullname.length}/25
                 </small>
             </div>
         </div>
         <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input type="text" name="mobile" value={mobile} className="form-control"
                onChange={handleinput}
            />
         </div>
         <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" name="address" value={address} className="form-control"
                onChange={handleinput}
            />
         </div>
         <div className="form-group">
            <label htmlFor="website">Website</label>
            <input type="text" name="website" value={website} className="form-control"
                onChange={handleinput}
            />
         </div>
         <div className="form-group">
            <label htmlFor="story">Story</label>
            <textarea cols="30" rows="4" name="story" value={story} className="form-control"
                onChange={handleinput}
            />
              <small className="text-danger d-block text-right"
                //  style={{top:'50%',right:'5px',transform:'translateY(-50%)'}}
                 >
                     {story.length}/250
                 </small>
         </div>
         <div className="input-group-prepend px-0 mb-4">
         <select name="gender" id="gender"
         value={gender}
          className="custom-select text-capitalize"
          onChange={handleinput}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
           
         </select>
            </div>
            <button className="btn btn-info w-100" type="submit">Save</button>
         </form>
     </div>

    );
}



export default Editprofile;