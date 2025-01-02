const express = require("express");
const { createSubTask, updateSubTask, deleteSubTask } = require("../controllers/subTask.controller");

const subTaskRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: SubTasks
 *   description: API для управління підзадачами
 */

/**
 * @swagger
 * /subtask/{id}:
 *   post:
 *     summary: Створити підзадачу
 *     tags: [SubTasks]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Унікальний ідентифікатор задачі, до якої потрібно додати підзадачу
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Назва підзадачі
 *               status:
 *                 type: string
 *                 description: Статус підзадачі (наприклад, "in-progress", "completed")
 *     responses:
 *       201:
 *         description: Підзадачу успішно створено
 *       400:
 *         description: Помилка валідації даних
 */
subTaskRouter.post("/:id", createSubTask);

/**
 * @swagger
 * /subtask/{id}:
 *   patch:
 *     summary: Оновити підзадачу
 *     tags: [SubTasks]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Унікальний ідентифікатор підзадачі
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Оновлена назва підзадачі
 *               status:
 *                 type: string
 *                 description: Оновлений статус підзадачі
 *     responses:
 *       200:
 *         description: Підзадачу успішно оновлено
 *       404:
 *         description: Підзадачу не знайдено
 */
subTaskRouter.patch("/:id", updateSubTask);

/**
 * @swagger
 * /subtask/{id}:
 *   delete:
 *     summary: Видалити підзадачу
 *     tags: [SubTasks]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Унікальний ідентифікатор підзадачі
 *     responses:
 *       200:
 *         description: Підзадачу успішно видалено
 *       404:
 *         description: Підзадачу не знайдено
 */
subTaskRouter.delete("/:id", deleteSubTask);

module.exports = subTaskRouter;
