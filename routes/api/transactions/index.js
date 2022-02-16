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

router.get('/', errorWrapper(guard), errorWrapper(getTransactions));

router.post('/', errorWrapper(guard), errorWrapper(createTransaction));

router.delete('/:id', errorWrapper(guard), errorWrapper(removeTransaction));

router.get(
  '/report-category-by-month',
  errorWrapper(guard),
  errorWrapper(getReportByMonthForCategories),
);
router.get(
  '/report-subcategory-by-month',
  errorWrapper(guard),
  errorWrapper(getReportByMonthForSubcategories),
);
router.get(
  '/report-by-six-month',
  errorWrapper(guard),
  errorWrapper(getReportBySixMonth),
);
router.get(
  '/report-sum-by-month',
  errorWrapper(guard),
  errorWrapper(geTotalSumByMonth),
);

export default router;
