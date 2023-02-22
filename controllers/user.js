import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

// update
export const updateUser =async (req,res,next) => {
    // param will get ID
    console.log(req.params.id)
    console.log("token : ",req.cookies)
    // cookie will parse in verifyToken and get user
    console.log(req.params.id)
    console.log(req.body)
    if(req.params.id){
        try {
         const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set : req.body
            },
            {new : true}
         )
         res.status(200).json({msg: "successfully updated" ,data: updatedUser})
        } catch (error) {
            next(err);
        }
    }else{
        return next(createError(403,"You can update only your account"))
    }
}


// delete
export const deleteUser = async (req,res,next) => {
    // param will get ID
    // cookie will parse in verifyToken and get user
    if(req.params.id===req.user.id){
        try {
         const updatedUser = await User.findByIdAndDelete( req.params.id)
         res.status(200).json("User has been deleted")
        } catch (error) {
            next(err);
        }
    }else{
        return next(createError(403,"You can delete only your account"))
    }
}


// subscribed
export const subscribe = () => {
    try {

    } catch (error) {
        next(err);
    }
}

// unsubscribed
export const unsubscribe = () => {
    try {

    } catch (error) {
        next(err);
    }
}

// like
export const like = () => {
    try {

    } catch (error) {
        next(err);
    }
}

// dislike
export const dislike = () => {
    try {

    } catch (error) {
        next(err);
    }
}


export const test = (req,res) => {
    res.json("Hello world!");
}