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
}

const UserSignature: React.FC<UserSignatureProps> = ({
  userInfo,
  selectedTemplate,
  plainTextSignature,
}) => {
  console.log('UserSignature props:', {
    userInfo,
    selectedTemplate,
    plainTextSignature,
  });
  return (
    <div className="user-signature">
      <img src={selectedTemplate.urlImage} alt="" />
      <h3>{userInfo.name}</h3>
      <p>{userInfo.email}</p>
      <p>{userInfo.phone}</p>
      {/* Render the Plain Text Signature if available */}
      {plainTextSignature && (
        <div className="plain-text-signature">
          <h4>Plain Text Signature:</h4>
          <pre>{plainTextSignature}</pre>
        </div>
      )}
    </div>
  );
};

export default UserSignature;
