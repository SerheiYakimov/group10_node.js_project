import { HttpCode } from "../../lib/constants"
import repositoryTransactions from '../../repository/transactions'

export const removeTransaction = async (req, res, next) => {
    const { id } = req.params
    const { id: userId } = req.user
    const transactions = await repositoryTransactions.removeTransaction(userId, id,)
    if (transactions === null) {
        return res.status(HttpCode.NOT_FOUND).json({
            status: 'error',
            code: HttpCode.NOT_FOUND,
            message: 'Transaction not found',
        })
    }
    res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message: 'Transaction successfully deleted',
    })
}