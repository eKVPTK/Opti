const Router = require('express');
const deviceController = require('../controllers/deviceController');
const checkRole = require('../middleware/checkRoleMiddleware'); 
const router = new Router();

router.post('/', deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);
router.delete('/:id', checkRole('SUPPLIER'), deviceController.delete);
router.put('/:id', deviceController.update);

module.exports = router;
