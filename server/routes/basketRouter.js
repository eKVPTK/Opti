const Router = require('express');
const basketController = require('../controllers/basketController');
const router = new Router();

router.post('/add', basketController.addDevice);
router.get('/:userId', basketController.getAll); 
router.get('/check/:userId/:deviceId', basketController.checkDevice);
router.delete('/remove/:deviceId', basketController.removeDevice);
router.post('/update-quantity', basketController.updateQuantity);



module.exports = router;
