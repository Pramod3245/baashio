import React from 'react';

export function ToolBar({ addItem }) {
  return (
    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
      {['Header', 'Text', 'Image', 'Button', 'Footer'].map(type => (
        <button
          key={type}
          onClick={() => addItem(type)}
          style={{
            backgroundColor: '#002d72', 
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.2s',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#001f4d'} 
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#002d72'}
          onFocus={e => e.currentTarget.style.outline = 'none'}
        >
          Add {type}
        </button>
      ))}
    </div>
  );
}
