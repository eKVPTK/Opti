const Router = require('express');
const commentController = require('../controllers/commentController');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware'); // Добавим middleware для авторизации

// Создание комментария
router.post('/', authMiddleware, commentController.create); // Добавляем authMiddleware для проверки авторизации пользователя

// Получение всех комментариев для конкретного устройства
router.get('/:deviceId', commentController.getAll); // Не нужен middleware, так как просмотр комментариев доступен всем

// Редактирование комментария
router.put('/:id', authMiddleware, commentController.update); // Защищаем маршрут для редактирования

// Удаление комментария
router.delete('/:id', authMiddleware, commentController.delete); // Защищаем маршрут для удаления

module.exports = router;
