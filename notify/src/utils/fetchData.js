import axios from 'axios';
export const getdataapi=async(url,token)=>{

    const res=await axios.get(`/api/${url}`,{
        headers:{Authorization:token}
    })
    return res;
}

export const postdataapi=async(url,post,token)=>{
    const res=await axios.post(`/api/${url}`,post,{
        headers:{Authorization:token}
    })
    return res;
}
export const putdataapi=async(url,post,token)=>{
    const res=await axios.put(`/api/${url}`,post,{
        headers:{Authorization:token}
    })
    return res;
}
export const patchdataapi=async(url,post,token)=>{
    const res=await axios.patch(`/api/${url}`,post,{
        headers:{Authorization:token}
    })
    return res;
}
export const deletedataapi=async(url,token)=>{
    const res=await axios.delete(`/api/${url}`,{
        headers:{Authorization:token}
    })
    return res;
}