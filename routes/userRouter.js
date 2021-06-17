const router=require('express').Router();
const auth=require('../middleware/auth');
const userCtrl=require('../controllers/userCtrl');
router.get('/search',auth,userCtrl.searchuser)

router.get('/user/:id',auth,userCtrl.getuser)


router.patch('/user',auth,userCtrl.updateuser)


router.patch('/user/:id/follow',auth,userCtrl.follow)

router.patch('/user/:id/unfollow',auth,userCtrl.unfollow)

router.get('/suggestionsUser', auth, userCtrl.suggestionsUser)
module.exports=router