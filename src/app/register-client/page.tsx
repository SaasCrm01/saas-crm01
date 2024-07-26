'use client';

import { useState, useEffect } from 'react';
import ClientTable from '../components/ClientTable';
import 'bootstrap/dist/css/bootstrap.min.css';

type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export default function RegisterClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api');
      const data = await response.json();
      if (Array.isArray(data)) {
        setClients(data);
      } else {
        setClients([]);
      }
    } catch (error) {
      console.error('Failed to fetch clients:', error);
      setClients([]);
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
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Client registered successfully!');
      setFormData({ name: '', email: '', phone: '' });
      fetchClients();
    } else {
      alert('Failed to register client.');
    }
  };

  return (
    <div className="container mt-5 bg-slate-200">
      <h1 className="mb-5 pt-4">Registre um Cliente</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nome</label>
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
          <label htmlFor="email" className="form-label">E-mail</label>
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
          <label htmlFor="phone" className="form-label">Contato</label>
          <input 
            type="text" 
            className="form-control" 
            id="phone" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
          />
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
      <div className="pt-3 pb-3 ">
      <ClientTable clients={clients} />
      </div>
    </div>
  );
}
