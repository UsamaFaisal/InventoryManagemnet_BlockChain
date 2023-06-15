import React from 'react';

const headerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '20px',
  textAlign: 'center'
};

const h1Style = {
  margin: '0'
};

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1 style={h1Style}>ROMI INVENTORY SYSTEM</h1>
      {/* Add any additional header content here */}
    </header>
  );
};

export default Header;
