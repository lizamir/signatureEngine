import React, { useState } from 'react';
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
  const [errors, setErrors] = useState<UserInfo>({
    name: '',
    email: '',
    phone: '',
  });

  const validate = () => {
    const newErrors = { name: '', email: '', phone: '' };
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Valid email is required';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = 'Valid phone number is required';
    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err !== '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p style={{ color: 'red' }}> {errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p style={{ color: 'red' }}> {errors.email}</p>}
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && <p style={{ color: 'red' }}> {errors.phone}</p>}
      </div>
      <button type="submit"> Generate Signature</button>
    </form>
  );
};
export default UserFormSignature;
