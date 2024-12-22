import React, { useState } from 'react';
import SelectTemplate from './cmps/SelectTemplate';
import UserFormSignature from './cmps/UserFormSignature';
import UserSignature from './cmps/UserSignature';
import { generateSignature } from './services/api';

import './App.css';

interface Template {
  id: string;
  name: string;
  urlImage: string;
}

interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

const App: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [generatedSignature, setGeneratedSignature] = useState<{
    htmlSignature: string;
    plainTextSignature: string;
  } | null>(null);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setUserInfo(null);
    setGeneratedSignature(null);
  };

  const handleUserFormSubmit = async (userInfo: UserInfo) => {
    setUserInfo(userInfo);
    if (selectedTemplate) {
      console.log('Selected Template:', selectedTemplate); // Debug
      console.log('User Info:', userInfo); // Debug
      try {
        const result = await generateSignature(selectedTemplate.id, userInfo);
        console.log('Generated signature:', result);
        setGeneratedSignature(result);
      } catch (error) {
        console.error('Error generating signature:', error);
      }
    }
  };

  return (
    <div className="App">
      <h1> Email Signature Engine </h1>
      <SelectTemplate onTemplateSelect={handleTemplateSelect} />
      {selectedTemplate && !userInfo && (
        <UserFormSignature onSubmit={handleUserFormSubmit} />
      )}
      {selectedTemplate && userInfo && generatedSignature && (
        <UserSignature
          userInfo={userInfo}
          selectedTemplate={selectedTemplate}
          plainTextSignature={generatedSignature.plainTextSignature}
        />
      )}
    </div>
  );
};

export default App;
