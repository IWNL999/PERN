const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware'); // Мидлвар для проверки токена

// Получить все устройства в корзине пользователя
router.get('/', authMiddleware, basketController.getBasket);

// Добавить устройство в корзину
router.post('/', authMiddleware, basketController.addDevice);

// Удалить устройство из корзины
router.delete('/:basketDeviceId', authMiddleware, basketController.removeDevice);

module.exports = router;
