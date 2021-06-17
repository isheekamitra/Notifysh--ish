export const checkimage= (file)=>{
    let err=""
    if(!file)
    return err="File does not exist"
    if(file.size>1024*1024) //1mb
    err="The largest image size is 1mb"

    if(file.type!=='image/jpeg' && file.type !=='image/png')
    err="Image format is incorrct"

    return err
} 

export const imageupload=async(images)=>{
let imaarry= [];
for(const item of images){
   
   const formdata= new FormData()
   if(item.camera)
    formdata.append('file',item.camera)
   else
   formdata.append('file',item)
   
   formdata.append('upload_preset','mxcy1dev')
   formdata.append('cloud_name','drdfig4iw')
   const res= await fetch('https://api.cloudinary.com/v1_1/drdfig4iw/upload',{
       method:"POST",
       body:formdata

   })
   const data= await res.json()
   imaarry.push({public_id:data.public_id,url:data.secure_url})
//    console.log(data);
}
return imaarry;
}