import React from 'react';

function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(45, 45, 58, 0.6)", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        zIndex: 9999
      }}
    >
      <div
        className="form-container-horizontal"
        onClick={(e) => e.stopPropagation()}
        style={{ 
            width: 420, 
            margin: 0,
            padding: 25 
        }} 
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ margin: 0, color: 'var(--indigo-profundo)', fontWeight: 500 }}>
            {title}
          </h3>
          
          <button 
            onClick={onClose}
            style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--texto-suave)',
                fontSize: '1.2rem',
                cursor: 'pointer',
                padding: '5px'
            }}
          >
            X
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Modal;