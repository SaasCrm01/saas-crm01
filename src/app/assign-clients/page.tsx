'use client';

import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function AssignClients() {
  const [sellers, setSellers] = useState<{ id: number; name: string }[]>([]);
  const [clients, setClients] = useState<{ id: number; name: string }[]>([]);
  const [selectedSeller, setSelectedSeller] = useState<string>('');
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const [sellerClientAssociations, setSellerClientAssociations] = useState<
    { seller: string; client: string }[]
  >([]);

  useEffect(() => {
    const fetchSellersAndClients = async () => {
      try {
        const [sellersResponse, clientsResponse, associationsResponse] = await Promise.all([
          fetch('/api/sellers'),
          fetch('/api/clients'),
          fetch('/api/sellers/associations'),
        ]);

        if (!sellersResponse.ok || !clientsResponse.ok || !associationsResponse.ok) {
          throw new Error('Failed to fetch sellers, clients, or associations');
        }

        const [sellersData, clientsData, associationsData] = await Promise.all([
          sellersResponse.json(),
          clientsResponse.json(),
          associationsResponse.json(),
        ]);

        setSellers(sellersData);
        setClients(clientsData);
        setSellerClientAssociations(associationsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSellersAndClients();
  }, []);

  const handleAssignClients = async () => {
    try {
      const response = await fetch('/api/sellers/assignClient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sellerName: selectedSeller, clientNames: selectedClients }),
      });

      if (response.ok) {
        setMessage('Clients assigned to seller successfully!');
        // Refresh the associations list
        const associationsResponse = await fetch('/api/sellers/associations');
        if (associationsResponse.ok) {
          const associationsData = await associationsResponse.json();
          setSellerClientAssociations(associationsData);
        }
      } else {
        const errorData = await response.json();
        setMessage(`Failed to assign clients to seller: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Failed to assign clients to seller:', error);
      setMessage('Failed to assign clients to seller.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Assign Clients to Seller</h1>
      <div className="mb-3">
        <label htmlFor="sellerName" className="form-label">Seller</label>
        <select 
          id="sellerName" 
          className="form-control" 
          value={selectedSeller} 
          onChange={(e) => setSelectedSeller(e.target.value)} 
          required
        >
          <option value="">Select a seller</option>
          {sellers.map(seller => (
            <option key={seller.id} value={seller.name}>{seller.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="clientNames" className="form-label">Clients</label>
        <select 
          id="clientNames" 
          className="form-control" 
          multiple 
          value={selectedClients} 
          onChange={(e) => setSelectedClients(Array.from(e.target.selectedOptions, option => option.value))} 
          required
        >
          {clients.length > 0 ? clients.map(client => (
            <option key={client.id} value={client.name}>{client.name}</option>
          )) : <option disabled>Loading clients...</option>}
        </select>
      </div>
      <button type="button" className="btn btn-primary" onClick={handleAssignClients}>Assign Clients</button>
      {message && <p>{message}</p>}

      <h2 className="mt-5">Seller-Client Associations</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Seller</th>
            <th>Client</th>
          </tr>
        </thead>
        <tbody>
          {sellerClientAssociations.map((association, index) => (
            <tr key={index}>
              <td>{association.seller}</td>
              <td>{association.client}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
