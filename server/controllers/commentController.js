const { Comment, User } = require('../models/models');
const ApiError = require('../error/ApiError');

class CommentController {
    // Создание комментария
    async create(req, res, next) {
        try {
            const { userId, deviceId, text } = req.body; // Изменяем 'content' на 'text'
            if (!text) {
                return next(ApiError.badRequest('Комментарий не может быть пустым'));
            }

            // Проверка на существование userId и deviceId
            if (!userId || !deviceId) {
                return next(ApiError.badRequest('Не указан userId или deviceId'));
            }

            const comment = await Comment.create({ userId, deviceId, text });
            return res.json(comment);
        } catch (error) {
            next(ApiError.internal('Ошибка при создании комментария'));
        }
    }

    // Получение всех комментариев для конкретного устройства
    async getAll(req, res, next) {
        try {
            const { deviceId } = req.params;
            const comments = await Comment.findAll({
                where: { deviceId },
                include: [{ model: User, attributes: ['login'] }] // Убираем 'as' для корректного запроса
            });
            return res.json(comments);
        } catch (error) {
            next(ApiError.internal('Ошибка при получении комментариев'));
        }
    }

    // Редактирование комментария
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { text } = req.body; // Изменяем 'content' на 'text'
            if (!text) {
                return next(ApiError.badRequest('Комментарий не может быть пустым'));
            }
            const [updated] = await Comment.update({ text }, { where: { id } });
            if (updated) {
                const updatedComment = await Comment.findOne({ where: { id } });
                return res.json(updatedComment);
            }
            return next(ApiError.badRequest('Комментарий не найден'));
        } catch (error) {
            next(ApiError.internal('Ошибка при редактировании комментария'));
        }
    }

    // Удаление комментария
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Comment.destroy({ where: { id } });
            if (deleted) {
                return res.json({ message: 'Комментарий удален' });
            }
            return next(ApiError.badRequest('Комментарий не найден'));
        } catch (error) {
            next(ApiError.internal('Ошибка при удалении комментария'));
        }
    }
}

module.exports = new CommentController();
