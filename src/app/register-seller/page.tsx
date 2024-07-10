// src/app/register-seller/page.tsx
'use client';

import { useState, useEffect } from 'react';
import SellerTable from '../components/SellerTable';

type Seller = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export default function RegisterSeller() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [sellers, setSellers] = useState<Seller[]>([]);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await fetch('/api/sellers');
      const data = await response.json();
      setSellers(data);
    } catch (error) {
      console.error('Failed to fetch sellers:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/sellers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Seller registered successfully!');
      setFormData({ name: '', email: '', phone: '' });
      fetchSellers();
    } else {
      alert('Failed to register seller.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Register Seller</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input 
            type="text" 
            className="form-control" 
            id="phone" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
          />
        </div>
        <button type="submit" className="btn btn-primary">Register Seller</button>
      </form>
      <SellerTable sellers={sellers} />
    </div>
  );
}
