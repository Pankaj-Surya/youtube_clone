import express from "express";
import {test,addComment,deleteComment,getAllVidComment} from "../controllers/comment.js"
import { verifyToken } from "../verifyToken.js";
const router=express.Router()

//router.get('/',test)
router.post('/',verifyToken,addComment)
router.delete('/:id',verifyToken,deleteComment)
router.get('/:videoId',getAllVidComment)

export default router