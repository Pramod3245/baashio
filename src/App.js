import React from 'react';
import { Layout } from './components/Layout';
import { FaHeart } from 'react-icons/fa'; 

function App() {
  const handleHeartClick = () => {
    window.open('https://www.linkedin.com/in/pramod1malagi', '_blank');
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '0', margin: '0' }}>
      <header style={{ padding: '25px 20px', backgroundColor: '#3f51b5', color: '#fff', textAlign: 'center', position: 'relative', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', margin: '0' }}>Dynamic Page Builder</h1>
        <p style={{ fontSize: '1.5rem', marginTop: '10px' }}>For BLaash.IO</p>

        <div style={{ position: 'absolute', top: '20px', right: '20px', textAlign: 'center' }}>
          <FaHeart
            style={{ fontSize: '2rem', color: '#FF0000', cursor: 'pointer' }} 
            onClick={handleHeartClick}
          />
          <p style={{ marginTop: '5px', fontSize: '1rem', color: '#fff' }}>Do you like it?</p>
        </div>
      </header>
      <main style={{ padding: '40px 20px' }}>
        <Layout />
      </main>
    </div>
  );
}

export default App;
