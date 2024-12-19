import { Request, Response } from 'express';
import { getTemplate } from '../utils/templateCache';

export const signatureController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, phone, templateVersion } = req.body;

  if (!name || !email || !phone || !templateVersion) {
    throw { status: 400, message: 'Missing required fields' };
  }

  const compiledTemplate = getTemplate(templateVersion);
  const htmlSignature = compiledTemplate({ name, email, phone });

  const plainTextSignature = `Name: ${name} \n
                                Email : ${email}\n
                                Phone: ${phone} `;

  res.json({ htmlSignature, plainTextSignature });
};
