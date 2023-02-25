import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createError } from "../error.js"

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = await User({ ...req.body, password: hash })
    await newUser.save()
    res.status(200).send("User created successfully")
  } catch (error) {
    next(error)
  }
}


export const signin = async (req, res, next) => {
  try {
    // username and password from req.body
    console.log(req.body.name, req.body.password)
    const user = await User.findOne({ name: req.body.name })
    console.log(user)
    if (!user) return next(createError(404, "User not found"))

    const isCorrect = await bcrypt.compare(req.body.password, user.password)

    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT)

    const { password, ...others } = user._doc;

    // send cookies
    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json(others)
  } catch (error) {
    next(error)
  }
}

export const googleAuth = async (req, res, next) => {
  try {
    //1. find user
    const user = await User.findOne({ email : req.body.email })
    console.log("user",user)
    //2. if exists send cookie else create user
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = await new User({
        ...req.body,
        fromGoogle: true,
      })

      const savedUser = await newUser.save();
      console.log(savedUser)

      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
  
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
      }

  } catch (error) {
  next(error)
}
}