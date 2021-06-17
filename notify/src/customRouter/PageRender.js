import React from "react";
import {useParams } from "react-router";
import Notfound from "../components/Notfound";
import {useSelector} from 'react-redux'
const generatePage=(pagenam)=>{
  const component=()=>require(`../pages/${pagenam}`).default
  try{
    return React.createElement(component());
  }catch(err){
   return <Notfound/>
  }
}
const PageRender = () => {
    const {page,id}=useParams();
    const {auth} = useSelector(state=>state)
    
    let pagenam="";
    if(auth.token){
      if(id){
        pagenam=`${page}/[id]`
    }
    else{
        pagenam=`${page}`
    }
    }
   
    return generatePage(pagenam)
}


export default PageRender;