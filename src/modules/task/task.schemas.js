import Joi from "joi"

export const addtaskSchema={
    body:Joi.object({
        title:Joi.string().min(2).max(30).required(),
        desc:Joi.string().max(300),
        deadline:Joi.date().required()
    })
}

export const updatetaskSchema={
    body:Joi.object({
        title:Joi.string().min(2).max(30).required(),
        desc:Joi.string().max(300),
        status:Joi.string().valid('toDo','doing','done'),
        assignTo:Joi.string().hex().length(24).required()
    })
}

export const deletetaskSchema={
    params:Joi.object({
        id:Joi.string().hex().length(24).required()
    })
}



