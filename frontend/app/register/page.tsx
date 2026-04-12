"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../login/page.module.css'; // Použijeme tie isté štýly

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:4000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (result.success) {
      alert('Registrácia úspešná! Teraz sa môžete prihlásiť.');
      router.push('/login');
    } else {
      alert('Chyba pri registrácii');
    }
  };

  return (
    <div className={styles['login-container']}> 
      <h1>Registrácia</h1>
      <p className={styles['login-subtitle']}>Vytvorte si nový účet</p>

      <form className={styles['login-form']} onSubmit={handleRegister}>
        <input 
          className={styles['login-input']} 
          type="email" 
          placeholder="Zvoľte si Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          className={styles['login-input']} 
          type="password" 
          placeholder="Zvoľte si Heslo" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles['login-button']} type="submit">Zaregistrovať sa</button>
      </form>
    </div>
  );
}