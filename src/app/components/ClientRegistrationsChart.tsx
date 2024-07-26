// src/app/components/ClientRegistrationsChart.tsx
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

const ClientRegistrationsChart = () => {
  const [data, setData] = useState<{ labels: string[]; datasets: { label: string; data: number[]; backgroundColor: string; }[] }>({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchRegistrations = async () => {
      const response = await fetch('/api/clients/registrationsByDay');
      const result: RegistrationData[] = await response.json();

      setData({
        labels: result.map((r) => r.day),
        datasets: [
          {
            label: 'Client Registrations',
            data: result.map((r) => r.count),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      });
    };

    fetchRegistrations();
  }, []);

  return <Bar data={data} />;
};

export default ClientRegistrationsChart;
