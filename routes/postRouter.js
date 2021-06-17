const router= require ('express').Router()
const postctrl = require('../controllers/postCtrl')
const auth= require('../middleware/auth')
router.route('/posts')
.post(auth,postctrl.createpost)
.get(auth,postctrl.getpost)

router.route('/post/:id')
.patch(auth,postctrl.updatepost)
.get(auth,postctrl.getposts)
.delete(auth,postctrl.deletepost)

router.patch('/post/:id/like',auth,postctrl.likepost)

router.patch('/post/:id/unlike',auth,postctrl.unlikepost)

router.get('/user_posts/:id',auth,postctrl.getuserpost)

router.get('/post_discover',auth,postctrl.getpostsdiscover)

router.patch('/savePost/:id', auth, postctrl.savePost)

router.patch('/unSavePost/:id', auth, postctrl.unSavePost)

router.get('/getSavePosts', auth, postctrl.getSavePosts)

module.exports=router