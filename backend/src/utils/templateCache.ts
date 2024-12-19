import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';

const templateCache: Record<string, Handlebars.TemplateDelegate> = {};

export const getTemplate = (
  templateVersion: string
): Handlebars.TemplateDelegate => {
  if (templateCache[templateVersion]) {
    return templateCache[templateVersion];
  }

  const templatePath = path.join(
    __dirname,
    `../templates/${templateVersion}.html`
  );
  if (!fs.existsSync(templatePath)) {
    throw { status: 404, message: `template ${templateVersion} not found` };
  }

  const templateContent = fs.readFileSync(templatePath, 'utf8');
  const compiledTemplate = Handlebars.compile(templateContent);

  templateCache[templateVersion] = compiledTemplate;

  return compiledTemplate;
};
