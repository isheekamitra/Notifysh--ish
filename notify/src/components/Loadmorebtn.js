
const Loadmorebtn = ({result,page,load, handleloadmore}) => {
    return (
        <>
        {
            result<9 * (page-1)?'':
            !load &&<button className="btn btn-dark mx-auto d-block" 
            onClick={handleloadmore}
            >Load more</button>
        }
        
        </>
    );
}



export default Loadmorebtn;