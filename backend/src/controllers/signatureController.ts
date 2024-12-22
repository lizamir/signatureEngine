import { Request, Response } from 'express';
import { getTemplate } from '../utils/templateCache';

export const signatureController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, phone, templateVersion } = req.body;

  if (!name || !email || !phone || !templateVersion) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const template = getTemplate(templateVersion);
  if (!template) {
    res.status(404).json({ error: `Template ${templateVersion} not found` });
    return;
  }

  const htmlSignature = template({ name, email, phone });

  const plainTextSignature = `Name: ${name} \n
                                Email : ${email}\n
                                Phone: ${phone} `;

  res.json({ htmlSignature, plainTextSignature });
};
