// controllers/basketController.js
const { Basket, BasketDevice, Device } = require('../models/models');
const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');

class BasketController {
    // Функция для извлечения userId из токена
    getUserIdFromToken(req) {
        const token = req.headers.authorization.split(' ')[1]; // Получаем токен из заголовка авторизации
        if (!token) {
            throw ApiError.unauthorized('Токен не предоставлен'); // Обработка ошибки, если токена нет
        }

        // Декодируем токен и извлекаем userId
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Расшифровываем токен с использованием секретного ключа
        return decoded.id; // Возвращаем идентификатор пользователя из токена
    }

    // Получение всех устройств в корзине пользователя
    async getBasket(req, res, next) {
        try {
            const userId = this.getUserIdFromToken(req); // Извлекаем userId из токена
            const basket = await Basket.findOne({
                where: { userId }, // Ищем корзину, связанную с userId
                include: [{ model: BasketDevice, include: [Device] }] // Включаем устройства в корзине
            });

            if (!basket) {
                return next(ApiError.badRequest('Корзина не найдена')); // Если корзина не найдена, возвращаем ошибку
            }

            return res.json(basket); // Возвращаем корзину в ответе
        } catch (e) {
            return next(ApiError.internal('Ошибка сервера')); // Обрабатываем ошибки сервера
        }
    }

    // Добавление устройства в корзину
    async addDevice(req, res, next) {
        try {
            const userId = this.getUserIdFromToken(req); // Извлекаем userId из токена
            const { deviceId } = req.body; // Получаем ID устройства из тела запроса

            if (!deviceId) {
                return res.status(400).json({ message: "Device ID is required" }); // Если ID устройства не передан, возвращаем ошибку
            }

            // Находим корзину пользователя по userId
            const basket = await Basket.findOne({ where: { userId } });

            // Добавляем устройство в корзину
            const basketDevice = await BasketDevice.create({ basketId: basket.id, deviceId });
            return res.json(basketDevice); // Возвращаем созданную запись
        } catch (e) {
            return next(ApiError.internal(e.message)); // Обрабатываем ошибки сервера
        }
    }

    // Remove a device from the basket
    async removeDevice(req, res, next) {
        try {
            const userId = this.getUserIdFromToken(req); // Извлекаем userId из токена
            const { basketDeviceId } = req.params; // Получаем ID устройства в корзине из параметров URL

            const basketDevice = await BasketDevice.findOne({
                where: { id: basketDeviceId }, // Ищем устройство по ID в корзине
                include: [{ model: Basket, where: { userId } }] // Проверяем, что это устройство принадлежит пользователю
            });

            if (!basketDevice) {
                return next(ApiError.badRequest('Устройство не найдено в корзине')); // Если устройство не найдено, возвращаем ошибку
            }

            await basketDevice.destroy(); // Удаляем устройство из корзины
            return res.json({ message: 'Устройство удалено из корзины' }); // Сообщаем об успешном удалении
        } catch (e) {
            return next(ApiError.internal(e.message)); // Обрабатываем ошибки сервера
        }
    }
}

module.exports = new BasketController();
