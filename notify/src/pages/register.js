import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";

const Register = () => {
    const {auth,alert}=useSelector(state=>state)
    const dispatch=useDispatch();
    const history= useHistory();
    const initial ={ fullname:'',username:'', email:'',password:'',cf_password:'',gender:'female'}
    const [userdata,setuserdata]= useState(initial);
    const { fullname,username, email,password,cf_password}=userdata
    const [typepass,setypepass]=useState(false);
    const [typecpass,setypecpass]=useState(false);
    

     useEffect(()=>{
         if(auth.token)
         history.push('/');
     },[auth.token,history])
  
     const handlechangeinput = e =>{
         const {name,value}=e.target
         setuserdata({...userdata,[name]:value})
     }
     const handlesubmit=(e)=>{
        e.preventDefault();
        dispatch(register(userdata));
        
     }
     return( <div className="auth_page">
         <form onSubmit={handlesubmit}>
         <h3 className="text-uppercase text-center mb-4">Notifysh</h3>
         <div className="form-group">
     <label htmlFor="fullname">Full Name</label>
     <input type="text" className="form-control" id="exampleInputEmail1"
        onChange={handlechangeinput}
         value={fullname}
         name="fullname"
         style={{background:`${alert.fullname ? '#fd2d6a14' : ''}`}}
     />
    <small  className="form-text text-danger">
   {alert.fullname?alert.fullname:''}</small>
   </div>
  
   <div className="form-group">
     <label htmlFor="fullname">Username</label>
     <input type="text" className="form-control" id="exampleInputEmail1"
        onChange={handlechangeinput}
         value={username.toLowerCase().replace(/ /g, '')}
         name="username"
         style={{background:`${alert.username ? '#fd2d6a14' : ''}`}}
     />
       <small  className="form-text text-danger">
   {alert.username?alert.username:''}</small>
   
   </div>

   <div className="form-group">
     <label htmlFor="exampleInputEmail1">Email address</label>
     <input type="email" className="form-control" id="exampleInputEmail1"
         aria-describedby="emailHelp" onChange={handlechangeinput}
         value={email}
         name="email"
         style={{background:`${alert.email ? '#fd2d6a14' : ''}`}}
     />
     <small id="emailHelp" className="form-text text-danger">
     {alert.email?alert.email:''}</small>
   </div>
   

   <div className="form-group">
     <label htmlFor="exampleInputPassword1">Password</label>
     <div className="pass">
     <input type={typepass?"text":"password"} className="form-control" id="exampleInputPassword1"
          onChange={handlechangeinput}
          value={password}
          name="password"
          style={{background:`${alert.password ? '#fd2d6a14' : ''}`}}
     />

     <small onClick={()=>setypepass(!typepass)}>
       {typepass?'Hide':'Show'}
     </small>

     </div>
     <small  className="form-text text-danger">
     {alert.password?alert.password:''}</small>
   
   </div>
  
   
   <div className="form-group">
     <label htmlFor="cf_password">Confirm Password</label>
     <div className="pass">
     <input type={typecpass?"text":"password"} className="form-control" id="cf_password"
          onChange={handlechangeinput}
          value={cf_password}
          name="cf_password"
          style={{background:`${alert.cf_password ? '#fd2d6a14' : ''}`}}

     />
     <small onClick={()=>setypecpass(!typecpass)}>
       {typecpass?'Hide':'Show'}
     </small>
     </div>
     <small id="emailHelp" className="form-text text-danger">
     {alert.password?alert.password:''}</small>
   </div>
  
<div className="row justify-content-between mx-0 mb-1">
<label htmlFor="male">
   Male:<input type="radio" id="male" name="gender"
    value="male" 
    defaultChecked
    onChange={handlechangeinput}/> 
</label>
<label htmlFor="female">
   Female:<input type="radio" id="female" name="gender"
    value="female" 
    onChange={handlechangeinput}/> 
</label>
<label htmlFor="other">
   Other:<input type="radio" id="other" name="gender"
    value="other"
    onChange={handlechangeinput}/> 
</label>
</div>

   <button type="submit" className="btn btn-dark w-100"
  //  disabled={email&&password?false:true}
   >
   Register</button>
   <p className="my-2">
      You already have an account? <Link to='/login'
      style={{color:"crimson"}}
      >Login Now!</Link>
 
   </p>
 </form>
     </div>);
}


export default Register;