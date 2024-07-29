// src/app/register/page.tsx
'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const maxRetries = 3;
    const delay = 2000; // 2 segundos

    for (let i = 0; i < maxRetries; i++) {
      try {
        console.log('Attempting to register user with email:', email);

        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
          console.error('Error during signUp:', error);

          if (error.message.includes('rate limit')) {
            if (i < maxRetries - 1) {
              console.log(`Rate limit exceeded. Retrying... (${i + 1}/${maxRetries})`);
              await sleep(delay);
              continue;
            } else {
              alert('You have exceeded the number of registration attempts. Please try again later.');
            }
          } else if (error.message.includes('network error')) {
            alert('Network error. Please check your connection and try again.');
          } else {
            alert(error.message);
          }
        } else {
          const user = data.user;
          console.log('User registered:', user);

          if (user) {
            const { data: insertData, error: insertError } = await supabase
              .from('User')
              .insert([{ email: user.email }]);

            if (insertError) {
              console.error('Error inserting user into database:', insertError);
              alert(insertError.message);
            } else {
              console.log('User inserted into database:', insertData);
              router.push('/login');
            }
          }
          break; // Sucesso, sair do loop de retries
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 className="mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <div className="mt-3 text-center">
          <Link href="/login">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}
