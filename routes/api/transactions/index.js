import express from "express";
import {
    getTransactions,
    createTransaction,
    removeTransaction,
} from "../../../controllers/transactions";
import guard from '../../../middlewares/guard'

const transactionsRouter = new express.Router()

transactionsRouter.get('/', guard, getTransactions)

transactionsRouter.post('/', guard, createTransaction)

transactionsRouter.delete('/:id', guard, removeTransaction)

export default transactionsRouter