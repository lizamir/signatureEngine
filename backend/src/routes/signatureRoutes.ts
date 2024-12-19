import { Router } from 'express';
import { signatureController } from '../controllers/signatureController';
import { bulkSignaturesController } from '../controllers/bulkSignaturesController';
import { asyncWrapper } from '../utils/asyncWrapper';

const router = Router();
//one signature
router.post('/generate', asyncWrapper(signatureController));

//bulk signatures
router.post('/bulk-generate', asyncWrapper(bulkSignaturesController));

export default router;
