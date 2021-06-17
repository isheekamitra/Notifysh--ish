import Leftside from "../../components/message/Leftside"
import Rightside from "../../components/message/Rightside"

const Conversation = () => {
    return (
     <div className="message d-flex">
         <div className="col-md-4 border-right px-0 left_mess">
             <Leftside/>
         </div>
         <div className="col-md-8 px-0">
        
            <Rightside/>
         </div>
     </div>
    );
}


export default Conversation;
