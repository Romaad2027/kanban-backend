const express = require('express');
const { createNewTask, modifyTask, removeTask } = require('../controllers/task.controller');
const taskRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API для управління завданнями
 */

/**
 * @swagger
 * /task/{id}:
 *   post:
 *     summary: Створити нове завдання
 *     tags: [Tasks]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Унікальний ідентифікатор дошки, до якої потрібно додати завдання
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Назва завдання
 *               description:
 *                 type: string
 *                 description: Опис завдання
 *     responses:
 *       201:
 *         description: Завдання успішно створено
 *       400:
 *         description: Помилка валідації даних
 */
taskRouter.post("/:id", createNewTask);

/**
 * @swagger
 * /task/{id}:
 *   patch:
 *     summary: Оновити завдання
 *     tags: [Tasks]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Унікальний ідентифікатор завдання
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Оновлена назва завдання
 *               description:
 *                 type: string
 *                 description: Оновлений опис завдання
 *     responses:
 *       200:
 *         description: Завдання успішно оновлено
 *       404:
 *         description: Завдання не знайдено
 */
taskRouter.patch('/:id', modifyTask);

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Видалити завдання
 *     tags: [Tasks]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Унікальний ідентифікатор завдання
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               boardId:
 *                 type: string
 *                 description: Унікальний ідентифікатор дошки, до якої належить завдання
 *     responses:
 *       200:
 *         description: Завдання успішно видалено
 *       404:
 *         description: Завдання не знайдено
 */
taskRouter.delete('/:id', removeTask);

module.exports = taskRouter;
