import React from 'react';

// Define the Button component
function Button({ label, onClick }) {
  return (
    <button className="calculator-button" onClick={() => onClick(label)}>
      {label}
    </button>
  );
}

export default Button;
