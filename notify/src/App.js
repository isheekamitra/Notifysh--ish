import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router,Route } from 'react-router-dom'
import Alert from './components/alert/Alert';
import Header from './components/Header';
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/home';
import { useEffect } from 'react';
import {resfreshtoken} from './redux/actions/authAction'
import PageRender from './customRouter/PageRender';
import PrivateRouter from './customRouter/PrivateRouter';
import Statusmodel from './components/Statusmodel';
import { getpost } from './redux/actions/postActions';
import { getSuggestions } from './redux/actions/suggestionAction';
import io from 'socket.io-client';
import { GLOBALTYPES } from './redux/actions/globalTypes';
import SocketClient from './SocketClient'
import { getnotifies } from './redux/actions/notifyAction';
import CallModal from './components/message/CallModal';
import Peer from 'peerjs';

function App() {
  const {auth,status,modal,call} =useSelector(state=>state)
  const dispatch= useDispatch();
  useEffect(()=>{
   dispatch(resfreshtoken())
   const socket = io()
   dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
   return () => socket.close()
 },[dispatch])
  useEffect(()=>{
    if(auth.token) {
    dispatch(getpost(auth.token))
    dispatch(getSuggestions(auth.token))
    dispatch(getnotifies(auth.token))
    }
   },[dispatch,auth.token])


useEffect(()=>{
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
       
      }
    });
  }

},[])


useEffect(()=>{
  const newPeer= new Peer(undefined,{
    path:'/',secure:true
  })
 dispatch({type:GLOBALTYPES.PEER,payload:newPeer})
},[dispatch])
  


  return (
    <Router>
    <Alert/>
    <input type="checkbox" id="theme"></input>
  <div className={`App ${(status||modal)&&'mode'}`}>
    <div className="main">
 {auth.token && <Header/>}
 {status && <Statusmodel/>}
 {auth.token && <SocketClient/>}
 {call && <CallModal/>}
    <Route exact path="/" component={auth.token?Home:Login} ></Route>
    <Route exact path="/register" component={Register} ></Route>
    
    <PrivateRouter exact path="/:page" component={PageRender}></PrivateRouter>
      <PrivateRouter exact path="/:page/:id" component={PageRender}></PrivateRouter>
    
     
    </div>
    
     </div>
     
    </Router>
  
  );
}

export default App;
