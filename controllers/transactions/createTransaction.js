import { HttpCode } from "../../lib/constants"
import repositoryTransactions from '../../repository/transactions'

export const createTransaction = async (req, res, next) => {
    const { id: userId } = req.user
    const newTransaction = await repositoryTransactions.addTransaction(userId, req.body)
    if (newTransaction === null) {
        res.status(HttpCode.NOT_FOUND).json({
            status: 'error',
            code: HttpCode.BAD_REQUEST,
            message: 'Missing required field'
        })
    }
    res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: newTransaction
    })
}