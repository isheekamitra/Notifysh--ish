import {useSelector} from 'react-redux';
const Likebtn = ({islike,handlelike,handleunlike}) => {
    const {theme} = useSelector(state=>state)
    return (
        <>
        
        {
            islike
            
            ?  <i className="fas fa-heart text-danger" style={{filter:theme?'invert(1)':'invert(0)'}} onClick={handleunlike}/>
            :  <i className="far fa-heart" onClick={handlelike}/>
        }
        </>
    );
}



export default Likebtn;