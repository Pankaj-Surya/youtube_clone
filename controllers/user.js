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
            next(error);
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
            next(error);
        }
    }else{
        return next(createError(403,"You can delete only your account"))
    }
}


// get User => channel (video)
export const getUser =async () => {
    try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
    } catch (error) {
        next(error);
    }
}



// subscribed
export const subscribe =async (req, res, next) => {
    try {
    //1. channel/user :  from params on which video watching 
    //2. verifyToken : give logged in user =>req.user
    const channel = await User.findById(req.params.id)
    const user = await User.findById(req.user.id)
    console.log("channel : ",channel,"  user : ",user)
    //3. update loggedIn user => subsrcibed user array
     await User.findByIdAndUpdate(req.user.id,
        { $push : {subscribedUsers : req.params.id }})
   
    //4. update channel subscriber count
    await User.findByIdAndUpdate(req.params.id,
      {$inc : {subscribers: 1  } })

      res.status(200).json({msg : "Subscription successfull."})
    } catch (error) {
        next(error);
    }
}

// unsubscribed
export const unsubscribe =async (req, res, next) => {
    try {
        //1. channel/user :  from params on which video watching 
        //2. verifyToken : give logged in user =>req.user
        const channel = await User.findById(req.params.id)
        const user = await User.findById(req.user.id)
        console.log("channel : ",channel.name,"  user : ",user.name)
        //3. update loggedIn user => subsrcibed user array
       await User.findByIdAndUpdate(req.user.id,
        { $pull : {subscribedUsers : req.params.id }})
       
        //4. update channel subscriber count
        await User.findByIdAndUpdate(req.params.id,
          {  $inc : {subscribers: -1  } })
    
          res.status(200).json("Unsubscription successfull.")
        } catch (error) {
            next(error);
        }
}

// like
export const like =async (req, res, next) => {
    try {
     // video table -> like and dislike array is there
     //1.we want video and user who logged in can like
     const id = req.user.id;
     const videoId = req.params.videoId;
    
     //2. video table -> like array -> add userId 
     // remove userid from dislike array
     // addToSet -> is set not add duplicate
     await Video.findByIdAndUpdate(videoId,{
       $addToSet : { likes : id},
       $pull : {dislikes : id} 
     })
     res.status(200).json("The video has been liked.")
    } catch (error) {
        next(err);
    }
}

// dislike
export const dislike =async (req, res, next) => {
    try {
        const id = req.user.id;
        const videoId = req.params.videoId;
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
          })
          res.status(200).json("The video has been disliked.")
    } catch (error) {
        next(error);
    }
}


export const test = (req,res) => {
    res.json("Hello world!");
}