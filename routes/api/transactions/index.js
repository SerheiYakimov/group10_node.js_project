import { Router } from 'express';
import {
  getTransactions,
  createTransaction,
  removeTransaction,
  getReportByMonthForCategories,
  getReportByMonthForSubcategories,
  getReportBySixMonth,
} from '../../../controllers/transactions';
import guard from '../../../middlewares/guard/guard';
import errorWrapper from '../../../middlewares/errorWrapper';

const router = new Router();

router.get('/', guard, getTransactions);

router.post('/', guard, errorWrapper(createTransaction));

router.delete('/:id', guard, removeTransaction);

router.get('/report-category-by-month', guard, getReportByMonthForCategories);
router.get(
  '/report-subcategory-by-month',
  guard,
  getReportByMonthForSubcategories,
);
router.get('/report-by-six-month', guard, getReportBySixMonth);

export default router;
