import { useEffect } from "react";
import { useSelector } from "react-redux";
import Posts from "../components/home/Posts"
import Rightsidebar from "../components/home/Rightsidebar";
import Status from "../components/home/Status"
let scroll=0;

const Home = () => {
  const{homepost}=useSelector(state=>state)
  window.addEventListener('scroll',()=>{
    if(window.location.pathname==='/')
    {
      scroll=window.pageYOffset
      return scroll;
    }
  })

  useEffect(()=>{
    setTimeout(()=>{
      window.scrollTo({top:scroll,behavior:'smooth'})
    },100)
  },[])
    return (
        <div className="home row mx-0">
        <div className="col-md-8">
        <Status/>
        {/* <Posts/> */}
       {
         homepost.loading?
         <img className="d-block mx-auto loading" style={{height:'60px', width:'60px'}} src="https://thumbs.gfycat.com/SkinnySeveralAsianlion-max-1mb.gif"  alt="load"></img>
         :(homepost.result===0 && homepost.posts.length===0)
           ?<h2 className="text-center">No Post</h2>
           :<Posts/>
       }
        </div>
        <div className="col-md-4"> 
              <Rightsidebar/>
        </div>
         
        </div>
    );
}


export default Home;