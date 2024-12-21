import { Router } from 'express';
import { signatureController } from '../controllers/signatureController';
import { bulkSignaturesController } from '../controllers/bulkSignaturesController';
import { asyncWrapper } from '../utils/asyncWrapper';

const router = Router();
//one signature
router.post('/generate', asyncWrapper(signatureController));

//bulk signatures
router.post('/bulk-generate', asyncWrapper(bulkSignaturesController));

router.get('/templates', (req, res) => {
  const templates = [
    {
      id: '1',
      name: 'Template Version 1',
      urlImage: 'https://via.placeholder.com/150?text=Template+1',
    },
    {
      id: '2',
      name: 'Template Version 2',
      urlImage: 'https://via.placeholder.com/150?text=Template+2',
    },
  ];
  res.json(templates);
});

export default router;
