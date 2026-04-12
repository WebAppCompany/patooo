"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // 1. IMPORTUJEME useRouter
import styles from './page.module.css';
import Cookies from 'js-cookie'; // 1. IMPORTUJEME knižnicu pre prácu s cookies
import Link from 'next/dist/client/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // 2. INICIALIZUJEME router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.success) {
        // Uložíme token do pamäte prehliadača
        Cookies.set('token', result.access_token, { expires: 1 }); // Uložíme na 1 deň
        
        // 3. AK JE PRIHLÁSENIE ÚSPEŠNÉ, PRESMERUJEME
        router.push('/dashboard');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Chyba pripojenia:', error);
      alert('Backend nie je spustený!');
    }
  };

  return (
    <div className={styles['login-container']}> 
      <h1>Prihlásenie</h1>

      {/* TENTO TEXT SME PRIDALI */}
      <p className={styles['login-subtitle']}>
        Zadajte svoje údaje pre prístup do systému
      </p>
      <form className={styles['login-form']} onSubmit={handleSubmit}>
        <input 
          className={styles['login-input']} 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          className={styles['login-input']} 
          type="password" 
          placeholder="Heslo" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles['login-button']} type="submit">Vstúpiť</button>
      </form>

      {/* 2. PRIDANÝ ODKAZ NA REGISTRÁCIU */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <span style={{ color: '#ccc' }}>Nemáte ešte účet? </span>
        <Link href="/register" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
          Zaregistrujte sa
        </Link>
      </div>
    </div>
  );
}
