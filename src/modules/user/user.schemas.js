import Joi from "joi";

export const signupSchema={
    body:Joi.object({
        firstName: Joi.string().min(2).max(10).required(),
        lastName: Joi.string().required().min(2).max(10),
        email: Joi.string().email().required(),
        password:Joi.string().required(),
        age:Joi.number().min(15).max(100),
        gender:Joi.string().valid('male','female'),
        phone:Joi.string().required(),
        cpass:Joi.string().valid(Joi.ref("password")).required().messages({"any.only":"you entered different password"})
    })
}

export const signinSchema={
    body:Joi.object({
        email: Joi.string().email().required(),
        password:Joi.string().required(),
    })
}


export const changepassSchema={
    body:Joi.object({
        oldPass: Joi.string().required(),
        newPass:Joi.string().required(),
    })
}

export const userupdateSchema={
    body:Joi.object({
        firstName: Joi.string().min(2).max(10).required(),
        lastName: Joi.string().required().min(2).max(10),
        age:Joi.number().min(15).max(100)
    })
}