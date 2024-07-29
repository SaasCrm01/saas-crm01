'use client';

import { useState, useEffect } from 'react';
import SellerTable from '../components/SellerTable';
import { supabase } from '../../lib/supabase';

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
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data.user) {
        setUserId(data.user.id);
        fetchSellers(data.user.id);
      } else {
        console.error('User not authenticated', error);
      }
    };
    fetchUser();
  }, []);

  const fetchSellers = async (userId: string) => {
    try {
      const response = await fetch('/api/sellers', {
        headers: {
          'user-id': userId,
        },
      });
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
    if (!userId) return;
    const response = await fetch('/api/sellers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-id': userId,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Seller registered successfully!');
      setFormData({ name: '', email: '', phone: '' });
      fetchSellers(userId);
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
