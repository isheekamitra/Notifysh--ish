import Comments from "./home/Comments";
import Inputcomment from "./home/Inputcomment";
import Cardbody from "./home/postcard/Cardbody";
import Cardfooter from "./home/postcard/Cardfooter";
import Cardheader from "./home/postcard/Cardheader";

const PostCard = ({post,theme}) => {
    return (
        <div key={post._id} className="card my-3">
        <Cardheader post={post}/>
        <Cardbody post={post} theme={theme}/>
        <Cardfooter post={post}/>
        <Comments post={post}/>
        <Inputcomment  post={post}/>
        </div>
    );
}


export default PostCard;