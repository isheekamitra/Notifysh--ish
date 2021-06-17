import {Redirect,Route} from 'react-router-dom'
const PrivateRouter = (props) => {
    const firstlogin= localStorage.getItem('firstlogin')
    return firstlogin ? <Route {...props}/>: <Redirect to='/'/>

}

export default PrivateRouter;