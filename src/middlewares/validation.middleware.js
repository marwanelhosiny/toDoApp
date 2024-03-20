
const reqKeys=['body','query','headers','params']

export const validationMiddleware=(schema)=>{
    return (req,res,next)=>{
        let validationErrors=[]
        for(const key of reqKeys){
            const validationResult=schema[key]?.validate(req[key],{abortearly:false})
            if(validationResult?.error){
                    validationErrors.push(...validationResult.error.details)
            }
        }
        if(validationErrors.length){
            return res.status(400).json({
                message:"validation error",
                errs:validationErrors.map((ele)=>{return ele.message})
            })}
            next()
    }
}