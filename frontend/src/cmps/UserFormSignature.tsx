import React, { useEffect, useState } from 'react';
import './UserFormSignature.css';
interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

interface UserFormSignatureProps {
  onSubmit: (userInfo: UserInfo) => void;
}

const UserFormSignature: React.FC<UserFormSignatureProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserInfo>({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit"> Generate Signature</button>
    </form>
  );
};
export default UserFormSignature;
