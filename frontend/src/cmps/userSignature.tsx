import React, { useEffect, useState } from 'react';
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
}

const UserSignature: React.FC<UserSignatureProps> = ({
  userInfo,
  selectedTemplate,
}) => {
  return (
    <div className="user-signature">
      <img src={selectedTemplate.urlImage} alt="" />
      <h3>{userInfo.name}</h3>
      <p>{userInfo.email}</p>
      <p>{userInfo.phone}</p>
    </div>
  );
};

export default UserSignature;
