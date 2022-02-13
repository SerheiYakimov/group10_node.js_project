import { Router } from 'express';
import {
  getTransactions,
  createTransaction,
  removeTransaction,
  getReportByMonthForCategories,
} from '../../../controllers/transactions';
import guard from '../../../middlewares/guard/guard';

const router = new Router();

router.get('/', guard, getTransactions);

router.post('/', guard, createTransaction);

router.delete('/:id', guard, removeTransaction);

router.get('/report-category-by-month', guard, getReportByMonthForCategories);

export default router;
