import {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {login} from '../redux/actions/authAction';
import {useDispatch, useSelector} from 'react-redux';
const Login = () => {
    const initial ={email:'',password:''}
    const [userdata,setuserdata]= useState(initial);
    const {email,password}=userdata
    const {auth}= useSelector(state=>state)
    const [typepass,setypepass]=useState(false);
    const dispatch=useDispatch();
    const history= useHistory();
    
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
       dispatch(login(userdata))
    }
    return( <div className="auth_page">
        <form onSubmit={handlesubmit}>
        <h3 className="text-uppercase text-center mb-4">Notifysh</h3>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1"
        aria-describedby="emailHelp" onChange={handlechangeinput}
        value={email}
        name="email"
    />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <div className="pass">
    <input type={typepass?"text":"password"} className="form-control" id="exampleInputPassword1"
         onChange={handlechangeinput}
         value={password}
         name="password"
    />
    <small onClick={()=>setypepass(!typepass)}>
      {typepass?'Hide':'Show'}
    </small>
    </div>
  
  </div>
 
  <button type="submit" className="btn btn-dark w-100"
  disabled={email&&password?false:true}
  >
  Login</button>
  <p className="my-2">
     You don't have an account? <Link to='/register'
     style={{color:"crimson"}}
     >Register Now!</Link>

  </p>
</form>
    </div>);
}


export default Login;