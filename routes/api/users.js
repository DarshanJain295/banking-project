//setting up our api routes;
//pulling our required dependencies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const  keys = require("../../config/keys");

const validateRegisterInput= require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//loading user model
const User= require("../../models/User");
const { model } = require("mongoose");

//@route POST api/users/register
//@desc Register user
//@access Public
router.post("/register",(req,res) => {
    //form validation
    const {erros, isValid} = validateRegisterInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email}).then(user=>{
        if(user){
            return res.status(400).json({email:"this email aldready exists try another email"});
        }
        else{
            const newUser = new User ({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            //hashing password before saving in the database;
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash) =>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user=>res.json(user))
                        .catch(err =>console.log(err));
                });
            });
        }
    });
});

//@route POST api/users/login
//@desc Login user and Return JWT token
//@access PUBLIC

router.post("/login",(req,res)=>{
    //Form Validation
    const {errors, isValid} = validateLoginInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    //find user by email
    User.findOne({email})
        .then(user=>{
            if(!user){
                return res.status(400).json({emailnotfound:"Email Not Found"});
            }
            //if user found then checks password
            bcrypt.compare(password,user.password)
                .then(isMatch=>{
                    if(isMatch){
                        //create payload
                        const payload ={
                            id:user.id,
                            name: user.name
                        };
                        jwt.sign(payload,keys.secretOrKey,
                            {
                                expiresIn: 14440//4 hours
                            },
                            (err,token)=>{
                                res.json({
                                    success: true,
                                    token: "Bearer "+ token                                
                                });
                            }
                        );
                    }
                    //password not matched
                    else{
                        return res.status(400).json({passwordincorrect: "password incorrect, Try again"});
                    }
                });
        });
});

// exporting our router so that we can call its elsewhere
module.exports =router; 