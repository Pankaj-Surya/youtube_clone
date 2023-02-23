import express from "express";
import {test,addVideo,updateVideo,deleteVideo,getVideo,addView,trend,random,sub,getByTag,search} from "../controllers/video.js"
import { verifyToken } from "../verifyToken.js";

const router = express.Router()

router.get('/', test)
router.post('/',verifyToken,addVideo)
router.put('/:id',verifyToken,updateVideo)
router.delete('/:id',verifyToken,deleteVideo)
router.get('/sub',verifyToken,sub)
router.get('/find/:id',getVideo)
router.put('/find/:id',addView)
router.get('/trend',trend)
router.get('/random',random)
router.get('/tags',getByTag)
router.get('/search',search)


export default router