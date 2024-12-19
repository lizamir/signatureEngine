import { Request, Response } from 'express';
import { getTemplate } from '../utils/templateCache';

export const bulkSignaturesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { requests } = req.body;

  if (!Array.isArray(requests) || requests.length === 0) {
    throw { status: 400, message: 'Invalid or empty requests array ' };
  }
  const results = await Promise.all(
    requests.map(async (data: any) => {
      const { name, email, phone, templateVersion } = data;

      if (!name || !email || !phone || !templateVersion) {
        throw {
          status: 400,
          message: ' Missing required fields in one of the requests ',
        };
      }

      const compiledTemplate = getTemplate(templateVersion);
      const htmlSignature = compiledTemplate({ name, email, phone });

      return { name, htmlSignature };
    })
  );
  res.json({ results });
};
