import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getSuggestions} from '../../redux/actions/suggestionAction';
import Followbtn from '../Followbtn'

import Usercard from '../Usercard'
const Rightsidebar = () => {
    const {auth,suggestions} = useSelector(state=>state)
    const dispatch= useDispatch()
 
    return (
        <div className="mt-3">
            <Usercard user={auth.user}/>
        
            <div className="d-flex justify-content-between align-items-center my-2">
                <h5 className="text-danger">Suggestions for You!</h5>
              { !suggestions.loading &&
                   <i className="fas fa-redo" style={{cursor:'pointer'}} onClick={() => dispatch(getSuggestions(auth.token)) }></i>
              }
            </div>
            
            
            {
                suggestions.loading
                ?<img className="d-block mx-auto loading" style={{height:'60px', width:'60px'}} src="https://thumbs.gfycat.com/SkinnySeveralAsianlion-max-1mb.gif"  alt="load"></img>
                :<div className="suggestions">
                {
                    suggestions.users.map(user=>(
                       <Usercard key={user._id} user={user}>
                       <Followbtn user={user}/>
                       

                       </Usercard>

                    ))
                }

                </div>
            }
            <div style={{opacity: 0.5}} className="my-2" >
                <a href="https://www.linkedin.com/in/isheeka-mitra-6aa9b61b8/" target="_blank" rel="noreferrer"
                style={{wordBreak: 'break-all'}} >
                    https://www.linkedin.com/in/isheeka-mitra-6aa9b61b8/
                </a>
                <small className="d-block">
                   Follow us or Connect with us on LinkedIn
                </small>

                <small>
                   &copy; 2021 NOTIFYSH FROM ISHMIT
                </small>
            </div>
        </div>
    );
}


export default Rightsidebar;