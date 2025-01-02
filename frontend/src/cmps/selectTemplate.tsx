import React, { useEffect, useState } from 'react';
import './SelectTemplate.css';
import { getTemplates } from '../services/api';

interface Template {
  id: string;
  name: string;
  urlImage: string;
  description: string; // הוספת תיאור
  textColor: string; // צבע ייחודי
}

interface SelectTemplateProps {
  onTemplateSelect: (template: Template) => void;
  selectedTemplate: Template | null;
}

const SelectTemplate: React.FC<SelectTemplateProps> = ({
  onTemplateSelect,
  selectedTemplate,
}) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getTemplates();
        setTemplates(data);
      } catch (error) {
        console.error('error getting templates', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return <div> Loading templates...</div>;
  }
  if (error) {
    return <div className="error-message"> {error}</div>;
  }
  return (
    <div className="template-list">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`template-item ${
            selectedTemplate?.id === template.id ? 'selected' : ''
          }`}
          onClick={() => onTemplateSelect(template)}
        >
          <img src={template.urlImage} alt={template.name} />
          <p className="template-name" style={{ color: template.textColor }}>
            {template.name}
          </p>
          <p className="template-description">{template.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SelectTemplate;
