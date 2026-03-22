import React from 'react';

const Login = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Prihlásenie</h1>
      <form>
        <input type="email" placeholder="Email" /><br/>
        <input type="password" placeholder="Heslo" /><br/>
        <button type="submit">Vstúpiť</button>
      </form>
    </div>
  );
};

export default Login;
