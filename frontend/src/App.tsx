import React, { useRef, useState } from 'react';
import SelectTemplate from './cmps/SelectTemplate';
import UserFormSignature from './cmps/UserFormSignature';
import UserSignature from './cmps/UserSignature';
import { generateSignature } from './services/api';
import SignatureCanvas from 'react-signature-canvas';
import { useDropzone } from 'react-dropzone';

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
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [generatedSignature, setGeneratedSignature] = useState<{
    htmlSignature: string;
    plainTextSignature: string;
  } | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] },
  });

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setUserInfo(null);
    setGeneratedSignature(null);
  };
  const saveSignature = () => {
    if (!sigCanvas.current || !image) {
      alert('Please provide both a signature and an image.');
      return;
    }

    const signatureCanvas = sigCanvas.current.getTrimmedCanvas();
    const combinedCanvas = document.createElement('canvas');
    const ctx = combinedCanvas.getContext('2d');

    const img = new Image();
    img.src = image;

    img.onload = () => {
      combinedCanvas.width = Math.max(img.width, signatureCanvas.width);
      combinedCanvas.height = img.height + signatureCanvas.height;

      ctx?.drawImage(img, 0, 0);
      ctx?.drawImage(signatureCanvas, 0, img.height);

      const combinedDataUrl = combinedCanvas.toDataURL('image/png');
      console.log('Combined Image URL:', combinedDataUrl);
    };
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
      <h1>Email Signature Engine</h1>
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
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an image here, or click to select one</p>
      </div>
      {image && (
        <img
          src={image}
          alt="Uploaded"
          style={{ maxWidth: '300px', marginBottom: '20px' }}
        />
      )}
      <SignatureCanvas
        ref={sigCanvas}
        canvasProps={{
          width: 500,
          height: 200,
          className: 'signatureCanvas',
          style: { border: '1px solid black' },
        }}
      />
      <button onClick={saveSignature}>Save Combined Signature</button>
    </div>
  );
};

export default App;
