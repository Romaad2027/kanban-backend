const express = require('express');
const { loginUser, registerUser } = require('../controllers/user.controller');

const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API для авторизації та реєстрації користувачів
 */

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Авторизація користувача
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email користувача
 *               password:
 *                 type: string
 *                 description: Пароль користувача
 *     responses:
 *       200:
 *         description: Успішна авторизація
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Токен для доступу
 *       401:
 *         description: Невірний логін або пароль
 */
authRouter.post("/signin", loginUser);

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Реєстрація нового користувача
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email нового користувача
 *               password:
 *                 type: string
 *                 description: Пароль нового користувача
 *               name:
 *                 type: string
 *                 description: Ім'я нового користувача
 *     responses:
 *       201:
 *         description: Успішна реєстрація
 *       400:
 *         description: Помилка валідації даних
 */
authRouter.post("/signup", registerUser);

module.exports = authRouter;
