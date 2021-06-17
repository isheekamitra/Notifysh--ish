const router = require('express').Router()
const auth = require('../middleware/auth')
const notifyCtrl = require('../controllers/notifyCtrl')

router.post('/notify', auth, notifyCtrl.createNotify)

router.delete('/notify/:id', auth, notifyCtrl.removeNotify)
router.get('/notifies', auth, notifyCtrl.getnotifies)
router.patch('/isreadnotifiy/:id', auth, notifyCtrl.isReadnotify)
router.delete('/deleteallnotify', auth, notifyCtrl.deleteallnotify)

module.exports = router