'use client';
import 'bootstrap/dist/css/bootstrap.min.css';

type Seller = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type SellerTableProps = {
  sellers: Seller[];
};

export default function SellerTable({ sellers }: SellerTableProps) {
  console.log('Sellers:', sellers); // Log para verificar os dados

  if (!Array.isArray(sellers) || sellers.length === 0) {
    return <p>No sellers found.</p>;
  }

  return (
    <table className="table table-striped mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {sellers.map((seller) => (
          <tr key={seller.id}>
            <td>{seller.id}</td>
            <td>{seller.name}</td>
            <td>{seller.email}</td>
            <td>{seller.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
