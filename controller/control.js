const express = require("express");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const User = require("../model/user");

exports.home = function(req,res){
    res.render("home",{condition:false,message:""});
}

exports.signup = async function(req,res){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    await User.findOne({ username: username }).then(async function(foundUser){
        if (foundUser) {
            res.render("home", { condition: true, message: "Username already in use" });
        } else {
            await User.findOne({ email: email }).then((foundMail)=>{
                if (foundMail) {
                    res.render("home", { condition: true, message: "Email already in use" });
                } else {
                    if (!validator.isEmail(email)) {
                        res.render("home", { condition: true, message: "Please use authentic email" });
                    } else {
                        var hash = bcrypt.hashSync(password, 8);
                        const signUpUser = new User({
                            username: username,
                            email: email,
                            password: hash
                        });

                        try {
                            signUpUser.save();
                            res.redirect("/entry");
                        } catch (err) {
                            console.log(err);
                        }
                    }
                }
            })
        }
    });
}

exports.login = function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username }).then(function(foundUser){
        if (foundUser) {
            if (bcrypt.compareSync(password, foundUser.password)) {
                res.redirect("/entry");
            } else {
                res.render("home", { condition: true, message: "Invalid Username/Password" });
            }
        } else {
            res.render("home", { condition: true, message: "Invalid Username/Password, if you haven't signup please signup first" });
        }
    });
}

exports.entry = function(req,res){
    res.render("entry",{gender:"",hobbies:[]});
}

exports.actionPage = function(req,res){
    // console.log(req.body.gender);

    const hobby=[];

    let one=req.body.check1;
    let two=req.body.check2;
    let three=req.body.check3;
    let four=req.body.check4;

    if(one){
        hobby.push(req.body.check1);
    }
    if(two){
        hobby.push(req.body.check2);
    }
    if(three){
        hobby.push(req.body.check3);
    }
    if(four){
        hobby.push(req.body.check4);
    }

    res.render("entry",{gender:req.body.gender,hobbies:hobby});
}