// src/app/components/SellerRegistrationsChart.tsx
'use client';

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface RegistrationData {
  day: string;
  count: number;
}

const SellerRegistrationsChart = () => {
  const [data, setData] = useState<{ labels: string[]; datasets: { label: string; data: number[]; backgroundColor: string; }[] }>({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchRegistrations = async () => {
      const response = await fetch('/api/sellers/registrationsByDay');
      const result: RegistrationData[] = await response.json();

      setData({
        labels: result.map((r) => r.day),
        datasets: [
          {
            label: 'Seller Registrations',
            data: result.map((r) => r.count),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
          },
        ],
      });
    };

    fetchRegistrations();
  }, []);

  return <Bar data={data} />;
};

export default SellerRegistrationsChart;
