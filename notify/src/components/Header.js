import React from 'react';
import {Link, useLocation} from  'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/actions/authAction';
import {GLOBALTYPES} from '../redux/actions/globalTypes';
import Search from './Search';
import Notifymodel from './Notifymodel';

const Header = () => {
    
    const navlinks=[
        {label:'Home',icon:'home',path:'/'},
        {label:'Message',icon:'near_me',path:'/message'},
        {label:'Discover',icon:'explore',path:'/discover'}
    ]
   const {auth,theme,notify} = useSelector(state=>state)
   const dispatch = useDispatch();
   const {pathname} =useLocation();
    const isactive=(pn)=>{
        if(pn===pathname)
        return 'active'
    }
    return (
        <div className="header bg-light">
        <nav className="navbar navbar-expand-lg navbar-light bg-light 
        justify-content-between align-middle">
  <Link className="logo" to="/">
  <h1 className="navbar-brand text-uppercase p-0 m-0"
   onClick={()=>window.scrollTo({top:0})}
  >Notifysh</h1>
  </Link>
 
  <Search/>
  <div className="menu" >
    <ul className="navbar-nav flex-row">
    {
        navlinks.map((link,index)=>(
            <li className={`nav-item px-2 ${isactive(link.path)}`} key={index}>
            
        <Link className="nav-link" to={link.path}>
        <span className="material-icons">
{link.icon}
</span>

        </Link>
      </li>
        ))
    }
    <li className="nav-item dropdown" style={{opacity:1}}>
        <span className="nav-link position-relative" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
       
        <span className="material-icons" style={{color:notify.data.length>0?'crimson':''}}>favorite</span>
        <span className='notify_length'>{notify.data.length}</span>
        
        </span>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown"
        style={{transform:'translateX(75px)'}}
        >
          <Notifymodel/>
        </div>
        
      </li>
    
      <li className="nav-item dropdown" style={{opacity:1}}>
        <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src={auth.user.avatar} alt="avatar" className="avatar"
           style={{filter:theme?'invert(1)':'invert(0)'}}
          ></img>
        </span>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>Profile</Link>
          <label htmlFor="theme" className="dropdown-item"
          onClick={()=>dispatch({type:GLOBALTYPES.THEME,payload:!theme})}
          >
             
            {theme ?'Light mode':'Dark mode'}
          </label>
         
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" to="/"

          onClick={()=> dispatch(logout())}>
          Logout</Link>
        </div>
      </li>
     
    </ul>
   
  </div>

   
     </nav>
        </div>
    );
}



export default Header;