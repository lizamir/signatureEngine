import React from 'react';
import './UserSignature.css';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

interface Template {
  id: string;
  name: string;
  urlImage: string;
}

interface UserSignatureProps {
  userInfo: UserInfo;
  selectedTemplate: Template;
  plainTextSignature?: string;
  combinedSignatureUrl?: string | null; // הוספת כתובת החתימה המשולבת
}

const UserSignature: React.FC<UserSignatureProps> = ({
  userInfo,
  selectedTemplate,
  plainTextSignature,
  combinedSignatureUrl,
}) => {
  console.log('UserSignature props:', {
    userInfo,
    selectedTemplate,
    plainTextSignature,
    combinedSignatureUrl,
  });

  return (
    <div className="user-signature">
      <h2>Your Generated Signature:</h2>
      <img
        src={selectedTemplate.urlImage}
        alt="Template"
        className="template-image"
      />
      <h3>{userInfo.name}</h3>
      <p>{userInfo.email}</p>
      <p>{userInfo.phone}</p>

      {plainTextSignature && (
        <div className="plain-text-signature">
          <h4>Plain Text Signature:</h4>
          <pre>{plainTextSignature}</pre>
          <button
            onClick={() => {
              navigator.clipboard.writeText(plainTextSignature);
              alert('Plain Text Signature copied to clipboard!');
            }}
            style={{
              backgroundColor: '#4caf50',
              color: '#fff',
              padding: '5px 10px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            Copy Plain Text
          </button>
        </div>
      )}

      {combinedSignatureUrl && (
        <div className="combined-signature">
          <h4>Combined Signature:</h4>
          <img
            src={combinedSignatureUrl}
            alt="Combined Signature"
            className="combined-signature-image"
            style={{ maxWidth: '300px', margin: '10px auto', display: 'block' }}
          />
        </div>
      )}
    </div>
  );
};

export default UserSignature;
