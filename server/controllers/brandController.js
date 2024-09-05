const {Brand} = require('../models/models');
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            if (!name) {
                return next(ApiError.badRequest('Имя бренда не может быть пустым'));
            }
            const brand = await Brand.create({name});
            return res.json(brand);
        } catch (error) {
            next(ApiError.internal('Ошибка при создании бренда'));
        }
    }

    async getAll(req, res, next) {
        try {
            const brands = await Brand.findAll();
            return res.json(brands);
        } catch (error) {
            next(ApiError.internal('Ошибка при получении брендов'));
        }
    }
}

module.exports = new BrandController();
