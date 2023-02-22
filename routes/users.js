import express from "express";
import {updateUser,deleteUser,subscribe,unsubscribe,like,dislike,test} from "../controllers/user.js" 
import { verifyToken } from "../verifyToken.js";

const router = express.Router();    

router.get('/test',test)
router.put('/:id',verifyToken,updateUser)
router.delete('/:id',verifyToken,deleteUser)
router.put('/sub/:id',subscribe)
router.put('/unsub/:id',unsubscribe)
router.put('/like/:videoId',like)
router.put('/dislike/:videoId',dislike)



export default router;