import { Router } from 'express';
import {
  getTransactions,
  createTransaction,
  removeTransaction,
  getReportByMonthForCategories,
  getReportByMonthForSubcategories,
  getReportBySixMonth,
  geTotalSumByMonth,
} from '../../../controllers/transactions';
import guard from '../../../middlewares/guard/guard';
import errorWrapper from '../../../middlewares/errorWrapper';

const router = new Router();

router.get('/', guard, errorWrapper(getTransactions));

router.post('/', guard, errorWrapper(createTransaction));

router.delete('/:id', guard, errorWrapper(removeTransaction));

router.get(
  '/report-category-by-month',
  guard,
  errorWrapper(getReportByMonthForCategories),
);
router.get(
  '/report-subcategory-by-month',
  guard,
  errorWrapper(getReportByMonthForSubcategories),
);
router.get('/report-by-six-month', guard, errorWrapper(getReportBySixMonth));
router.get('/report-sum-by-month', guard, errorWrapper(geTotalSumByMonth));

export default router;
