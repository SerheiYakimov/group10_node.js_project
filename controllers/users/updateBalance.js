export const updateBalance = async (res, req, next) => {
    const { id: userId } = req.user
    const { balance } = req.body
    if (!balance) {
        return res.status(HttpCode.NOT_FOUND).json({
            status: 'error',
            code: HttpCode.NOT_FOUND,
            message: 'Transactions could not be found'
        })
    }
    await authService.setBalance(userId, balance)
    const tempBalance = await authService.getBalance(userId)
    return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { userBalance }
    })
}