
const Toast = ({msg,handleshow,bgcolor}) => {
    return (
        <div className={`toast show position-fixed text-light ${bgcolor}`}
        style={{top:'5px',right:'5px',minWidth:'200px',zIndex:50}}>
        <div className={`toast-header text-light ${bgcolor}`}>
            <strong className="mr-auto text-light">{msg.title}</strong>
            <button className="ml-2 mb-1 close text-light"
            data-dismiss="toast" style={{outline:'none'}}
            onClick={handleshow}
            >&times;</button>
        </div>
        <div className="toast-body">
          {msg.body}
        </div>

        </div>
    );
}


export default Toast;