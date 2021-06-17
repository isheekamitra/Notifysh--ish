
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icons from "./Icons";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { createpost, updatepost } from "../redux/actions/postActions";

const Statusmodel = () => {
    const {auth,theme,status,socket} = useSelector(state=>state)
    const dispatch = useDispatch(); 
    const [content,setcontent]= useState('')
    const [image,setimg]= useState([])
    const [stream,setstream]= useState(false)
    const vedioref=useRef()
    const vediocanvas=useRef()
    const [tracks,settracks]=useState('')

    const handlechange=(e)=>{
       const files=[...e.target.files]
       let err=""
       let newimages=[]
       files.forEach(file=>{
           if(!file)
           return err='File does not exist'

           if(file.size>1024*1024*5)
           return err="Largest size allowed is 5mb."
           return newimages.push(file)
       })

       if(err)
       dispatch({type:GLOBALTYPES.ALERT,payload:{error:err}})
       setimg([...image,...newimages])
    }

    const deleteimage=(index)=>{
        const newarray=[...image]
        newarray.splice(index,1)
        setimg(newarray)
    }

    const handlestream=()=>{
             setstream(true)
             if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){
                 navigator.mediaDevices.getUserMedia({video:true})
                 .then(mediastream=>{
                     vedioref.current.srcObject=mediastream
                     vedioref.current.play()
                     const track=mediastream.getTracks()
                     settracks(track[0])
                 }).catch(err=>console.log(err));
             }
    }
    const handlecapture=()=>{
        const width = vedioref.current.clientWidth
        const height = vedioref.current.clientHeight

        vediocanvas.current.setAttribute('width',width)
        vediocanvas.current.setAttribute('height',height)
        const ctx=vediocanvas.current.getContext('2d')
        ctx.drawImage(vedioref.current,0,0 ,width,height)
        let URL=vediocanvas.current.toDataURL()
        setimg([...image,{camera:URL}])
    }
    const handlestreamstop=()=>{
        tracks.stop()
        setstream(false)
    }
    const handlesubmit=(e)=>{
        e.preventDefault()
        if(image.length===0)
        return dispatch({type:GLOBALTYPES.ALERT,payload:{error:'Please add your image'}})
        if(status.onEdit){
            dispatch(updatepost({content,image,auth,status}))
        }else{
            dispatch(createpost({content,image,auth,socket}))
        }
       
        setcontent('')
        setimg([])
        if(tracks)
        tracks.stop()
        dispatch({type:GLOBALTYPES.STATUS,payload:false})
    }
    useEffect(()=>{
     if(status.onEdit){
  setcontent(status.content)
     setimg(status.images)
     }
   

    },[status])

    const imageshow=(src)=>{
        return(
            <img 
            src={src} alt="img" className="img-thumbnail"
            style={{filter:theme?'invert(1)':'invert(0)'}}
            />
        )
    }
    const videoshow=(src)=>{
        return(
            <video controls
            src={src} alt="img" className="img-thumbnail"
            style={{filter:theme?'invert(1)':'invert(0)'}}
            />
        )
    }
    return (
        <div className="status_modal">
           <form onSubmit={handlesubmit}>
            <div className="status_header">
                <h5 className="m-0">Create Post</h5>
                <span  onClick={()=>dispatch({type:GLOBALTYPES.STATUS,payload:false})}
                >&times;</span>
            </div>
           
           <div className="status_body">
               <textarea name="content" value={content}
               onChange={e=>setcontent(e.target.value)}

               placeholder={`${auth.user.username} , what are you thinking?`}/>
                   <div className='d-flex'>
                       <div className='flex-fill'>

                       </div>
                       <Icons setContent={setcontent} content={content} theme={theme}/>
                   </div>
               
             <div className="show_images">
                 {
                     image.map((imgi,index)=>(
                         <div key={index} id="file_img">
                          {
                              imgi.camera? imageshow(imgi.camera)
                              :imgi.url 
                                 ? <>
                                 {
                                     imgi.url.match(/video/i)
                                     ? videoshow(imgi.url)
                                     : imageshow(imgi.url)
                                 }
                                 </>
                                 :<>
                                 {
                                     imgi.type.match(/video/i)
                                     ? videoshow(URL.createObjectURL(imgi))
                                     : imageshow(URL.createObjectURL(imgi))
                                 }
                                 </>
                          }
                         <span onClick={()=>deleteimage(index)}>&times;</span>
                         </div>
                     ))
                 }
             </div>
             
             {
                 stream && 
                 <div className="stream position-relative">
                    <video src="" autoPlay muted ref={vedioref} width="100%" height="100%"
                        style={{filter:theme?'invert(1)':'invert(0)'}}
                    />     
                    <span onClick={handlestreamstop}>&times;</span>
                    <canvas ref={vediocanvas}
                        style={{display:'none'}}
                    />
                 </div>
             }


           <div className="input_images">
           {
               stream
               ? <i className="fas fa-camera" onClick={handlecapture}></i>
               :<>  <i className="fas fa-camera" onClick={handlestream}></i>
             <div className="file_upload">
                <i className="fas fa-image"></i>
                <input type="file" name="file" id="file"
                onChange={handlechange}
                multiple accept='image/*,videp/*'></input>

             </div></>
           }

            
           </div>
           </div>
        
            <div className="status_footer">
                <button className="btn btn-secondary w-100" type="submit">Post</button>
            </div> 
           </form>
        </div>
    );
}



export default Statusmodel;