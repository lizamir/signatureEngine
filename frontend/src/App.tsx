import React, { useState } from 'react';
import SelectTemplate from './cmps/SelectTemplate';
import UserFormSignature from './cmps/UserFormSignature';
import UserSignature from './cmps/UserSignature';
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

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
  };

  const handleUserFormSubmit = (userInfo: UserInfo) => {
    setUserInfo(userInfo);
  };

  return (
    <div className="App">
      <h1> Email Signature Engine </h1>
      <SelectTemplate onTemplateSelect={handleTemplateSelect} />
      {selectedTemplate && userInfo && (
        <UserFormSignature onSubmit={handleUserFormSubmit} />
      )}
      {selectedTemplate && userInfo && (
        <UserSignature
          userInfo={userInfo}
          selectedTemplate={selectedTemplate}
        />
      )}
    </div>
  );
};

export default App;
