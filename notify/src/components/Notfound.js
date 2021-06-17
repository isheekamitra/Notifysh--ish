import { NavLink } from 'react-router-dom';
import '../index.css'
const Notfound = () => {
    return (
        <>
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                </div>
                <h2>We are sorry,Page not found!</h2>
                <p className="mb-5">
                    The page you are looking for might have been deleted or had its name changed or is temporarily unavailable.
                </p>
                <NavLink to="/">Back to homepage</NavLink>
            </div>
        </div>
        </>
    )
}



export default Notfound;