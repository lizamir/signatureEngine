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
  description: string; // הוספת התיאור
  textColor: string; // הוספת צבע הטקסט
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
  const [image, setImage] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [generatedSignature, setGeneratedSignature] = useState<{
    htmlSignature: string;
    plainTextSignature: string;
  } | null>(null);
  const [combinedSignatureUrl, setCombinedSignatureUrl] = useState<
    string | null
  >(null);
  const sigCanvas = useRef<SignatureCanvas | null>(null);

  // Handle image upload
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] },
  });

  // Handle template selection
  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setUserInfo(null);
    setGeneratedSignature(null);
  };

  // Save combined signature
  const saveSignature = () => {
    if (!sigCanvas.current || !image || !userInfo || !selectedTemplate) {
      alert(
        'Please provide all required inputs: template, image, signature, and user info.'
      );
      return;
    }

    const signatureCanvas = sigCanvas.current.getTrimmedCanvas();
    const combinedCanvas = document.createElement('canvas');
    const ctx = combinedCanvas.getContext('2d');

    const img = new Image();
    img.src = image;

    img.onload = () => {
      // קביעת גודל הקנבס
      const imageWidth = 300; // רוחב תמונה מקסימלי
      const imageHeight = (img.height / img.width) * imageWidth; // שמירה על יחס גובה-רוחב
      combinedCanvas.width = imageWidth;
      combinedCanvas.height = imageHeight + signatureCanvas.height + 100;

      // ציור התמונה בגודל קטן יותר
      ctx?.drawImage(img, 0, 0, imageWidth, imageHeight);

      // ציור החתימה מתחת לתמונה
      ctx?.drawImage(signatureCanvas, 0, imageHeight);

      // הוספת כיתוב מתחת לתמונה והחתימה
      ctx!.font = '16px Arial';
      ctx!.fillStyle = '#000';
      ctx!.fillText(
        `Name: ${userInfo.name}`,
        10,
        imageHeight + signatureCanvas.height + 20
      );
      ctx!.fillText(
        `Email: ${userInfo.email}`,
        10,
        imageHeight + signatureCanvas.height + 50
      );
      ctx!.fillText(
        `Phone: ${userInfo.phone}`,
        10,
        imageHeight + signatureCanvas.height + 80
      );

      // יצירת כתובת להורדה
      const combinedDataUrl = combinedCanvas.toDataURL('image/png');
      setCombinedSignatureUrl(combinedDataUrl);

      const link = document.createElement('a');
      link.href = combinedDataUrl;
      link.download = 'combined-signature.png';
      link.click();
    };
  };

  // Handle user form submission
  const handleUserFormSubmit = async (userInfo: UserInfo) => {
    setUserInfo(userInfo);
    if (selectedTemplate) {
      try {
        const result = await generateSignature(selectedTemplate.id, userInfo);
        setGeneratedSignature(result);
      } catch (error) {
        console.error('Error generating signature:', error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Email Signature Engine</h1>

      {/* Step 1: Select Template */}
      <section>
        <h2>Step 1: Select a Template</h2>
        <SelectTemplate
          onTemplateSelect={handleTemplateSelect}
          selectedTemplate={selectedTemplate}
        />
      </section>

      {/* Step 2: Fill User Details */}
      {selectedTemplate && (
        <section>
          <h2>Step 2: Fill in Your Details</h2>
          <UserFormSignature onSubmit={handleUserFormSubmit} />
        </section>
      )}

      {/* Step 3: Preview and Download Signature */}
      {selectedTemplate && userInfo && generatedSignature && (
        <section>
          <h2>Step 3: Preview Your Signature</h2>
          <UserSignature
            userInfo={userInfo}
            selectedTemplate={selectedTemplate}
            plainTextSignature={generatedSignature.plainTextSignature}
            combinedSignatureUrl={combinedSignatureUrl}
          />
        </section>
      )}

      {/* Step 4: Upload Image and Save Combined Signature */}
      <section>
        <h2>Step 4: Add an Image and Draw Your Signature</h2>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop an image here, or click to select one</p>
        </div>
        {image && (
          <img src={image} alt="Uploaded" style={{ maxWidth: '300px' }} />
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
        <button onClick={saveSignature} style={{ marginTop: '20px' }}>
          Save Combined Signature
        </button>
      </section>
    </div>
  );
};

export default App;
