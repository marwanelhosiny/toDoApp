export const checkDuplicate=async(model,query)=>{
    const check= await model.findOne(query)
    if(check){return {message:"duplicated entry" ,status:400,success:false}}
    return{message:"new entry",status:200,success:true}

}