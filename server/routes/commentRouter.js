const Router = require('express');
const commentController = require('../controllers/commentController');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware'); 

router.post('/', authMiddleware, commentController.create); 
router.get('/:deviceId', commentController.getAll); 
router.put('/:id', authMiddleware, commentController.update); 
router.delete('/:id', authMiddleware, commentController.delete); 

module.exports = router;
