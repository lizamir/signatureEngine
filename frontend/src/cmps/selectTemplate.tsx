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
  const templates: Template[] = [
    {
      id: '1',
      name: 'templateVersion1',
      urlImage: 'https://via.placeholder.com/150?text=Logo+1',
    },
    {
      id: '2',
      name: 'templateVersion2',
      urlImage: 'https://via.placeholder.com/150?text=Logo+2',
    },
  ];

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
