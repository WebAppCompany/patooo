"use client";

import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      marginTop: '80px', 
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '0 20px'
    }}>
      {/* HLAVNÝ NADPIS */}
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Vitaj v aplikácii!</h1>
      
      {/* PRIDANÝ TEXT POD NADPISOM */}
      <p style={{ color: '#ccc', fontSize: '1.2rem', marginBottom: '30px', textAlign: 'center' }}>
        Si úspešne prihlásený do zabezpečenej zóny. Tu máš prístup k svojim údajom.
      </p>

      {/* NOVÁ SEKCIA S "DÁTAMI" */}
      <div style={{
        background: '#1e1e1e',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #333',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 10px 15px rgba(0,0,0,0.3)'
      }}>
        <h3 style={{ borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: 0 }}>
          Informácie o relácii
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.8' }}>
          <li><strong>Status:</strong> Aktívny</li>
          <li><strong>Rola:</strong> Administrátor</li>
          <li><strong>Posledná aktivita:</strong> Práve teraz</li>
        </ul>
      </div>

      <p style={{ color: '#ccc', fontSize: '1.2rem', marginBottom: '30px', textAlign: 'center' }}>
        __$$$$$$$_________________________________________________________ __$_____$_________________________________________________________ __$_____$____________$$$$$$$$$__$$$$$$____$$$$$$___$$$$$$$$________ __$_____$___________$_________$_$_____$__$_____$_$$_________$______ __$_____$__________$___________$_$_____$_$_____$$___$$$$_$___$_____ __$_____$_________$_____$$$_____$_$_____$_____$$____$$$$$$____$__ __$_____$_________$____$___$____$_$__________$_$______________$___ __$_____$$$$$$$$$_$____$___$____$__$_________$_$____$$$$$$$$$$$___ __$_____________$_$_____$$$_____$___$_______$__$____$$__$$$$$$$___ __$_____________$__$___________$_____$_____$____$_____$$_____$____ __$$$$$$$$$$$$$$$____$$$$$$$$$________$$$$$______$$$$$$$$$$$$___
      </p>

      <button 
        onClick={handleLogout}
        style={{
          marginTop: '40px',
          padding: '12px 25px',
          backgroundColor: '#ff4d4d',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'background 0.3s'
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#cc0000')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ff4d4d')}
      >
        Odhlásiť sa
      </button>
    </div>
  );
}