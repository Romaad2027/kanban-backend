const express = require('express');
const { fetchAllBoards, fetchBoardDetails, createNewBoard, modifyBoard, removeBoard } = require('../controllers/board.controller');

const boardRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Boards
 *   description: API для управління дошками
 */

/**
 * @swagger
 * /board:
 *   get:
 *     summary: Отримати список усіх дощок
 *     tags: [Boards]
 *     responses:
 *       200:
 *         description: Список дощок успішно отримано
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Унікальний ідентифікатор дошки
 *                   name:
 *                     type: string
 *                     description: Назва дошки
 */
boardRouter.get("/", fetchAllBoards);

/**
 * @swagger
 * /board/{id}:
 *   get:
 *     summary: Отримати деталі конкретної дошки
 *     tags: [Boards]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Унікальний ідентифікатор дошки
 *     responses:
 *       200:
 *         description: Інформацію про дошку успішно отримано
 *       404:
 *         description: Дошку не знайдено
 */
boardRouter.get("/:id", fetchBoardDetails);

/**
 * @swagger
 * /board:
 *   post:
 *     summary: Створити нову дошку
 *     tags: [Boards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Назва нової дошки
 *     responses:
 *       201:
 *         description: Дошку успішно створено
 *       400:
 *         description: Помилка валідації
 */
boardRouter.post("/", createNewBoard);

/**
 * @swagger
 * /board/{id}:
 *   patch:
 *     summary: Змінити дані дошки
 *     tags: [Boards]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Унікальний ідентифікатор дошки
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Оновлена назва дошки
 *     responses:
 *       200:
 *         description: Дошку успішно оновлено
 *       404:
 *         description: Дошку не знайдено
 */
boardRouter.patch('/:id', modifyBoard);

/**
 * @swagger
 * /board/{id}:
 *   delete:
 *     summary: Видалити дошку
 *     tags: [Boards]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Унікальний ідентифікатор дошки
 *     responses:
 *       200:
 *         description: Дошку успішно видалено
 *       404:
 *         description: Дошку не знайдено
 */
boardRouter.delete('/:id', removeBoard);

module.exports = boardRouter;
