const Joi = require('joi')
const { JsonWebTokenError } = require('jsonwebtoken')

module.exports = {
    Schema:{
        AddCart:Joi.object({
            name:Joi.string().required(),
            image:Joi.string().required(),
            user:Joi.optional(),
        }),

        AllSchema:{
            id:Joi.object({
                id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            }),
            image:Joi.object({
                image:Joi.string().required()
            }),
            page:Joi.object({
                page:Joi.number().required(),
            }),
            },
        RegisterSchema:Joi.object({
            name:Joi.string().required(),
            email:Joi.string().email().required(),
            phone:Joi.string().min(8).max(11).required(),
            password:Joi.string().min(8).max(22).required(),
        }),
        PostSchema:Joi.object({
            cart:Joi.string().regex(/^[0-9a-fA-f]{24}$/).required(),
            image:Joi.string().required(),
            title:Joi.string().required(),
            desc:Joi.string().required(),
            tag:Joi.string().regex(/^[0-9a-fA-f]{24}$/).required(),
            user:Joi.optional(),
        }),
        TagSchema:Joi.object({
            name:Joi.string().required(),
            image:Joi.string().required(),
            user:Joi.optional()
        }),
        CommentSchema:Joi.object({
            postId:Joi.string().regex(/^[0-9a-fA-f]{24}$/).required(),
            name:Joi.string().required(),
            email:Joi.string().email().required(),
            context:Joi.string().required(),
            user:Joi.optional(),
        }),
    }
}