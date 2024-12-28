const express = require('express');
const router = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
const { User } = require('../db');

const signUpBody = zod.object({
    userName: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

router.post('/signup', async(req, res)=>{
    const success = signUpBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })
    
    if (existingUser){
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await User.create({
        username: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })
    const userId= user._id;
    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        message: "User created",
        token: token
    })
})

const signInBody = zod.object({
    userName: zod.string().email(),
    password: zod.string()
})

router.post('/signin', async(req,res)=>{
    const success = signInBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Error while logging in"
        })
    }

    const user = await User.findOne({
        userName: req.body.userName,
        password: req.body.password
    })

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)

        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "rror while logging in"
    })

})
module.exports = router;