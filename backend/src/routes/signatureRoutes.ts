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
      urlImage: '/path/to/template1.png',
      description: 'Professional template with modern design',
      textColor: '#000',
    },
    {
      id: '2',
      name: 'Template Version 2',
      urlImage: '/path/to/template2.png',
      description: 'Creative template with vibrant colors',
      textColor: '#4CAF50',
    },
  ];
  res.json(templates);
});

export default router;
