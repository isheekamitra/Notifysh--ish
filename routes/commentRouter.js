const router=require('express').Router()
const commentCtrl=require('../controllers/commentCtrl')
const auth= require ('../middleware/auth');

router.post('/comment',auth,commentCtrl.createcomment)


router.patch('/comment/:id',auth,commentCtrl.updatecomment)
router.patch('/comment/:id/like',auth,commentCtrl.likecomment)

router.patch('/comment/:id/unlike',auth,commentCtrl.unlikecomment)

router.delete('/comment/:id',auth,commentCtrl.deletecomment)
module.exports=router