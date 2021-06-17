import {useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Usercard from '../Usercard'
import { getdataapi } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { useHistory, useParams } from 'react-router-dom'
import { getConversations, MESS_TYPES } from '../../redux/actions/messageAction'

const Leftside = () => {
    const { auth,message,online } = useSelector(state => state)
    const dispatch = useDispatch()
    const [search,setsearch]=useState('')
    const [searchUsers, setSearchUsers] = useState([])
    
     const history = useHistory()
 const { id } = useParams()
 const pageEnd = useRef()
 const [page, setPage] = useState(0)

    const handleSearch = async e => {
        e.preventDefault()
        if(!search) return setSearchUsers([]);

        try {
            const res = await getdataapi(`search?username=${search}`, auth.token)
            setSearchUsers(res.data.users)
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}
            })
        }
    }
    const handleAddUser = (user) => {
        setsearch('')
        setSearchUsers([])
 
     dispatch({type: MESS_TYPES.ADD_USER, payload: {...user, text: '', media: []}})
       dispatch({type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online})
        return history.push(`/message/${user._id}`)
    }
    
    
    const isActive = (user) => {
        if(id === user._id) return 'active';
        return ''
    }
     useEffect(()=>{
       if(message.firstLoad)
       return;
       dispatch(getConversations({auth}))
     },[dispatch,auth,message.firstLoad])

     
    // Load More
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                setPage(p => p + 1)
            }
        },{
            threshold: 0.1
        })

        observer.observe(pageEnd.current)
    },[setPage])

    useEffect(() => {
        if(message.resultUsers >= (page - 1) * 9 && page > 1){
            dispatch(getConversations({auth, page}))
        }
    },[message.resultUsers, page, auth, dispatch])
      

    
    // Check User Online - Offline
    useEffect(() => {
        if(message.firstLoad) {
            dispatch({type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online})
        }
    },[online, message.firstLoad, dispatch])
    return (
      <>
      <form className="message_header" onSubmit={handleSearch} >
          <input type='text' value={search} placeholder='Enter to search...'
              onChange={e=>setsearch(e.target.value)}
          />
          <button type='submit' style={{display: 'none'}}>Search</button>
      </form>
      <div className="message_chat_list">
          {
              searchUsers.length!==0
              ?<>
              {
                searchUsers.map(user => (
                                <div key={user._id} className={`message_user ${isActive(user)}`}
                                onClick={()=>handleAddUser(user)}
                                >
                            
                                    <Usercard user={user} />
                                </div>
                            ))
              }
              </>
              :<>
              {
                            message.users.map(user => (
                                <div key={user._id} className={`message_user ${isActive(user)}`}
                                onClick={() => handleAddUser(user)}>
                                    <Usercard user={user} msg={true}>
                                        {
                                            user.online
                                            ? <i className="fas fa-circle text-success" />
                                            : auth.user.following.find(item => 
                                                item._id === user._id
                                            ) &&
                                             <i className="fas fa-circle" />
                                                
                                        } 
                                      
                                    </Usercard>
                                </div>
                            ))
                        }
              </>
          }
          <button ref={pageEnd} style={{opacity: 0}} >Load More</button>
      </div>
      </>
    );
}



export default Leftside;