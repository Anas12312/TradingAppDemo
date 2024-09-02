import React from 'react'

export default function CustomContextMenu({x,y}) {
    const menuStyle = {
            position: 'absolute',
            top: `${y}px`,
            left: `${x}px`,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            padding: '10px',
            zIndex: 1000,
        };

    const handleMenuClick = (action) => {
            alert(`You clicked ${action}`);
        };

    return (
        <ul style={menuStyle}>
            <li onClick={() => handleMenuClick('Option 1')}>Option 1</li>
            <li onClick={() => handleMenuClick('Option 2')}>Option 2</li>
            <li onClick={() => handleMenuClick('Option 3')}>Option 3</li>
        </ul>
    );
  
}
