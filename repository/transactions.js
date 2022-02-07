import Transaction from '../models/transaction';

const transactionsList = async (userId,
    { sortBy, sortByDesc, filter, limit = 10, skip = 0 },
) => {
    let sortCriteria = null
    const total = await Transaction.find({ owner: userId }).countDocuments()
    let transactions = Transaction.find({ owner: userId }).populate({
        path: 'owner',
        select: 'name email role',
    })
    if (sortBy) {
        sortCriteria = { [`${sortBy}`]: 1 }
    }
    if (sortByDesc) {
        sortCriteria = { [`${sortByDesc}`]: -1 }
    }
    if (filter) {
        transactions = transactions.select(filter.split('|').join(' '))
    }
    transactions = await transactions
        .skip(Number(skip))
        .limit(Number(limit))
        .sort(sortCriteria);
    return { total, transactions }
}

const addTransaction = async (userId, body) => {
    const transaction = await Transaction.create({ ...body, owner: userId })
    return transaction
}

const removeTransaction = async (userId, transactionId) => {
    const transaction = await Transaction.findOneAndRemove({
        _id: transactionId,
        owner: userId,
    })
    return transaction
}


export default {
    transactionsList,
    removeTransaction,
    addTransaction,
}