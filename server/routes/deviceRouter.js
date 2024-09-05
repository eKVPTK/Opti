const Router = require('express');
const deviceController = require('../controllers/deviceController');
const checkRole = require('../middleware/checkRoleMiddleware'); // middleware для проверки роли
const router = new Router();

router.post('/', deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);
router.delete('/:id', checkRole('SUPPLIER'), deviceController.delete); // Добавляем роут для удаления устройства
router.put('/:id', deviceController.update);

module.exports = router;
