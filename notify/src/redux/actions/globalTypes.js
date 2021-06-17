export const GLOBALTYPES={
    AUTH:'AUTH',
    ALERT:'ALERT',
    THEME:'THEME',
    STATUS:'STATUS',
    MODAL:'MODAL',
    SOCKET:'SOCKET',
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE',
    CALL:'CALL',
    PEER:'PEER'
    
}
export const Editdata=(data,id,post)=>{
    const newdata=data.map(item=>
        (item._id===id)?post:item)
    return newdata;
}
export const deletedata=(data,id)=>{
    const newdata=data.filter(item=>item._id!==id)
    return newdata;
}