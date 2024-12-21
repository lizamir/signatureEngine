import React, { useEffect, useState } from 'react';
import './SelectTemplate.css';
import { getTemplates } from '../services/api';

interface Template {
  id: string;
  name: string;
  urlImage: string;
}

interface SelectTemplateProps {
  onTemplateSelect: (template: Template) => void;
}

const SelectTemplate: React.FC<SelectTemplateProps> = ({
  onTemplateSelect,
}) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

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
  return (
    <div className="template-list">
      {templates.map((template) => (
        <div
          key={template.id}
          className="template-item"
          onClick={() => onTemplateSelect(template)}
          style={{ cursor: 'pointer' }}
        >
          <img src={template.urlImage} alt={template.name} />
          <p>{template.name}</p>
        </div>
      ))}
    </div>
  );
};

export default SelectTemplate;
