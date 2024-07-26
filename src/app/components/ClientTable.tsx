'use client';

import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type ClientTableProps = {
  clients: Client[];
};

export default function ClientTable({ clients }: ClientTableProps) {
  console.log('Clients:', clients); // Log para verificar os dados

  if (!Array.isArray(clients) || clients.length === 0) {
    return <p>No clients found.</p>;
  }

  return (
    <table className="table table-striped mt-4 rounded-full" >
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td>{client.id}</td>
            <td>
              <Link href={`/clients/${client.id}`} legacyBehavior>
                <a>{client.name}</a>
              </Link>
            </td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
