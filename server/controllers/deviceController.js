const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');

class DeviceController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info, description, phone, userId } = req.body;
            if (!name || !price || !brandId || !typeId || !description || !phone) {
                return next(ApiError.badRequest('Все поля обязательны'));
            }

            const { img } = req.files;
            if (!img) {
                return next(ApiError.badRequest('Изображение обязательно'));
            }

            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const device = await Device.create({ name, price, description, brandId, typeId, img: fileName, phone, userId });

            if (info) {
                info = JSON.parse(info);
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                );
            }

            return res.json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;

        let whereClause = {};
        if (brandId) whereClause.brandId = brandId;
        if (typeId) whereClause.typeId = typeId;

        const devices = await Device.findAndCountAll({
            where: whereClause,
            limit,
            offset
        });

        return res.json(devices);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const device = await Device.findOne({
            where: { id },
            include: [{ model: DeviceInfo, as: 'info' }]
        });

        if (!device) {
            return next(ApiError.badRequest('Устройство не найдено'));
        }

        return res.json(device);
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params; // ID устройства
            const userId = req.user.id; // ID пользователя из JWT токена

            // Проверяем, что устройство принадлежит текущему пользователю
            const device = await Device.findOne({ where: { id, userId } });

            if (!device) {
                return next(ApiError.forbidden('Вы не можете удалить это устройство.'));
            }

            await device.destroy();
            return res.json({ message: 'Устройство успешно удалено.' });
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async update (req, res) {
        try {
          const { id } = req.params;
          const deviceData = req.body;
      
          // Проверьте наличие устройства перед обновлением
          const device = await Device.findByPk(id);
          if (!device) {
            return res.status(404).send('Устройство не найдено');
          }
      
          // Обновите устройство
          await Device.update(deviceData, { where: { id } });
          res.send('Устройство обновлено успешно');
        } catch (error) {
          console.error('Ошибка при обновлении устройства:', error);
          res.status(500).send('Ошибка при обновлении устройства');
        }
      };
      
}

module.exports = new DeviceController();
