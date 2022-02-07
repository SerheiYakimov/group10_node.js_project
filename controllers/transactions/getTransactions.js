import { HttpCode } from "../../lib/constants"

export const getTransactions = async (req, res, next) => {
    const { id: userId } = req.user
    const transactions = await repositoryTransactions.transactionsList(userId, req.query)
    if (!transactions) {
        res.status(HttpCode.NOT_FOUND).json({
            status: 'error',
            code: HttpCode.NOT_FOUND,
            message: 'Transactions could not be found'
        })
    }
    res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: transactions
    })
}