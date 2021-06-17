import Carousel from "../../profile/Carousel";
import { useState } from 'react'
const Cardbody = ({post,theme}) => {
    const [readmore,setreadmore]=useState(false)
    
    return  (
        <div className="card_body">
        <div className="card_body-content"
            style={{filter: theme ? 'invert(1)' : 'invert(0)',
                    color:theme?'white':'#111'
            }
    
            }
            
             >
        <span>{
            post.content.length<60
            ?post.content
            :readmore? post.content+' ': post.content.slice(0,60) + '.....'
        }
        </span>
        {
            post.content.length>=60 &&
            <span className="readmore" onClick={()=>setreadmore(!readmore)}> 
                {readmore?'Hide Content': 'Read More'}
            </span>
        }
        </div>
        
        {
              post.images.length>0 && <Carousel images={post.images} id={post._id}/>
        }
        </div>
    )
}


export default Cardbody;